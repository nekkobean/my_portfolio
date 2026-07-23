"use client";
import {
  Button,
  Cform,
  CheckBox,
  Section,
  Select,
  TextField,
} from "@eloisallena/web_components";

export default function Contact() {
  return (
    <Section
      id="contact"
      title="Contact Me"
      style="bg-white text-black"
      sectionTitleClassName="text-black text-2xl md:text-3xl lg:text-4xl"
    >
      <div data-mode="light" className="flex justify-center">
        <Cform>
          <div
            data-mode="light"
            className="flex flex-col gap-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xl"
          >
            <TextField
              labelText="Name"
              id="name"
              type="text"
              placeholder="Enter your name"
            />
            <TextField
              labelText="Email"
              id="email"
              placeholder="Enter your email"
              type="email"
            />
            <Select
              label="Reason for Contact"
              options={[
                { key: 0, name: "", value: "Select a Reason" },
                { key: 1, name: "option1", value: "Inquiry" },
                { key: 2, name: "option2", value: "Feedback" },
                { key: 3, name: "option3", value: "Other" },
              ]}
            />
            <CheckBox
              id="terms"
              label="Accept Terms & Conditions"
              helperText="You must accept the terms and conditions to proceed."
            />
            <div data-mode="light" className="flex justify-end gap-3 mt-8">
              <Button variant="primary" label="Submit" />
              <Button variant="secondary" label="Cancel" />
            </div>
          </div>
        </Cform>
      </div>
    </Section>
  );
}