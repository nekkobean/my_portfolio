

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
import { skillFormSchema } from "@/lib/validations/skill";
import { getFieldErrors } from "@/lib/validations/shared";
import FieldError from "@/lib/validations/field-error";

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
  { key: 1, name: "skill_image", value: "Image" },
  { key: 2, name: "skill_name", value: "Skill Name" },
  { key: 3, name: "skill_category", value: "Category" },
  { key: 4, name: "proficiency_level", value: "Proficiency" },
  { key: 5, name: "skill_description", value: "Description" },
  { key: 6, name: "actions", value: "Actions" },
];

const CELL_BORDER = "border-b border-light-gray";
const ROW_CLASS = "transition-colors hover:bg-gray-50 [&:last-child_td]:border-b-0";

interface EditForm {
  skill_name: string;
  skill_category: string;
  skill_description: string;
  proficiency_level: string;
  skill_image: string;
}

export default function SkillSection({ personalDetailsId, initialSkills }: SkillSectionProps) {
  const [skills, setSkills] = useState<SkillInput[]>(initialSkills);
  const [skillLoading, setSkillLoading] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [skillCategory, setSkillCategory] = useState("hard");
  const [skillDescription, setSkillDescription] = useState("");
  const [proficiencyLevel, setProficiencyLevel] = useState("");
  const [skillImage, setSkillImage] = useState("");
  const [addErrors, setAddErrors] = useState<Record<string, string>>({});

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<EditForm | null>(null);
  const [editErrors, setEditErrors] = useState<Record<string, string>>({});

  // ---------- Delete confirmation state ----------
  const [deleteTarget, setDeleteTarget] = useState<SkillInput | null>(null);

  function resetSkillForm() {
    setSkillName("");
    setSkillCategory("hard");
    setSkillDescription("");
    setProficiencyLevel("");
    setSkillImage("");
    setAddErrors({});
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

    const formValues = {
      skill_name: skillName,
      skill_category: skillCategory,
      skill_description: skillDescription,
      proficiency_level: proficiencyLevel,
    };

    const fieldErrors = getFieldErrors(skillFormSchema, formValues);
    if (fieldErrors) {
      setAddErrors(fieldErrors);
      return;
    }
    setAddErrors({});

    setSkillLoading(true);
    try {
      const payload: SkillCreateInput = {
        skill_name: skillName,
        skill_category: skillCategory as skill_category,
        skill_description: skillDescription || null,
        proficiency_level: proficiencyLevel ? Number(proficiencyLevel) : null,
        skill_image: skillImage || null,
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

  // ---------- Delete flow: request -> confirm -> execute ----------

  function requestDelete(skill: SkillInput) {
    setDeleteTarget(skill);
  }

  function cancelDelete() {
    setDeleteTarget(null);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    const id = deleteTarget.id;

    setSkillLoading(true);
    try {
      await deleteSkill(id);
      setSkills((prev) => prev.filter((s) => s.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setEditForm(null);
        setEditErrors({});
      }
    } finally {
      setSkillLoading(false);
      setDeleteTarget(null);
    }
  }

  function startEdit(skill: SkillInput) {
    setEditingId(skill.id);
    setEditErrors({});
    setEditForm({
      skill_name: skill.skill_name,
      skill_category: skill.skill_category,
      skill_description: skill.skill_description ?? "",
      proficiency_level: skill.proficiency_level != null ? String(skill.proficiency_level) : "",
      skill_image: skill.skill_image ?? "",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm(null);
    setEditErrors({});
  }

  function updateEditField(field: keyof EditForm, value: string) {
    setEditForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  }

  async function handleSaveEdit(id: string) {
    if (!editForm || !personalDetailsId) return;

    const fieldErrors = getFieldErrors(skillFormSchema, editForm);
    if (fieldErrors) {
      setEditErrors(fieldErrors);
      return;
    }
    setEditErrors({});

    setSkillLoading(true);
    try {
      const payload: SkillInput = {
        id,
        skill_name: editForm.skill_name,
        skill_category: editForm.skill_category as skill_category,
        skill_description: editForm.skill_description || null,
        proficiency_level: editForm.proficiency_level ? Number(editForm.proficiency_level) : null,
        skill_image: editForm.skill_image || null,
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
          <Button type="button" variant="primary" label="Add Skill" onClick={openAddModal}  style= "max-w-[150px] ml-auto" />
        )}
      </div>

      <div className="w-full overflow-x-auto mb-10">
        <div className="min-w-225">
          <Ctable maxRows={19}>
            <TableHead rowData={COLUMNS} />
            <TableBody>
              {skills.map((skill) => {
                if (editingId === skill.id && editForm) {
                  return (
                    <tr key={skill.id} className={ROW_CLASS}>
                      <TableCell style={CELL_BORDER}>
                        <TextField
                          labelText="Image URL"
                          id={`edit-skill-image-${skill.id}`}
                          type="text"
                          placeholder="Image URL"
                          value={editForm.skill_image}
                          onChange={(e) => updateEditField("skill_image", e.target.value)}
                        />
                      </TableCell>
                      <TableCell style={CELL_BORDER}>
                        <TextField
                          labelText="Skill Name"
                          id={`edit-skill-name-${skill.id}`}
                          type="text"
                          placeholder="Skill Name"
                          value={editForm.skill_name}
                          onChange={(e) => updateEditField("skill_name", e.target.value)}
                        />
                        <FieldError message={editErrors.skill_name} />
                      </TableCell>
                      <TableCell style={CELL_BORDER}>
                        <Select
                          label="Category"
                          options={SKILL_CATEGORY_OPTIONS}
                          value={editForm.skill_category}
                          onChange={(val) => updateEditField("skill_category", val)}
                        />
                        <FieldError message={editErrors.skill_category} />
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
                        <FieldError message={editErrors.proficiency_level} />
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
                        <FieldError message={editErrors.skill_description} />
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
                    <TableCell style={CELL_BORDER}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={skill.skill_image || "/elogo.png"}
                        alt={skill.skill_name}
                        className="h-12 w-12 rounded object-cover"
                      />
                    </TableCell>
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
                          onClick={() => requestDelete(skill)}
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
            <div>
              <TextField
                labelText="Image URL (optional)"
                id="skillImage"
                type="text"
                placeholder="Enter image URL"
                value={skillImage}
                onChange={(e) => setSkillImage(e.target.value)}
              />
            </div>
            <div>
              <TextField
                labelText="Skill Name"
                id="skillName"
                type="text"
                placeholder="Enter skill name"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
              />
              <FieldError message={addErrors.skill_name} />
            </div>
            <div>
              <Select
                label="Category"
                options={SKILL_CATEGORY_OPTIONS}
                value={skillCategory}
                onChange={(val) => setSkillCategory(val)}
              />
              <FieldError message={addErrors.skill_category} />
            </div>
            <div>
              <TextField
                labelText="Description (optional)"
                id="skillDescription"
                type="text"
                placeholder="Enter skill description"
                value={skillDescription}
                onChange={(e) => setSkillDescription(e.target.value)}
              />
              <FieldError message={addErrors.skill_description} />
            </div>
            <div>
              <TextField
                labelText="Proficiency Level (0-10, optional)"
                id="proficiencyLevel"
                type="number"
                placeholder="Enter proficiency level"
                value={proficiencyLevel}
                onChange={(e) => setProficiencyLevel(e.target.value)}
              />
              <FieldError message={addErrors.proficiency_level} />
            </div>
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

      <Modal isOpen={deleteTarget !== null} onClose={cancelDelete} title="Delete Skill">
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-black">{deleteTarget?.skill_name}</span>? This
          action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            label="Cancel"
            onClick={cancelDelete}
            disabled={skillLoading}
          />
          <Button
            type="button"
            variant="delete"
            label={skillLoading ? "Deleting..." : "Delete"}
            onClick={confirmDelete}
            disabled={skillLoading}
          />
        </div>
      </Modal>
    </div>
  );
}