
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
import { education as EducationInput } from "@/generated/prisma/client";
import type { education_level } from "@/generated/prisma/enums";
import {
  createEducation,
  deleteEducation,
  updateEducation,
  type EducationCreateInput,
} from "@/lib/actions/education-actions";

interface EducationSectionProps {
  personalDetailsId: string | null;
  initialEducations: EducationInput[];
}

const LEVEL_OPTIONS = [
  { key: 1, name: "primary", value: "Primary" },
  { key: 2, name: "secondary", value: "Secondary" },
  { key: 3, name: "tertiary", value: "Tertiary" },
  { key: 4, name: "masteral", value: "Masteral" },
  { key: 5, name: "doctorate", value: "Doctorate" },
];

const COLUMNS: TableHeadCell[] = [
  { key: 1, name: "level", value: "Level" },
  { key: 2, name: "school_name", value: "School Name" },
  { key: 3, name: "school_address", value: "School Address" },
  { key: 4, name: "year_attended", value: "Year Attended" },
  { key: 5, name: "year_graduated", value: "Year Graduated" },
  { key: 6, name: "course", value: "Course" },
  { key: 7, name: "description", value: "Description" },
  { key: 8, name: "actions", value: "Actions" },
];

const CELL_BORDER = "border-b border-light-gray";
const ROW_CLASS = "transition-colors hover:bg-gray-50 [&:last-child_td]:border-b-0";

interface EditForm {
  level: string;
  school_name: string;
  school_address: string;
  year_attended: string;
  year_graduated: string;
  course: string;
  description: string;
}

