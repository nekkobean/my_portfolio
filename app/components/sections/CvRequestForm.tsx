"use client";

import { useActionState, useEffect, useRef } from "react";

import {
  Button,
  TextField,
} from "@eloisallena/web_components";

import { submitCvRequest } from "@/lib/actions/cv-request";
import type { CvRequestActionState } from "@/lib/validations/cv-request";

export interface CvRequestFormProps {
  onCancel: () => void;
}

const initialState: CvRequestActionState = {
  status: "idle",
  message: "",
  errors: {},
};

export default function CvRequestForm({
  onCancel,
}: CvRequestFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    submitCvRequest,
    initialState,
  );

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      className="flex flex-col gap-5"
    >
      <p className="whitespace-normal text-base text-gray-600 md:text-lg">
        Let&apos;s connect! Fill out this form to receive my latest CV through
        email.
      </p>

      {/* Hidden anti-bot field */}
      <div
        className="hidden"
        aria-hidden="true"
      >
        <label htmlFor="website">
          Website
        </label>

        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <TextField
        id="requester_name"
        name="requester_name"
        labelText="Name"
        placeholder="Enter your complete name"
        type="text"
        error={Boolean(state.errors?.requester_name?.length)}
        helperText={state.errors?.requester_name?.[0]}
      />

      <TextField
        id="requester_email"
        name="requester_email"
        labelText="Email"
        placeholder="Enter your email address"
        type="email"
        error={Boolean(state.errors?.requester_email?.length)}
        helperText={state.errors?.requester_email?.[0]}
      />

      <TextField
        id="reason"
        name="reason"
        labelText="Reason"
        placeholder="Why are you requesting my CV?"
        type="text"
        error={Boolean(state.errors?.reason?.length)}
        helperText={state.errors?.reason?.[0]}
      />

      {state.message && (
        <p
          aria-live="polite"
          className={
            state.status === "success"
              ? "whitespace-normal text-base font-medium text-green-700"
              : "whitespace-normal text-base font-medium text-red-600"
          }
        >
          {state.message}
        </p>
      )}

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="secondary"
          label="Cancel"
          disabled={isPending}
          onClick={onCancel}
        />

        <Button
          type="submit"
          variant="primary"
          label={isPending ? "Sending..." : "Submit"}
          isLoading={isPending}
          disabled={isPending}
        />
      </div>
    </form>
  );
}