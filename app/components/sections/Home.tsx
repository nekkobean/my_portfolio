"use client";

import { useState } from "react";
import { Section, Button, Modal, TextField } from "@eloisallena/web_components";

export interface HomeProps {
  first_name?: string;
  middle_name?: string | null;
  last_name?: string;
  introduction?: string | null;
}

export default function Home({ info }: { info: HomeProps }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <Section id="home" title="Dashboard" style="bg-gray-100">
      <div
        data-mode="light"
        className="flex min-h-[70vh] items-center justify-center rounded-2xl bg-white p-10 shadow-md"
      >
        <div className="max-w-2xl text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl hover:text-orange">
            Hello, I&apos;m {info.first_name} {info.middle_name}{" "}
            {info.last_name}
          </h1>
          <p className="text-base text-gray-600 md:text-lg">
           {info.introduction}
          </p>
          <div
            data-mode="light"
            className="flex justify-center max-w-full whitespace-nowrap  mt-5"
          >
            <Button
              variant="secondary"
              label="Download Cv"
              style="bg-secondary-button text-white hover:bg-orange hover:text-white"
              onClick={() => setOpen(true)}
            />
            <Modal
              isOpen={isOpen}
              title="Fill Out Form"
              onClose={() => setOpen(false)}
            >
              <TextField
                labelText="Let's connect! Fill out the form to receive my latest CV."
                id="name"
                placeholder="Enter your name"
                type="text"
              />
              <TextField
                labelText=""
                id="email"
                placeholder="Enter your email"
                type="email"
              />
              <TextField
                labelText=""
                id="reason"
                placeholder="Please state your reason"
                type="text"
              />
              <div className="flex justify-end gap-2 mt-5">
                <Button variant="primary" label="Submit" />
                <Button variant="secondary" label="Cancel" />
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </Section>
  );
}
