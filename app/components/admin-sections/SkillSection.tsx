'use client';

import { useState } from "react";
import {
  Button,
  Cform,
  Ctable,
  Modal,
  Select,
  TableBody,
  TableCell,
  TableHead,
  TextField,
} from "@eloisallena/web_components";
import type { TableHeadCell } from "@eloisallena/web_components";
import { skill as SkillInput } from "@/generated/prisma/client";
import type { skill_category } from "@/generated/prisma/enums";
import {
  createSkill,
  deleteSkill,
  updateSkill,
  type SkillCreateInput,
} from "@/lib/actions/skill-actions";

interface SkillSectionProps {
  personalDetailsId: string | null;
  initialSkills: SkillInput[];
}

const SKILL_CATEGORY_OPTIONS = [
  { key: 1, name: "hard", value: "Hard Skill" },
  { key: 2, name: "soft", value: "Soft Skill" },
  { key: 3, name: "core", value: "Core Skill" },
];

const COLUMNS: TableHeadCell[] = [
  { key: 1, name: "skill_name", value: "Skill Name" },
  { key: 2, name: "skill_category", value: "Category" },
  { key: 3, name: "proficiency_level", value: "Proficiency" },
  { key: 4, name: "skill_description", value: "Description" },
  { key: 5, name: "actions", value: "Actions" },
];

const CELL_BORDER = "border-b border-light-gray";
const ROW_CLASS = "transition-colors hover:bg-gray-50 [&:last-child_td]:border-b-0";

interface EditForm {
  skill_name: string;
  skill_category: string;
  skill_description: string;
  proficiency_level: string;
}

