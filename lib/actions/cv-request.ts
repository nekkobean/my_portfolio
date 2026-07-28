"use server";

import { readFile } from "node:fs/promises";
import path from "node:path";
import nodemailer from "nodemailer";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import {
  cvRequestSchema,
  type CvRequestActionState,
} from "@/lib/validations/cv-request";

/**
 * Safely gets a text value from submitted FormData.
 */
function getFormText(formData: FormData, key: string): string {
  const value = formData.get(key);

  return typeof value === "string" ? value : "";
}

/**
 * Saves a CV request and sends the PDF to the requester's email.
 */
export async function submitCvRequest(
  _previousState: CvRequestActionState,
  formData: FormData,
): Promise<CvRequestActionState> {
  /*
   * Honeypot anti-bot field.
   * Normal visitors cannot see this field.
   */
  const website = getFormText(formData, "website");

  if (website.trim() !== "") {
    return {
      status: "success",
      message: "Your CV request has been received.",
      errors: {},
    };
  }

  /*
   * Validate the submitted form data.
   */
  const validationResult = cvRequestSchema.safeParse({
    requester_name: getFormText(
      formData,
      "requester_name",
    ),
    requester_email: getFormText(
      formData,
      "requester_email",
    ),
    reason: getFormText(formData, "reason"),
  });

  if (!validationResult.success) {
    const flattenedErrors = z.flattenError(
      validationResult.error,
    ).fieldErrors;

    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      errors: {
        requester_name:
          flattenedErrors.requester_name,
        requester_email:
          flattenedErrors.requester_email,
        reason: flattenedErrors.reason,
      },
    };
  }

  const {
    requester_name,
    requester_email,
    reason,
  } = validationResult.data;

  /*
   * Read the private Gmail environment variables.
   */
  const gmailUser = process.env.GMAIL_USER
    ?.trim()
    .toLowerCase();

  const gmailAppPassword =
    process.env.GMAIL_APP_PASSWORD
      ?.replace(/\s/g, "")
      .trim();

  if (!gmailUser || !gmailAppPassword) {
    console.error(
      "GMAIL_USER or GMAIL_APP_PASSWORD is missing.",
    );

    return {
      status: "error",
      message:
        "The email service is not configured. Please contact the portfolio owner.",
      errors: {},
    };
  }

  /*
   * GMAIL_USER is also your personal_details email,
   * so it is used to find your portfolio profile.
   */
  let personalDetails: {
    id: string;
    first_name: string;
    middle_name: string | null;
    last_name: string;
  } | null;

  try {
    personalDetails =
      await prisma.personal_details.findUnique({
        where: {
          email: gmailUser,
        },
        select: {
          id: true,
          first_name: true,
          middle_name: true,
          last_name: true,
        },
      });
  } catch (error) {
    console.error(
      "Could not look up personal details:",
      error,
    );

    return {
      status: "error",
      message:
        "The portfolio profile could not be loaded. Please try again later.",
      errors: {},
    };
  }

  if (!personalDetails) {
    console.error(
      `No personal_details record found for ${gmailUser}.`,
    );

    return {
      status: "error",
      message:
        "The portfolio profile could not be found. Please try again later.",
      errors: {},
    };
  }

  /*
   * Store the request as pending before sending the email.
   */
  let requestId: string | null = null;

  try {
    const createdRequest =
      await prisma.cv_request.create({
        data: {
          requester_name,
          requester_email,
          reason,
          request_status: "pending",
          personal_details_id_fk:
            personalDetails.id,
        },
        select: {
          id: true,
        },
      });

    requestId = createdRequest.id;
  } catch (error) {
    console.error(
      "Could not save CV request:",
      error,
    );

    return {
      status: "error",
      message:
        "Your request could not be saved. Please try again later.",
      errors: {},
    };
  }

  const ownerName = [
    personalDetails.first_name,
    personalDetails.middle_name,
    personalDetails.last_name,
  ]
    .filter(
      (name): name is string =>
        Boolean(name && name.trim()),
    )
    .join(" ");

  /*
   * Load public/mycv.pdf and send it as an attachment.
   */
  try {
    const cvPath = path.join(
      process.cwd(),
      "public",
      "mycv.pdf",
    );

    const cvFile = await readFile(cvPath);

    const transporter =
      nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailAppPassword,
        },
      });

    await transporter.sendMail({
      from: {
        name: ownerName,
        address: gmailUser,
      },

      to: requester_email,

      subject: `${ownerName} — Curriculum Vitae`,

      text: `Hi ${requester_name},

Thank you for your interest in my portfolio. I have attached my latest CV for your review.

Best regards,
${ownerName}`,

      attachments: [
        {
          filename:
            "Eloisa-Marie-Llena-CV.pdf",
          content: cvFile,
          contentType: "application/pdf",
        },
      ],
    });
  } catch (error) {
    console.error(
      `CV request ${requestId} was saved, but the email could not be sent:`,
      error,
    );

    /*
     * The request remains pending so you can find it
     * in the database and follow up manually.
     */
    return {
      status: "error",
      message:
        "Your request was saved, but the email could not be sent. Please try again later.",
      errors: {},
    };
  }

  /*
   * Email sending succeeded.
   * Update the database status and sent date.
   */
  try {
    await prisma.cv_request.update({
      where: {
        id: requestId,
      },
      data: {
        request_status: "sent",
        sent_at: new Date(),
      },
    });
  } catch (error) {
    /*
     * The requester already received the email.
     * Log the database update failure without falsely
     * telling them that email sending failed.
     */
    console.error(
      `CV email was sent, but request ${requestId} could not be updated:`,
      error,
    );
  }

  return {
    status: "success",
    message:
      "Your CV request was successful. Please check your email inbox and spam folder.",
    errors: {},
  };
}