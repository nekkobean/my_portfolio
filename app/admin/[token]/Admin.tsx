"use client";
import { useState } from "react";
import {
  Button,
  CheckBox,
  Cform,
  Select,
  TextField,
} from "@eloisallena/web_components";
// import PersonalDetails from "@/lib/types/personal-details";
import { personal_details as PersonalDetails } from "@/generated/prisma/client";
import { education as EducationInput } from "@/generated/prisma/client";
import { project as ProjectInput } from "@/generated/prisma/client";
import { skill as SkillInput } from "@/generated/prisma/client";

import {
  createPersonalDetails,
  updatePersonalDetails,
  deletePersonalDetails,
  // type PersonalDetailsInput,
} from "@/lib/actions/admin-actions";
import {
  createEducation,
  deleteEducation,
} from "@/lib/actions/education-actions";
import { createSkill, deleteSkill } from "@/lib/actions/skill-actions";
import { createProject, deleteProject } from "@/lib/actions/project-actions";
import type {
  education_level,
  skill_category,
  project_status,
} from "@/generated/prisma/enums";
import { JsonValue } from "@prisma/client/runtime/client";

interface AdminFormProps {
  initialData: PersonalDetails;
  initialEducations: EducationInput[];
  initialSkills: SkillInput[];
  initialProjects: ProjectInput[];
}

const LEVEL_OPTIONS = [
  { key: 1, name: "primary", value: "Primary" },
  { key: 2, name: "secondary", value: "Secondary" },
  { key: 3, name: "tertiary", value: "Tertiary" },
  { key: 4, name: "masteral", value: "Masteral" },
  { key: 5, name: "doctorate", value: "Doctorate" },
];

const SKILL_CATEGORY_OPTIONS = [
  { key: 1, name: "hard", value: "Hard Skill" },
  { key: 2, name: "soft", value: "Soft Skill" },
  { key: 3, name: "core", value: "Core Skill" },
];

const PROJECT_STATUS_OPTIONS = [
  { key: 1, name: "ongoing", value: "Ongoing" },
  { key: 2, name: "finished", value: "Finished" },
  { key: 3, name: "cancelled", value: "Cancelled" },
];

