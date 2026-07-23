'use client';

import { useState } from "react";
import { Button, Cform, TextField } from "@eloisallena/web_components";
import { personal_details as PersonalDetails } from "@/generated/prisma/client";
import { JsonValue } from "@prisma/client/runtime/client";
import {
  createPersonalDetails,
  updatePersonalDetails,
  deletePersonalDetails,
} from "@/lib/actions/admin-actions";
import { personalDetailsFormSchema } from "@/lib/validations/personal-details";
import { getFieldErrors } from "@/lib/validations/shared";
import FieldError from "@/lib/validations/field-error";

interface PersonalDetailsSectionProps {
  initialData: PersonalDetails | null;
}

export default function PersonalDetailsSection({ initialData }: PersonalDetailsSectionProps) {
  const [firstName, setFirstName] = useState(initialData?.first_name ?? "");
  const [middleName, setMiddleName] = useState(initialData?.middle_name ?? "");
  const [lastName, setLastName] = useState(initialData?.last_name ?? "");
  const [languages, setLanguages] = useState(initialData?.languages ?? "");
  const [email, setEmail] = useState(initialData?.email ?? "");
  const [phoneNumber, setPhoneNumber] = useState(initialData?.phone_number ?? "");
  const [whatIDo, setWhatIDo] = useState(initialData?.what_i_do ?? "");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isExisting = !!initialData;

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const formValues = {
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      languages,
      email,
      phone_number: phoneNumber,
      what_i_do: whatIDo,
    };

    const fieldErrors = getFieldErrors(personalDetailsFormSchema, formValues);
    if (fieldErrors) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    setLoading(true);
    try {
      const payload: PersonalDetails = {
        id: initialData?.id ?? "",
        first_name: firstName,
        middle_name: middleName || null,
        last_name: lastName,
        languages,
        email,
        phone_number: phoneNumber || null,
        what_i_do: whatIDo || null,
        interests: initialData?.interests || null,
        introduction: initialData?.introduction || null,
        socials: (initialData?.socials as JsonValue) ?? null,
      };
      if (isExisting) {
        await updatePersonalDetails(initialData!.id, payload);
      } else {
        await createPersonalDetails(payload);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!isExisting) return;
    setLoading(true);
    try {
      await deletePersonalDetails(initialData!.id);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div data-mode="light" className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <Cform onSubmit={handleSubmit}>
        <div
          data-mode="light"
          className="flex flex-col gap-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div>
            <TextField
              labelText="First Name"
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <FieldError message={errors.first_name} />
          </div>

          <div>
            <TextField
              labelText="Middle Name"
              id="middleName"
              type="text"
              placeholder="Enter your middle name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
            <FieldError message={errors.middle_name} />
          </div>

          <div>
            <TextField
              labelText="Last Name"
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <FieldError message={errors.last_name} />
          </div>

          <div>
            <TextField
              labelText="Languages"
              id="languages"
              type="text"
              placeholder="Enter languages you know"
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
            />
            <FieldError message={errors.languages} />
          </div>

          <div>
            <TextField
              labelText="Email"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FieldError message={errors.email} />
          </div>

          <div>
            <TextField
              labelText="Phone Number"
              id="phoneNumber"
              type="text"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <FieldError message={errors.phone_number} />
          </div>

          <div>
            <TextField
              labelText="What I Do"
              id="whatIDo"
              type="text"
              placeholder="Enter what you do"
              value={whatIDo}
              onChange={(e) => setWhatIDo(e.target.value)}
            />
            <FieldError message={errors.what_i_do} />
          </div>

          <div data-mode="light" className="flex justify-end gap-2 mt-2">
            <Button
              type="submit"
              variant="primary"
              label={loading ? "Saving..." : isExisting ? "Update" : "Create"}
              disabled={loading}
            />
            {isExisting && (
              <Button
                type="button"
                variant="delete"
                label="Delete"
                onClick={handleDelete}
                disabled={loading}
              />
            )}
          </div>
        </div>
      </Cform>
    </div>
  );
}