export default function EducationSection({
  personalDetailsId,
  initialEducations,
}: EducationSectionProps) {
  const [educations, setEducations] = useState<EducationInput[]>(initialEducations);
  const [eduLoading, setEduLoading] = useState(false);

  // ---------- Add modal state ----------
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [level, setLevel] = useState("primary");
  const [schoolName, setSchoolName] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [yearAttended, setYearAttended] = useState("");
  const [yearGraduated, setYearGraduated] = useState("");
  const [course, setCourse] = useState("");
  const [description, setDescription] = useState("");

  // ---------- Edit (inline row) state ----------
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<EditForm | null>(null);

  function resetEducationForm() {
    setLevel("primary");
    setSchoolName("");
    setSchoolAddress("");
    setYearAttended("");
    setYearGraduated("");
    setCourse("");
    setDescription("");
  }

  function openAddModal() {
    resetEducationForm();
    setIsAddModalOpen(true);
  }

  function closeAddModal() {
    setIsAddModalOpen(false);
  }

  async function handleAddEducation(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!personalDetailsId) return;
    if (!schoolName || !schoolAddress || !yearAttended) return;

    setEduLoading(true);
    try {
      const payload: EducationCreateInput = {
        level: level as education_level,
        school_name: schoolName,
        school_address: schoolAddress,
        year_attended: new Date(yearAttended),
        year_graduated: yearGraduated ? new Date(yearGraduated) : null,
        course: course || null,
        description: description || null,
        personal_details_id_fk: personalDetailsId,
      };
      const created = await createEducation(payload);
      setEducations((prev) => [created, ...prev]);
      resetEducationForm();
      closeAddModal();
    } finally {
      setEduLoading(false);
    }
  }

  async function handleDeleteEducation(id: string) {
    setEduLoading(true);
    try {
      await deleteEducation(id);
      setEducations((prev) => prev.filter((edu) => edu.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setEditForm(null);
      }
    } finally {
      setEduLoading(false);
    }
  }

  function startEdit(edu: EducationInput) {
    setEditingId(edu.id);
    setEditForm({
      level: edu.level,
      school_name: edu.school_name,
      school_address: edu.school_address,
      year_attended: new Date(edu.year_attended).toISOString().slice(0, 10),
      year_graduated: edu.year_graduated
        ? new Date(edu.year_graduated).toISOString().slice(0, 10)
        : "",
      course: edu.course ?? "",
      description: edu.description ?? "",
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

    setEduLoading(true);
    try {
      const payload: EducationInput = {
        id,
        level: editForm.level as education_level,
        school_name: editForm.school_name,
        school_address: editForm.school_address,
        year_attended: new Date(editForm.year_attended),
        year_graduated: editForm.year_graduated ? new Date(editForm.year_graduated) : null,
        course: editForm.course || null,
        description: editForm.description || null,
        personal_details_id_fk: personalDetailsId,
      };
      const updated = await updateEducation(id, payload);
      setEducations((prev) => prev.map((edu) => (edu.id === id ? updated : edu)));
      cancelEdit();
    } finally {
      setEduLoading(false);
    }
  }

  return (
    <div data-mode="light" className="flex flex-col gap-6 bg-white">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-black">Education</h2>
        {personalDetailsId && (
          <Button
            type="button"
            variant="primary"
            label="Add Education"
            onClick={openAddModal}
          />
        )}
      </div>

      <div className="w-full overflow-x-auto mb-10">
        <div className="min-w-[1100px]">
          <Ctable maxRows={19}>
            <TableHead rowData={COLUMNS} />
            <TableBody>
              {educations.map((edu) => {
                if (editingId === edu.id && editForm) {
                  return (
                    <tr key={edu.id} className={ROW_CLASS}>
                      <TableCell style={CELL_BORDER}>
                        <Select
                          label="Level"
                          options={LEVEL_OPTIONS}
                          value={editForm.level}
                          onChange={(val) => updateEditField("level", val)}
                        />
                      </TableCell>
                      <TableCell style={CELL_BORDER}>
                        <TextField
                          labelText="School Name"
                          id={`edit-school-name-${edu.id}`}
                          type="text"
                          placeholder="School Name"
                          value={editForm.school_name}
                          onChange={(e) => updateEditField("school_name", e.target.value)}
                        />
                      </TableCell>
                      <TableCell style={CELL_BORDER}>
                        <TextField
                          labelText="School Address"
                          id={`edit-school-address-${edu.id}`}
                          type="text"
                          placeholder="School Address"
                          value={editForm.school_address}
                          onChange={(e) => updateEditField("school_address", e.target.value)}
                        />
                      </TableCell>
                      <TableCell style={CELL_BORDER}>
                        <TextField
                          labelText="Year Attended"
                          id={`edit-year-attended-${edu.id}`}
                          type="text"
                          placeholder="YYYY-MM-DD"
                          value={editForm.year_attended}
                          onChange={(e) => updateEditField("year_attended", e.target.value)}
                        />
                      </TableCell>
                      <TableCell style={CELL_BORDER}>
                        <TextField
                          labelText="Year Graduated"
                          id={`edit-year-graduated-${edu.id}`}
                          type="text"
                          placeholder="YYYY-MM-DD"
                          value={editForm.year_graduated}
                          onChange={(e) => updateEditField("year_graduated", e.target.value)}
                        />
                      </TableCell>
                      <TableCell style={CELL_BORDER}>
                        <TextField
                          labelText="Course"
                          id={`edit-course-${edu.id}`}
                          type="text"
                          placeholder="Course"
                          value={editForm.course}
                          onChange={(e) => updateEditField("course", e.target.value)}
                        />
                      </TableCell>
                      <TableCell style={CELL_BORDER}>
                        <TextField
                          labelText="Description"
                          id={`edit-description-${edu.id}`}
                          type="text"
                          placeholder="Description"
                          value={editForm.description}
                          onChange={(e) => updateEditField("description", e.target.value)}
                        />
                      </TableCell>
                      <TableCell style={CELL_BORDER}>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="primary"
                            label={eduLoading ? "Saving..." : "Save"}
                            onClick={() => handleSaveEdit(edu.id)}
                            disabled={eduLoading}
                          />
                          <Button
                            type="button"
                            variant="secondary"
                            label="Cancel"
                            onClick={cancelEdit}
                            disabled={eduLoading}
                          />
                        </div>
                      </TableCell>
                    </tr>
                  );
                }

                return (
                  <tr key={edu.id} className={ROW_CLASS}>
                    <TableCell style={CELL_BORDER}>
                      <span className="capitalize">{edu.level}</span>
                    </TableCell>
                    <TableCell style={CELL_BORDER}>{edu.school_name}</TableCell>
                    <TableCell style={CELL_BORDER}>{edu.school_address}</TableCell>
                    <TableCell style={CELL_BORDER}>
                      {new Date(edu.year_attended).toLocaleDateString()}
                    </TableCell>
                    <TableCell style={CELL_BORDER}>
                      {edu.year_graduated ? new Date(edu.year_graduated).toLocaleDateString() : "-"}
                    </TableCell>
                    <TableCell style={CELL_BORDER}>{edu.course || "-"}</TableCell>
                    <TableCell style={CELL_BORDER}>{edu.description || "-"}</TableCell>
                    <TableCell style={CELL_BORDER}>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="secondary"
                          label="Update"
                          onClick={() => startEdit(edu)}
                          disabled={eduLoading}
                        />
                        <Button
                          type="button"
                          variant="delete"
                          label="Delete"
                          onClick={() => handleDeleteEducation(edu.id)}
                          disabled={eduLoading}
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
          Save your personal details first before adding education entries.
        </p>
      )}

      <Modal isOpen={isAddModalOpen} onClose={closeAddModal} title="Add Education">
        <Cform onSubmit={handleAddEducation}>
          <div data-mode="light" className="flex flex-col gap-4">
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
                type="button"
                variant="secondary"
                label="Cancel"
                onClick={closeAddModal}
                disabled={eduLoading}
              />
              <Button
                type="submit"
                variant="primary"
                label={eduLoading ? "Adding..." : "Add Education"}
                disabled={eduLoading}
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
// import { education as EducationInput } from "@/generated/prisma/client";
// import type { education_level } from "@/generated/prisma/enums";
// import { createEducation, deleteEducation } from "@/lib/actions/education-actions";

// interface EducationSectionProps {
//   personalDetailsId: string | null;
//   initialEducations: EducationInput[];
// }

// const LEVEL_OPTIONS = [
//   { key: 1, name: "primary", value: "Primary" },
//   { key: 2, name: "secondary", value: "Secondary" },
//   { key: 3, name: "tertiary", value: "Tertiary" },
//   { key: 4, name: "masteral", value: "Masteral" },
//   { key: 5, name: "doctorate", value: "Doctorate" },
// ];

// export default function EducationSection({
//   personalDetailsId,
//   initialEducations,
// }: EducationSectionProps) {
//   const [educations, setEducations] = useState<EducationInput[]>(initialEducations);
//   const [level, setLevel] = useState("primary");
//   const [schoolName, setSchoolName] = useState("");
//   const [schoolAddress, setSchoolAddress] = useState("");
//   const [yearAttended, setYearAttended] = useState("");
//   const [yearGraduated, setYearGraduated] = useState("");
//   const [course, setCourse] = useState("");
//   const [description, setDescription] = useState("");
//   const [eduLoading, setEduLoading] = useState(false);

//   function resetEducationForm() {
//     setLevel("primary");
//     setSchoolName("");
//     setSchoolAddress("");
//     setYearAttended("");
//     setYearGraduated("");
//     setCourse("");
//     setDescription("");
//   }

//   async function handleAddEducation(e: React.SubmitEvent<HTMLFormElement>) {
//     e.preventDefault();
//     if (!personalDetailsId) return;
//     if (!schoolName || !schoolAddress || !yearAttended) return;

//     setEduLoading(true);
//     try {
//       const payload: EducationInput = {
//         id: "",
//         level: level as education_level,
//         school_name: schoolName,
//         school_address: schoolAddress,
//         year_attended: new Date(yearAttended),
//         year_graduated: yearGraduated ? new Date(yearGraduated) : null,
//         course: course || null,
//         description: description || null,
//         personal_details_id_fk: personalDetailsId,
//       };
//       const created = await createEducation(payload);
//       setEducations((prev) => [created, ...prev]);
//       resetEducationForm();
//     } finally {
//       setEduLoading(false);
//     }
//   }

//   async function handleDeleteEducation(id: string) {
//     setEduLoading(true);
//     try {
//       await deleteEducation(id);
//       setEducations((prev) => prev.filter((edu) => edu.id !== id));
//     } finally {
//       setEduLoading(false);
//     }
//   }

//   return (
//     <div data-mode="light" className="flex flex-col gap-6 bg-white">
//       <h2 className="text-lg font-semibold text-black">Education</h2>

//       {educations.map((edu) => (
//         <div key={edu.id} data-mode="light" className="grid grid-cols-1 gap-6 md:grid-cols-3">
//           <div
//             data-mode="light"
//             className="flex flex-col gap-2 bg-white shadow-md rounded-lg border border-gray-200 px-8 pt-6 pb-8"
//           >
//             <p className="font-medium text-black">
//               {edu.school_name} — <span className="capitalize">{edu.level}</span>
//             </p>
//             <p className="text-sm text-gray-500">
//               {edu.school_address} · {new Date(edu.year_attended).getFullYear()}
//               {edu.year_graduated ? ` – ${new Date(edu.year_graduated).getFullYear()}` : ""}
//             </p>
//             {edu.course && <p className="text-sm text-black">{edu.course}</p>}
//             {edu.description && <p className="text-sm text-gray-500">{edu.description}</p>}
//             <div className="flex justify-end mt-2">
//               <Button
//                 type="button"
//                 variant="delete"
//                 label="Delete"
//                 onClick={() => handleDeleteEducation(edu.id)}
//                 disabled={eduLoading}
//               />
//             </div>
//           </div>
//         </div>
//       ))}

//       {personalDetailsId && (
//         <div data-mode="light" className="grid grid-cols-1 gap-6 md:grid-cols-3">
//           <Cform onSubmit={handleAddEducation}>
//             <div
//               data-mode="light"
//               className="flex flex-col gap-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
//             >
//               <Select
//                 label="Level"
//                 options={LEVEL_OPTIONS}
//                 value={level}
//                 onChange={(val) => setLevel(val)}
//               />
//               <TextField
//                 labelText="School Name"
//                 id="schoolName"
//                 type="text"
//                 placeholder="Enter school name"
//                 value={schoolName}
//                 onChange={(e) => setSchoolName(e.target.value)}
//               />
//               <TextField
//                 labelText="School Address"
//                 id="schoolAddress"
//                 type="text"
//                 placeholder="Enter school address"
//                 value={schoolAddress}
//                 onChange={(e) => setSchoolAddress(e.target.value)}
//               />
//               <TextField
//                 labelText="Year Attended"
//                 id="yearAttended"
//                 type="text"
//                 placeholder="YYYY-MM-DD"
//                 value={yearAttended}
//                 onChange={(e) => setYearAttended(e.target.value)}
//               />
//               <TextField
//                 labelText="Year Graduated (optional)"
//                 id="yearGraduated"
//                 type="text"
//                 placeholder="YYYY-MM-DD"
//                 value={yearGraduated}
//                 onChange={(e) => setYearGraduated(e.target.value)}
//               />
//               <TextField
//                 labelText="Course (optional)"
//                 id="course"
//                 type="text"
//                 placeholder="Enter course"
//                 value={course}
//                 onChange={(e) => setCourse(e.target.value)}
//               />
//               <TextField
//                 labelText="Description (optional)"
//                 id="description"
//                 type="text"
//                 placeholder="Enter description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//               <div data-mode="light" className="flex justify-end gap-2 mt-2">
//                 <Button
//                   type="submit"
//                   variant="primary"
//                   label={eduLoading ? "Adding..." : "Add Education"}
//                   disabled={eduLoading}
//                 />
//               </div>
//             </div>
//           </Cform>
//         </div>
//       )}
//       {!personalDetailsId && (
//         <p className="text-sm text-gray-500">
//           Save your personal details first before adding education entries.
//         </p>
//       )}
//     </div>
//   );
// }