export default function AdminForm({
  initialData,
  initialEducations,
  initialSkills,
  initialProjects,
}: AdminFormProps) {
  // ---------- Personal details state ----------
  const [firstName, setFirstName] = useState(initialData?.first_name ?? "");
  const [middleName, setMiddleName] = useState(initialData?.middle_name ?? "");
  const [lastName, setLastName] = useState(initialData?.last_name ?? "");
  const [languages, setLanguages] = useState(initialData?.languages ?? "");
  const [email, setEmail] = useState(initialData?.email ?? "");
  const [phoneNumber, setPhoneNumber] = useState(
    initialData?.phone_number ?? "",
  );
  const [whatIDo, setWhatIDo] = useState(initialData?.what_i_do ?? "");
  const [loading, setLoading] = useState(false);

  const isExisting = !!initialData;

  // ---------- Education state ----------
  const [educations, setEducations] =
    useState<EducationInput[]>(initialEducations);
  const [level, setLevel] = useState("primary");
  const [schoolName, setSchoolName] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [yearAttended, setYearAttended] = useState("");
  const [yearGraduated, setYearGraduated] = useState("");
  const [course, setCourse] = useState("");
  const [description, setDescription] = useState("");
  const [eduLoading, setEduLoading] = useState(false);

  // ---------- Skill state ----------
  const [skills, setSkills] = useState<SkillInput[]>(initialSkills);
  const [skillName, setSkillName] = useState("");
  const [skillCategory, setSkillCategory] = useState("hard");
  const [skillDescription, setSkillDescription] = useState("");
  const [proficiencyLevel, setProficiencyLevel] = useState("");
  const [skillLoading, setSkillLoading] = useState(false);

  // ---------- Project state ----------
  const [projects, setProjects] = useState<ProjectInput[]>(initialProjects);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectImage, setProjectImage] = useState("");
  const [projectType, setProjectType] = useState("");
  const [role, setRole] = useState("");
  const [technologiesUsed, setTechnologiesUsed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [repositoryLink, setRepositoryLink] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectStatus, setProjectStatus] = useState("ongoing");
  const [isOngoing, setIsOngoing] = useState(false);
  const [projectLoading, setProjectLoading] = useState(false);

  // ---------- Personal details handlers ----------

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload: PersonalDetails = {
        id: initialData?.id ?? "", // Use existing ID if updating, otherwise empty string for creation
        first_name: firstName,
        middle_name: middleName || null,
        last_name: lastName,
        languages,
        email,
        phone_number: phoneNumber || null,
        what_i_do: whatIDo || null,
        interests: initialData?.interests || null, // Keep existing interests if available
        introduction: initialData?.introduction || null, // Keep existing introduction if available
        socials: initialData.socials as JsonValue, // Keep existing socials if available
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

  // ---------- Education handlers ----------

  function resetEducationForm() {
    setLevel("primary");
    setSchoolName("");
    setSchoolAddress("");
    setYearAttended("");
    setYearGraduated("");
    setCourse("");
    setDescription("");
  }

  async function handleAddEducation(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!initialData) return;
    if (!schoolName || !schoolAddress || !yearAttended) return;

    setEduLoading(true);
    try {
      const payload: EducationInput = {
        id: "", // ID will be generated by the database
        level: level as education_level,
        school_name: schoolName,
        school_address: schoolAddress,
        year_attended: new Date(yearAttended),
        year_graduated: yearGraduated ? new Date(yearGraduated) : null,
        course: course || null,
        description: description || null,
        personal_details_id_fk: initialData.id,
      };
      const created = await createEducation(payload);
      setEducations((prev) => [created, ...prev]);
      resetEducationForm();
    } finally {
      setEduLoading(false);
    }
  }

  async function handleDeleteEducation(id: string) {
    setEduLoading(true);
    try {
      await deleteEducation(id);
      setEducations((prev) => prev.filter((edu) => edu.id !== id));
    } finally {
      setEduLoading(false);
    }
  }

  // ---------- Skill handlers ----------

  function resetSkillForm() {
    setSkillName("");
    setSkillCategory("hard");
    setSkillDescription("");
    setProficiencyLevel("");
  }

  async function handleAddSkill(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!initialData) return;
    if (!skillName) return;

    setSkillLoading(true);
    try {
      const payload: SkillInput = {
        id: "", // ID will be generated by the database
        skill_name: skillName,
        skill_category: skillCategory as skill_category,
        skill_description: skillDescription || null,
        proficiency_level: proficiencyLevel ? Number(proficiencyLevel) : null,
        personal_details_id_fk: initialData.id,
      };
      const created = await createSkill(payload);
      setSkills((prev) => [created, ...prev]);
      resetSkillForm();
    } finally {
      setSkillLoading(false);
    }
  }

  async function handleDeleteSkill(id: string) {
    setSkillLoading(true);
    try {
      await deleteSkill(id);
      setSkills((prev) => prev.filter((s) => s.id !== id));
    } finally {
      setSkillLoading(false);
    }
  }

  // ---------- Project handlers ----------

  function resetProjectForm() {
    setProjectTitle("");
    setProjectDescription("");
    setProjectImage("");
    setProjectType("");
    setRole("");
    setTechnologiesUsed("");
    setProjectLink("");
    setRepositoryLink("");
    setStartDate("");
    setEndDate("");
    setProjectStatus("ongoing");
    setIsOngoing(false);
  }

  async function handleAddProject(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!initialData) return;
    if (!projectTitle || !projectDescription || !technologiesUsed || !startDate)
      return;

    setProjectLoading(true);
    try {
      const payload: ProjectInput = {
        id: "", // ID will be generated by the database
        project_title: projectTitle,
        project_description: projectDescription,
        project_image: projectImage || null,
        project_type: projectType || null,
        role: role || null,
        technologies_used: technologiesUsed,
        project_link: projectLink || null,
        repository_link: repositoryLink || null,
        start_date: new Date(startDate),
        end_date: endDate ? new Date(endDate) : null,
        created_at: new Date(),
        updated_at: new Date(),
        project_status: projectStatus as project_status,
        is_ongoing: isOngoing,
        personal_details_id_fk: initialData.id,
      };
      const created = await createProject(payload);
      setProjects((prev) => [created, ...prev]);
      resetProjectForm();
    } finally {
      setProjectLoading(false);
    }
  }

  async function handleDeleteProject(id: string) {
    setProjectLoading(true);
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } finally {
      setProjectLoading(false);
    }
  }

  // ---------- Render ----------

  return (
    <div className="min-h-screen w-full bg-white flex flex-col gap-10 px-4 py-10">
      {/* Personal Details Form */}
      <div data-mode="light" className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Cform onSubmit={handleSubmit}>
          <div
            data-mode="light"
            className="flex flex-col gap-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <TextField
              labelText="First Name"
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              labelText="Middle Name"
              id="middleName"
              type="text"
              placeholder="Enter your middle name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
            <TextField
              labelText="Last Name"
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              labelText="Languages"
              id="languages"
              type="text"
              placeholder="Enter languages you know"
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
            />
            <TextField
              labelText="Email"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              labelText="Phone Number"
              id="phoneNumber"
              type="text"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextField
              labelText="What I Do"
              id="whatIDo"
              type="text"
              placeholder="Enter what you do"
              value={whatIDo}
              onChange={(e) => setWhatIDo(e.target.value)}
            />
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

      {/* Education Section */}
      <div data-mode="light" className="flex flex-col gap-6 bg-white">
        <h2 className="text-lg font-semibold text-black">Education</h2>

        {educations.map((edu) => (
          <div
            key={edu.id}
            data-mode="light"
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            <div
              data-mode="light"
              className="flex flex-col gap-2 bg-white shadow-md rounded-lg border border-gray-200 px-8 pt-6 pb-8"
            >
              <p className="font-medium text-black">
                {edu.school_name} —{" "}
                <span className="capitalize">{edu.level}</span>
              </p>
              <p className="text-sm text-gray-500">
                {edu.school_address} ·{" "}
                {new Date(edu.year_attended).getFullYear()}
                {edu.year_graduated
                  ? ` – ${new Date(edu.year_graduated).getFullYear()}`
                  : ""}
              </p>
              {edu.course && <p className="text-sm text-black">{edu.course}</p>}
              {edu.description && (
                <p className="text-sm text-gray-500">{edu.description}</p>
              )}
              <div className="flex justify-end mt-2">
                <Button
                  type="button"
                  variant="delete"
                  label="Delete"
                  onClick={() => handleDeleteEducation(edu.id)}
                  disabled={eduLoading}
                />
              </div>
            </div>
          </div>
        ))}

        {isExisting && (
          <div
            data-mode="light"
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            <Cform onSubmit={handleAddEducation}>
              <div
                data-mode="light"
                className="flex flex-col gap-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <Select
                  label="Level"
                  options={LEVEL_OPTIONS}
                  value={level}
                  onChange={(val) => setLevel(val)}
                />
                <TextField
                  labelText="School Name"
                  id="schoolName"
                  type="text"
                  placeholder="Enter school name"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                />
                <TextField
                  labelText="School Address"
                  id="schoolAddress"
                  type="text"
                  placeholder="Enter school address"
                  value={schoolAddress}
                  onChange={(e) => setSchoolAddress(e.target.value)}
                />
                <TextField
                  labelText="Year Attended"
                  id="yearAttended"
                  type="text"
                  placeholder="YYYY-MM-DD"
                  value={yearAttended}
                  onChange={(e) => setYearAttended(e.target.value)}
                />
                <TextField
                  labelText="Year Graduated (optional)"
                  id="yearGraduated"
                  type="text"
                  placeholder="YYYY-MM-DD"
                  value={yearGraduated}
                  onChange={(e) => setYearGraduated(e.target.value)}
                />
                <TextField
                  labelText="Course (optional)"
                  id="course"
                  type="text"
                  placeholder="Enter course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />
                <TextField
                  labelText="Description (optional)"
                  id="description"
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div data-mode="light" className="flex justify-end gap-2 mt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    label={eduLoading ? "Adding..." : "Add Education"}
                    disabled={eduLoading}
                  />
                </div>
              </div>
            </Cform>
          </div>
        )}
        {!isExisting && (
          <p className="text-sm text-gray-500">
            Save your personal details first before adding education entries.
          </p>
        )}
      </div>

      {/* Skills Section */}
      <div data-mode="light" className="flex flex-col gap-6 bg-white">
        <h2 className="text-lg font-semibold text-black">Skills</h2>

        {skills.map((skill) => (
          <div
            key={skill.id}
            data-mode="light"
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            <div
              data-mode="light"
              className="flex flex-col gap-2 bg-white shadow-md rounded-lg border border-gray-200 px-8 pt-6 pb-8"
            >
              <p className="font-medium text-black">
                {skill.skill_name} —{" "}
                <span className="capitalize">{skill.skill_category}</span>
              </p>
              {skill.proficiency_level !== null && (
                <p className="text-sm text-gray-500">
                  Proficiency: {skill.proficiency_level}/10
                </p>
              )}
              {skill.skill_description && (
                <p className="text-sm text-gray-500">
                  {skill.skill_description}
                </p>
              )}
              <div className="flex justify-end mt-2">
                <Button
                  type="button"
                  variant="delete"
                  label="Delete"
                  onClick={() => handleDeleteSkill(skill.id)}
                  disabled={skillLoading}
                />
              </div>
            </div>
          </div>
        ))}

        {isExisting && (
          <div
            data-mode="light"
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            <Cform onSubmit={handleAddSkill}>
              <div
                data-mode="light"
                className="flex flex-col gap-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <TextField
                  labelText="Skill Name"
                  id="skillName"
                  type="text"
                  placeholder="Enter skill name"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                />
                <Select
                  label="Category"
                  options={SKILL_CATEGORY_OPTIONS}
                  value={skillCategory}
                  onChange={(val) => setSkillCategory(val)}
                />
                <TextField
                  labelText="Description (optional)"
                  id="skillDescription"
                  type="text"
                  placeholder="Enter skill description"
                  value={skillDescription}
                  onChange={(e) => setSkillDescription(e.target.value)}
                />
                <TextField
                  labelText="Proficiency Level (0-10, optional)"
                  id="proficiencyLevel"
                  type="number"
                  placeholder="Enter proficiency level"
                  value={proficiencyLevel}
                  onChange={(e) => setProficiencyLevel(e.target.value)}
                />
                <div data-mode="light" className="flex justify-end gap-2 mt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    label={skillLoading ? "Adding..." : "Add Skill"}
                    disabled={skillLoading}
                  />
                </div>
              </div>
            </Cform>
          </div>
        )}
        {!isExisting && (
          <p className="text-sm text-gray-500">
            Save your personal details first before adding skills.
          </p>
        )}
      </div>

      {/* Projects Section */}
      <div data-mode="light" className="flex flex-col gap-6 bg-white">
        <h2 className="text-lg font-semibold text-black">Projects</h2>

        {projects.map((project) => (
          <div
            key={project.id}
            data-mode="light"
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            <div
              data-mode="light"
              className="flex flex-col gap-2 bg-white shadow-md rounded-lg border border-gray-200 px-8 pt-6 pb-8"
            >
              <p className="font-medium text-black">
                {project.project_title} —{" "}
                <span className="capitalize">{project.project_status}</span>
              </p>
              <p className="text-sm text-gray-500">
                {new Date(project.start_date).toLocaleDateString()}
                {project.end_date
                  ? ` – ${new Date(project.end_date).toLocaleDateString()}`
                  : project.is_ongoing
                    ? " – Present"
                    : ""}
              </p>
              <p className="text-sm text-black">
                {project.project_description}
              </p>
              <p className="text-sm text-gray-500">
                Tech: {project.technologies_used}
              </p>
              {project.role && (
                <p className="text-sm text-gray-500">Role: {project.role}</p>
              )}
              {project.project_link && (
                <a
                  href={project.project_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 underline"
                >
                  View Project
                </a>
              )}
              {project.repository_link && (
                <a
                  href={project.repository_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 underline"
                >
                  View Repository
                </a>
              )}
              <div className="flex justify-end mt-2">
                <Button
                  type="button"
                  variant="delete"
                  label="Delete"
                  onClick={() => handleDeleteProject(project.id)}
                  disabled={projectLoading}
                />
              </div>
            </div>
          </div>
        ))}

        {isExisting && (
          <div
            data-mode="light"
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            <Cform onSubmit={handleAddProject}>
              <div
                data-mode="light"
                className="flex flex-col gap-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <TextField
                  labelText="Project Title"
                  id="projectTitle"
                  type="text"
                  placeholder="Enter project title"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                />
                <TextField
                  labelText="Project Description"
                  id="projectDescription"
                  type="text"
                  placeholder="Enter project description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
                <TextField
                  labelText="Project Image URL (optional)"
                  id="projectImage"
                  type="text"
                  placeholder="Enter image URL"
                  value={projectImage}
                  onChange={(e) => setProjectImage(e.target.value)}
                />
                <TextField
                  labelText="Project Type (optional)"
                  id="projectType"
                  type="text"
                  placeholder="e.g. Web App, Mobile App"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                />
                <TextField
                  labelText="Role (optional)"
                  id="role"
                  type="text"
                  placeholder="e.g. Frontend Developer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
                <TextField
                  labelText="Technologies Used"
                  id="technologiesUsed"
                  type="text"
                  placeholder="e.g. Next.js, Prisma, MySQL"
                  value={technologiesUsed}
                  onChange={(e) => setTechnologiesUsed(e.target.value)}
                />
                <TextField
                  labelText="Project Link (optional)"
                  id="projectLink"
                  type="text"
                  placeholder="Enter live project URL"
                  value={projectLink}
                  onChange={(e) => setProjectLink(e.target.value)}
                />
                <TextField
                  labelText="Repository Link (optional)"
                  id="repositoryLink"
                  type="text"
                  placeholder="Enter repository URL"
                  value={repositoryLink}
                  onChange={(e) => setRepositoryLink(e.target.value)}
                />
                <TextField
                  labelText="Start Date"
                  id="startDate"
                  type="text"
                  placeholder="YYYY-MM-DD"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <TextField
                  labelText="End Date (optional)"
                  id="endDate"
                  type="text"
                  placeholder="YYYY-MM-DD"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <Select
                  label="Project Status"
                  options={PROJECT_STATUS_OPTIONS}
                  value={projectStatus}
                  onChange={(val) => setProjectStatus(val)}
                />
                <CheckBox
                  id="isOngoing"
                  label="Currently Ongoing"
                  helperText="Check this if the project is still in progress"
                />
                <div data-mode="light" className="flex justify-end gap-2 mt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    label={projectLoading ? "Adding..." : "Add Project"}
                    disabled={projectLoading}
                  />
                </div>
              </div>
            </Cform>
          </div>
        )}
        {!isExisting && (
          <p className="text-sm text-gray-500">
            Save your personal details first before adding projects.
          </p>
        )}
      </div>
    </div>
  );
}