export default function SkillSection({ personalDetailsId, initialSkills }: SkillSectionProps) {
  const [skills, setSkills] = useState<SkillInput[]>(initialSkills);
  const [skillLoading, setSkillLoading] = useState(false);

  // ---------- Add modal state ----------
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [skillCategory, setSkillCategory] = useState("hard");
  const [skillDescription, setSkillDescription] = useState("");
  const [proficiencyLevel, setProficiencyLevel] = useState("");

  // ---------- Edit (inline row) state ----------
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<EditForm | null>(null);

  function resetSkillForm() {
    setSkillName("");
    setSkillCategory("hard");
    setSkillDescription("");
    setProficiencyLevel("");
  }

  function openAddModal() {
    resetSkillForm();
    setIsAddModalOpen(true);
  }

  function closeAddModal() {
    setIsAddModalOpen(false);
  }

  async function handleAddSkill(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!personalDetailsId) return;
    if (!skillName) return;

    setSkillLoading(true);
    try {
      const payload: SkillCreateInput = {
        skill_name: skillName,
        skill_category: skillCategory as skill_category,
        skill_description: skillDescription || null,
        proficiency_level: proficiencyLevel ? Number(proficiencyLevel) : null,
        personal_details_id_fk: personalDetailsId,
      };
      const created = await createSkill(payload);
      setSkills((prev) => [created, ...prev]);
      resetSkillForm();
      closeAddModal();
    } finally {
      setSkillLoading(false);
    }
  }

  async function handleDeleteSkill(id: string) {
    setSkillLoading(true);
    try {
      await deleteSkill(id);
      setSkills((prev) => prev.filter((s) => s.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setEditForm(null);
      }
    } finally {
      setSkillLoading(false);
    }
  }

  function startEdit(skill: SkillInput) {
    setEditingId(skill.id);
    setEditForm({
      skill_name: skill.skill_name,
      skill_category: skill.skill_category,
      skill_description: skill.skill_description ?? "",
      proficiency_level: skill.proficiency_level != null ? String(skill.proficiency_level) : "",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm(null);
  }

  function updateEditField(field: keyof EditForm, value: string) {
    setEditForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  }

  async function handleSaveEdit(id: string) {
    if (!editForm || !personalDetailsId) return;

    setSkillLoading(true);
    try {
      const payload: SkillInput = {
        id,
        skill_name: editForm.skill_name,
        skill_category: editForm.skill_category as skill_category,
        skill_description: editForm.skill_description || null,
        proficiency_level: editForm.proficiency_level ? Number(editForm.proficiency_level) : null,
        personal_details_id_fk: personalDetailsId,
      };
      const updated = await updateSkill(id, payload);
      setSkills((prev) => prev.map((s) => (s.id === id ? updated : s)));
      cancelEdit();
    } finally {
      setSkillLoading(false);
    }
  }

  return (
    <div data-mode="light" className="flex flex-col gap-6 bg-white">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-black">Skills</h2>
        {personalDetailsId && (
          <Button
            type="button"
            variant="primary"
            label="Add Skill"
            onClick={openAddModal}
          />
        )}
      </div>

      <div className="w-full overflow-x-auto mb-10">
        <div className="min-w-[900px]">
          <Ctable maxRows={19}>
            <TableHead rowData={COLUMNS} />
            <TableBody>
              {skills.map((skill) => {
                if (editingId === skill.id && editForm) {
                  return (
                    <tr key={skill.id} className={ROW_CLASS}>
                      <TableCell style={CELL_BORDER}>
                        <TextField
                          labelText="Skill Name"
                          id={`edit-skill-name-${skill.id}`}
                          type="text"
                          placeholder="Skill Name"
                          value={editForm.skill_name}
                          onChange={(e) => updateEditField("skill_name", e.target.value)}
                        />
                      </TableCell>
                      <TableCell style={CELL_BORDER}>
                        <Select
                          label="Category"
                          options={SKILL_CATEGORY_OPTIONS}
                          value={editForm.skill_category}
                          onChange={(val) => updateEditField("skill_category", val)}
                        />
                      </TableCell>
                      <TableCell style={CELL_BORDER}>
                        <TextField
                          labelText="Proficiency"
                          id={`edit-proficiency-${skill.id}`}
                          type="number"
                          placeholder="0-10"
                          value={editForm.proficiency_level}
                          onChange={(e) => updateEditField("proficiency_level", e.target.value)}
                        />
                      </TableCell>
                      <TableCell style={CELL_BORDER}>
                        <TextField
                          labelText="Description"
                          id={`edit-skill-description-${skill.id}`}
                          type="text"
                          placeholder="Description"
                          value={editForm.skill_description}
                          onChange={(e) => updateEditField("skill_description", e.target.value)}
                        />
                      </TableCell>
                      <TableCell style={CELL_BORDER}>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="primary"
                            label={skillLoading ? "Saving..." : "Save"}
                            onClick={() => handleSaveEdit(skill.id)}
                            disabled={skillLoading}
                          />
                          <Button
                            type="button"
                            variant="secondary"
                            label="Cancel"
                            onClick={cancelEdit}
                            disabled={skillLoading}
                          />
                        </div>
                      </TableCell>
                    </tr>
                  );
                }

                return (
                  <tr key={skill.id} className={ROW_CLASS}>
                    <TableCell style={CELL_BORDER}>{skill.skill_name}</TableCell>
                    <TableCell style={CELL_BORDER}>
                      <span className="capitalize">{skill.skill_category}</span>
                    </TableCell>
                    <TableCell style={CELL_BORDER}>
                      {skill.proficiency_level !== null ? `${skill.proficiency_level}/10` : "-"}
                    </TableCell>
                    <TableCell style={CELL_BORDER}>{skill.skill_description || "-"}</TableCell>
                    <TableCell style={CELL_BORDER}>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="secondary"
                          label="Update"
                          onClick={() => startEdit(skill)}
                          disabled={skillLoading}
                        />
                        <Button
                          type="button"
                          variant="delete"
                          label="Delete"
                          onClick={() => handleDeleteSkill(skill.id)}
                          disabled={skillLoading}
                        />
                      </div>
                    </TableCell>
                  </tr>
                );
              })}
            </TableBody>
          </Ctable>
        </div>
      </div>

      {!personalDetailsId && (
        <p className="text-sm text-gray-500">
          Save your personal details first before adding skills.
        </p>
      )}

      <Modal isOpen={isAddModalOpen} onClose={closeAddModal} title="Add Skill">
        <Cform onSubmit={handleAddSkill}>
          <div data-mode="light" className="flex flex-col gap-4">
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
                type="button"
                variant="secondary"
                label="Cancel"
                onClick={closeAddModal}
                disabled={skillLoading}
              />
              <Button
                type="submit"
                variant="primary"
                label={skillLoading ? "Adding..." : "Add Skill"}
                disabled={skillLoading}
              />
            </div>
          </div>
        </Cform>
      </Modal>
    </div>
  );
}

// 'use client';

// import { useState } from "react";
// import { Button, Cform, Select, TextField } from "@eloisallena/web_components";
// import { skill as SkillInput } from "@/generated/prisma/client";
// import type { skill_category } from "@/generated/prisma/enums";
// import { createSkill, deleteSkill } from "@/lib/actions/skill-actions";

// interface SkillSectionProps {
//   personalDetailsId: string | null;
//   initialSkills: SkillInput[];
// }

// const SKILL_CATEGORY_OPTIONS = [
//   { key: 1, name: "hard", value: "Hard Skill" },
//   { key: 2, name: "soft", value: "Soft Skill" },
//   { key: 3, name: "core", value: "Core Skill" },
// ];

// export default function SkillSection({ personalDetailsId, initialSkills }: SkillSectionProps) {
//   const [skills, setSkills] = useState<SkillInput[]>(initialSkills);
//   const [skillName, setSkillName] = useState("");
//   const [skillCategory, setSkillCategory] = useState("hard");
//   const [skillDescription, setSkillDescription] = useState("");
//   const [proficiencyLevel, setProficiencyLevel] = useState("");
//   const [skillLoading, setSkillLoading] = useState(false);

//   function resetSkillForm() {
//     setSkillName("");
//     setSkillCategory("hard");
//     setSkillDescription("");
//     setProficiencyLevel("");
//   }

//   async function handleAddSkill(e: React.SubmitEvent<HTMLFormElement>) {
//     e.preventDefault();
//     if (!personalDetailsId) return;
//     if (!skillName) return;

//     setSkillLoading(true);
//     try {
//       const payload: SkillInput = {
//         id: "",
//         skill_name: skillName,
//         skill_category: skillCategory as skill_category,
//         skill_description: skillDescription || null,
//         proficiency_level: proficiencyLevel ? Number(proficiencyLevel) : null,
//         personal_details_id_fk: personalDetailsId,
//       };
//       const created = await createSkill(payload);
//       setSkills((prev) => [created, ...prev]);
//       resetSkillForm();
//     } finally {
//       setSkillLoading(false);
//     }
//   }

//   async function handleDeleteSkill(id: string) {
//     setSkillLoading(true);
//     try {
//       await deleteSkill(id);
//       setSkills((prev) => prev.filter((s) => s.id !== id));
//     } finally {
//       setSkillLoading(false);
//     }
//   }

//   return (
//     <div data-mode="light" className="flex flex-col gap-6 bg-white">
//       <h2 className="text-lg font-semibold text-black">Skills</h2>

//       {skills.map((skill) => (
//         <div key={skill.id} data-mode="light" className="grid grid-cols-1 gap-6 md:grid-cols-3">
//           <div
//             data-mode="light"
//             className="flex flex-col gap-2 bg-white shadow-md rounded-lg border border-gray-200 px-8 pt-6 pb-8"
//           >
//             <p className="font-medium text-black">
//               {skill.skill_name} — <span className="capitalize">{skill.skill_category}</span>
//             </p>
//             {skill.proficiency_level !== null && (
//               <p className="text-sm text-gray-500">Proficiency: {skill.proficiency_level}/10</p>
//             )}
//             {skill.skill_description && (
//               <p className="text-sm text-gray-500">{skill.skill_description}</p>
//             )}
//             <div className="flex justify-end mt-2">
//               <Button
//                 type="button"
//                 variant="delete"
//                 label="Delete"
//                 onClick={() => handleDeleteSkill(skill.id)}
//                 disabled={skillLoading}
//               />
//             </div>
//           </div>
//         </div>
//       ))}

//       {personalDetailsId && (
//         <div data-mode="light" className="grid grid-cols-1 gap-6 md:grid-cols-3">
//           <Cform onSubmit={handleAddSkill}>
//             <div
//               data-mode="light"
//               className="flex flex-col gap-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
//             >
//               <TextField
//                 labelText="Skill Name"
//                 id="skillName"
//                 type="text"
//                 placeholder="Enter skill name"
//                 value={skillName}
//                 onChange={(e) => setSkillName(e.target.value)}
//               />
//               <Select
//                 label="Category"
//                 options={SKILL_CATEGORY_OPTIONS}
//                 value={skillCategory}
//                 onChange={(val) => setSkillCategory(val)}
//               />
//               <TextField
//                 labelText="Description (optional)"
//                 id="skillDescription"
//                 type="text"
//                 placeholder="Enter skill description"
//                 value={skillDescription}
//                 onChange={(e) => setSkillDescription(e.target.value)}
//               />
//               <TextField
//                 labelText="Proficiency Level (0-10, optional)"
//                 id="proficiencyLevel"
//                 type="number"
//                 placeholder="Enter proficiency level"
//                 value={proficiencyLevel}
//                 onChange={(e) => setProficiencyLevel(e.target.value)}
//               />
//               <div data-mode="light" className="flex justify-end gap-2 mt-2">
//                 <Button
//                   type="submit"
//                   variant="primary"
//                   label={skillLoading ? "Adding..." : "Add Skill"}
//                   disabled={skillLoading}
//                 />
//               </div>
//             </div>
//           </Cform>
//         </div>
//       )}
//       {!personalDetailsId && (
//         <p className="text-sm text-gray-500">
//           Save your personal details first before adding skills.
//         </p>
//       )}
//     </div>
//   );
// }