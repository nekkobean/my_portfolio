"use client";
import {
  Button,
  Card,
  CardContent,
  LandingLayout,
  Section,
  Cform,
  TextField,
  Select,
  CheckBox,
  CardImage,
  Modal,
} from "@eloisallena/web_components";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [IsOpen, setOpen] = useState(false);

  return (
    <>
      <LandingLayout
        logo="catlogo.png"
        companyTitle="elois.dev"
        description="Open to internships, collaborations, and future opportunities where I can learn, innovate, and make a positive impact."
        email="elois.dev@gmail.com"
        phone="+63 900 000 0000"
        copyright="© 2026 ELOI. All rights reserved."
        headerClassName="bg-light-orange" //bg-blue
        navLabelClassName="text-white hover:text-orange" //text-red hover:text-gray
        companyTitleClassName="text-white" //text-red
        breadcrumbClassName="bg-gray-200" //bg-blue
        breadcrumbTextClassName="text-light-black" //text-green
        footerClassName="" //bg-blue text-green
        footerBottomClassName="" //bg-blue text-gray
        socials={[
          {
            id: 1,
            label: "Facebook",
            href: "https://ph.linkedin.com/in/eloisa-marie-llena-95274b339",
          },
          {
            id: 2,
            label: "LinkedIn",
            href: "https://ph.linkedin.com/in/eloisa-marie-llena-95274b339",
          },
          {
            id: 3,
            label: "GitHub",
            href: "https://github.com/nekkobean",
          },
        ]}
        navItems={[
          { id: 1, href: "#home", label: "Home" },
          { id: 2, href: "#about-me", label: "About Me" },
          { id: 3, href: "#projects", label: "Projects" },
          { id: 4, href: "#skills", label: "Skills" },
          { id: 5, href: "#contact", label: "Contact" },
        ]}
      >
        <Section id="home" title="Dashboard" style="bg-gray-100" >
          <div
            data-mode="light"
            className="flex min-h-[70vh] items-center justify-center rounded-2xl bg-white p-10 shadow-md"
          >
            <div className="max-w-2xl text-center">
              <h1 className="mb-4 text-4xl font-bold md:text-6xl hover:text-orange">
                Hello, I&apos;m Eloisa Llena
              </h1>
              <p className="text-base text-gray-600 md:text-lg">
                BSIT undergraduate passionate about project management, quality
                assurance, programming, and UI/UX design. Experienced in leading
                academic projects using Agile and Scrum methodologies while
                ensuring high-quality and user-friendly digital solutions.
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
                  isOpen={IsOpen}
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

        <Section id="about-me" title="About Me" style="bg-white text-black">
          <div
            data-mode="light"
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            <Card style="bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <CardContent
                title="Education"
                description={`Polytechnic University of the Philippines – San Pedro Campus
          Bachelor of Science in Information Technology
          2022 – Present
          
          General Mariano Alvarged Technical High School
          Science, Technology, Engineering, and Mathematics (STEM)
          2020 – 2022
          Graduated with High Honors`}
              />
            </Card>
            <Card style="bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <CardContent
                title="What I Do"
                description="I have experience working with Next.js, Vite, Storybook, and TypeScript while also applying Agile, Scrum, Quality Assurance, and UI/UX design principles in academic and collaborative projects. I enjoy turning ideas into functional and visually appealing solutions while continuously learning new technologies."
              />
            </Card>
            <Card  style="bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <CardContent
                title="Interests"
                description={`Product Design
            Software Testing
            Project Leadership
            Technology Innovation`}
              />
            </Card>
          </div>
        </Section>

        <Section id="projects" title="Projects" style="bg-gray-100 text-black">
          <div
            data-mode="light"
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            <Card style="bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
               <CardImage alt="Elogo" image="/elogo.png" />
              <CardContent
                title="E-Kolek Application"
                description={`Role: Project Manager, Scrum Master & QA Tester

                Description

                A waste management incentive application developed with a client to encourage proper waste turnover.

                Contributions

                Facilitated Scrum events
                Managed project timeline
                Gathered client requirements
                Conducted QA testing
                Assisted feature planning

                Technologies

                Scrum
                Agile
                Canva
                Jira
                QA Testing`}
              />
            </Card>
            <Card style="bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <CardImage alt="Elogo" image="/elogo.png" />
              <CardContent
                title="DiversiTea POS System"
                description={`Role: Project Manager & QA Tester

                Description

                A Point-of-Sale system developed for a café to streamline order processing and inventory management.

                Contributions

                Led a team of 6 members
                Managed tasks and project progress
                Conducted QA testing
                Assisted in UI/UX design

                Technologies

                Canva
                Jira
                HTML/CSS`}
              />
            </Card>

            <Card style="bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <CardImage alt="Elogo" image="/elogo.png" />
              <CardContent
                title="Web Components Library"
                description={`Role: Frontend Developer

                Description

                A reusable React component library for building modern and responsive web interfaces.

                Contributions

                Developed reusable UI components.
                Configured npm package distribution.
                Documented components with Storybook.
                Integrated the library with Next.js.

                Technologies

                React
                TypeScript
                Next.js
                Vite
                Storybook
                npm
                Tailwind CSS `}
                              />
            </Card>
          </div>
        </Section>

        <Section id="skills" title="Skills" style="bg-white text-black">
          <div
            data-mode="light"
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            <Card style="bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <CardContent
                title="Technical Skills"
                description={`- HTML 
                - CSS 
                - Figma 
                - Jira 
                - Trello 
                - ClickUp 
                - MS Office React 
                - Next.js 
                - TypeScript 
                - Tailwind CSS 
                - Vite 
                - Storybook 
                - NPM 
                - Git`}
              />
            
            </Card>
            <Card  style="bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <CardContent
                title="Soft Skills"
                description={`Communication 
              Leadership 
              Teamwork Problem 
              Solving Adaptability 
              Time Management`}
              />
            </Card>
            <Card  style="bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <CardContent
                title="Languages"
                description={`English
              Filipino`}
              />
            </Card>
          </div>
        </Section>

        <Section id="contact" title="Contact Me" style="bg-white text-black">
          <div
            data-mode="light"
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            <Cform>
              <div
                data-mode="light"
                className="flex flex-col gap-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
                <div data-mode="light" className="flex justify-end gap-2 mt-2">
                  <Button variant="primary" label="Submit" />
                  <Button variant="secondary" label="Cancel" />
                </div>
              </div>
            </Cform>
          </div>
        </Section>
      </LandingLayout>
    </>
  );
}
