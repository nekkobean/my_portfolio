

// 'use client';

// import { useState } from "react";
// import {
//   Button,
//   CheckBox,
//   Cform,
//   Ctable,
//   Modal,
//   Select,
//   TableBody,
//   TableCell,
//   TableHead,
//   TextField,
// } from "@eloisallena/web_components";
// import type { TableHeadCell } from "@eloisallena/web_components";
// import { project as ProjectInput } from "@/generated/prisma/client";
// import type { project_status } from "@/generated/prisma/enums";
// import {
//   createProject,
//   deleteProject,
//   updateProject,
//   type ProjectCreateInput,
// } from "@/lib/actions/project-actions";

// interface ProjectSectionProps {
//   personalDetailsId: string | null;
//   initialProjects: ProjectInput[];
// }

// const PROJECT_STATUS_OPTIONS = [
//   { key: 1, name: "ongoing", value: "Ongoing" },
//   { key: 2, name: "finished", value: "Finished" },
//   { key: 3, name: "cancelled", value: "Cancelled" },
// ];

// const COLUMNS: TableHeadCell[] = [
//   { key: 1, name: "project_image", value: "Image" },
//   { key: 2, name: "project_title", value: "Title" },
//   { key: 3, name: "project_status", value: "Status" },
//   { key: 4, name: "technologies_used", value: "Technologies" },
//   { key: 5, name: "role", value: "Role" },
//   { key: 6, name: "start_date", value: "Start Date" },
//   { key: 7, name: "end_date", value: "End Date" },
//   { key: 8, name: "links", value: "Links" },
//   { key: 9, name: "actions", value: "Actions" },
// ];

// const CELL_BORDER = "border-b border-light-gray";
// const ROW_CLASS = "transition-colors hover:bg-gray-50 [&:last-child_td]:border-b-0";

// interface EditForm {
//   project_title: string;
//   project_description: string;
//   project_image: string;
//   project_type: string;
//   role: string;
//   technologies_used: string;
//   project_link: string;
//   repository_link: string;
//   start_date: string;
//   end_date: string;
//   project_status: string;
//   is_ongoing: boolean;
// }

// export default function ProjectSection({ personalDetailsId, initialProjects }: ProjectSectionProps) {
//   const [projects, setProjects] = useState<ProjectInput[]>(initialProjects);
//   const [projectLoading, setProjectLoading] = useState(false);

//   // ---------- Add modal state ----------
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [projectTitle, setProjectTitle] = useState("");
//   const [projectDescription, setProjectDescription] = useState("");
//   const [projectImage, setProjectImage] = useState("");
//   const [projectType, setProjectType] = useState("");
//   const [role, setRole] = useState("");
//   const [technologiesUsed, setTechnologiesUsed] = useState("");
//   const [projectLink, setProjectLink] = useState("");
//   const [repositoryLink, setRepositoryLink] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [projectStatus, setProjectStatus] = useState("ongoing");
//   const [isOngoing, setIsOngoing] = useState(false);

//   // ---------- Edit (inline row) state ----------
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [editForm, setEditForm] = useState<EditForm | null>(null);

//   // ---------- Delete confirmation state ----------
//   const [deleteTarget, setDeleteTarget] = useState<ProjectInput | null>(null);

//   function resetProjectForm() {
//     setProjectTitle("");
//     setProjectDescription("");
//     setProjectImage("");
//     setProjectType("");
//     setRole("");
//     setTechnologiesUsed("");
//     setProjectLink("");
//     setRepositoryLink("");
//     setStartDate("");
//     setEndDate("");
//     setProjectStatus("ongoing");
//     setIsOngoing(false);
//   }

//   function openAddModal() {
//     resetProjectForm();
//     setIsAddModalOpen(true);
//   }

//   function closeAddModal() {
//     setIsAddModalOpen(false);
//   }

//   async function handleAddProject(e: React.SubmitEvent<HTMLFormElement>) {
//     e.preventDefault();
//     if (!personalDetailsId) return;
//     if (!projectTitle || !projectDescription || !technologiesUsed || !startDate) return;

//     setProjectLoading(true);
//     try {
//       const payload: ProjectCreateInput = {
//         project_title: projectTitle,
//         project_description: projectDescription,
//         project_image: projectImage || null,
//         project_type: projectType || null,
//         role: role || null,
//         technologies_used: technologiesUsed,
//         project_link: projectLink || null,
//         repository_link: repositoryLink || null,
//         start_date: new Date(startDate),
//         end_date: endDate ? new Date(endDate) : null,
//         project_status: projectStatus as project_status,
//         is_ongoing: isOngoing,
//         personal_details_id_fk: personalDetailsId,
//       };
//       const created = await createProject(payload);
//       setProjects((prev) => [created, ...prev]);
//       resetProjectForm();
//       closeAddModal();
//     } finally {
//       setProjectLoading(false);
//     }
//   }

//   // ---------- Delete flow: request -> confirm -> execute ----------

//   function requestDelete(project: ProjectInput) {
//     setDeleteTarget(project);
//   }

//   function cancelDelete() {
//     setDeleteTarget(null);
//   }

//   async function confirmDelete() {
//     if (!deleteTarget) return;
//     const id = deleteTarget.id;

//     setProjectLoading(true);
//     try {
//       await deleteProject(id);
//       setProjects((prev) => prev.filter((p) => p.id !== id));
//       if (editingId === id) {
//         setEditingId(null);
//         setEditForm(null);
//       }
//     } finally {
//       setProjectLoading(false);
//       setDeleteTarget(null);
//     }
//   }

//   function startEdit(project: ProjectInput) {
//     setEditingId(project.id);
//     setEditForm({
//       project_title: project.project_title,
//       project_description: project.project_description,
//       project_image: project.project_image ?? "",
//       project_type: project.project_type ?? "",
//       role: project.role ?? "",
//       technologies_used: project.technologies_used,
//       project_link: project.project_link ?? "",
//       repository_link: project.repository_link ?? "",
//       start_date: new Date(project.start_date).toISOString().slice(0, 10),
//       end_date: project.end_date ? new Date(project.end_date).toISOString().slice(0, 10) : "",
//       project_status: project.project_status,
//       is_ongoing: project.is_ongoing,
//     });
//   }

//   function cancelEdit() {
//     setEditingId(null);
//     setEditForm(null);
//   }

//   function updateEditField(field: keyof EditForm, value: string | boolean) {
//     setEditForm((prev) => (prev ? { ...prev, [field]: value } : prev));
//   }

//   async function handleSaveEdit(id: string) {
//     if (!editForm || !personalDetailsId) return;

//     setProjectLoading(true);
//     try {
//       const payload: ProjectInput = {
//         id,
//         project_title: editForm.project_title,
//         project_description: editForm.project_description,
//         project_image: editForm.project_image || null,
//         project_type: editForm.project_type || null,
//         role: editForm.role || null,
//         technologies_used: editForm.technologies_used,
//         project_link: editForm.project_link || null,
//         repository_link: editForm.repository_link || null,
//         start_date: new Date(editForm.start_date),
//         end_date: editForm.end_date ? new Date(editForm.end_date) : null,
//         created_at: new Date(),
//         updated_at: new Date(),
//         project_status: editForm.project_status as project_status,
//         is_ongoing: editForm.is_ongoing,
//         personal_details_id_fk: personalDetailsId,
//       };
//       const updated = await updateProject(id, payload);
//       setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
//       cancelEdit();
//     } finally {
//       setProjectLoading(false);
//     }
//   }

//   return (
//     <div data-mode="light" className="flex flex-col gap-6 bg-white">
//       <div className="flex items-center justify-between">
//         <h2 className="text-lg font-semibold text-black">Projects</h2>
//         {personalDetailsId && (
//           <Button
//             type="button"
//             variant="primary"
//             label="Add Project"
//             onClick={openAddModal}
//           />
//         )}
//       </div>

//       <div className="w-full overflow-x-auto mb-10">
//         <div className="min-w-350">
//           <Ctable maxRows={19}>
//             <TableHead rowData={COLUMNS} />
//             <TableBody>
//               {projects.map((project) => {
//                 if (editingId === project.id && editForm) {
//                   return (
//                     <tr key={project.id} className={ROW_CLASS}>
//                       <TableCell style={CELL_BORDER}>
//                         <TextField
//                           labelText="Image URL"
//                           id={`edit-image-${project.id}`}
//                           type="text"
//                           placeholder="Image URL"
//                           value={editForm.project_image}
//                           onChange={(e) => updateEditField("project_image", e.target.value)}
//                         />
//                       </TableCell>
//                       <TableCell style={CELL_BORDER}>
//                         <TextField
//                           labelText="Title"
//                           id={`edit-title-${project.id}`}
//                           type="text"
//                           placeholder="Title"
//                           value={editForm.project_title}
//                           onChange={(e) => updateEditField("project_title", e.target.value)}
//                         />
//                       </TableCell>
//                       <TableCell style={CELL_BORDER}>
//                         <Select
//                           label="Status"
//                           options={PROJECT_STATUS_OPTIONS}
//                           value={editForm.project_status}
//                           onChange={(val) => updateEditField("project_status", val)}
//                         />
//                       </TableCell>
//                       <TableCell style={CELL_BORDER}>
//                         <TextField
//                           labelText="Technologies"
//                           id={`edit-tech-${project.id}`}
//                           type="text"
//                           placeholder="Technologies"
//                           value={editForm.technologies_used}
//                           onChange={(e) => updateEditField("technologies_used", e.target.value)}
//                         />
//                       </TableCell>
//                       <TableCell style={CELL_BORDER}>
//                         <TextField
//                           labelText="Role"
//                           id={`edit-role-${project.id}`}
//                           type="text"
//                           placeholder="Role"
//                           value={editForm.role}
//                           onChange={(e) => updateEditField("role", e.target.value)}
//                         />
//                       </TableCell>
//                       <TableCell style={CELL_BORDER}>
//                         <TextField
//                           labelText="Start Date"
//                           id={`edit-start-${project.id}`}
//                           type="text"
//                           placeholder="YYYY-MM-DD"
//                           value={editForm.start_date}
//                           onChange={(e) => updateEditField("start_date", e.target.value)}
//                         />
//                       </TableCell>
//                       <TableCell style={CELL_BORDER}>
//                         <TextField
//                           labelText="End Date"
//                           id={`edit-end-${project.id}`}
//                           type="text"
//                           placeholder="YYYY-MM-DD"
//                           value={editForm.end_date}
//                           onChange={(e) => updateEditField("end_date", e.target.value)}
//                         />
//                       </TableCell>
//                       <TableCell style={CELL_BORDER}>
//                         <div className="flex flex-col gap-2">
//                           <TextField
//                             labelText="Project Link"
//                             id={`edit-project-link-${project.id}`}
//                             type="text"
//                             placeholder="Project Link"
//                             value={editForm.project_link}
//                             onChange={(e) => updateEditField("project_link", e.target.value)}
//                           />
//                           <TextField
//                             labelText="Repo Link"
//                             id={`edit-repo-link-${project.id}`}
//                             type="text"
//                             placeholder="Repository Link"
//                             value={editForm.repository_link}
//                             onChange={(e) => updateEditField("repository_link", e.target.value)}
//                           />
//                         </div>
//                       </TableCell>
//                       <TableCell style={CELL_BORDER}>
//                         <div className="flex gap-2">
//                           <Button
//                             type="button"
//                             variant="primary"
//                             label={projectLoading ? "Saving..." : "Save"}
//                             onClick={() => handleSaveEdit(project.id)}
//                             disabled={projectLoading}
//                           />
//                           <Button
//                             type="button"
//                             variant="secondary"
//                             label="Cancel"
//                             onClick={cancelEdit}
//                             disabled={projectLoading}
//                           />
//                         </div>
//                       </TableCell>
//                     </tr>
//                   );
//                 }

//                 return (
//                   <tr key={project.id} className={ROW_CLASS}>
//                     <TableCell style={CELL_BORDER}>
//                       <img
//                         src={project.project_image || "/elogo.png"}
//                         alt={project.project_title}
//                         className="h-12 w-12 rounded object-cover"
//                       />
//                     </TableCell>
//                     <TableCell style={CELL_BORDER}>{project.project_title}</TableCell>
//                     <TableCell style={CELL_BORDER}>
//                       <span className="capitalize">{project.project_status}</span>
//                     </TableCell>
//                     <TableCell style={CELL_BORDER}>{project.technologies_used}</TableCell>
//                     <TableCell style={CELL_BORDER}>{project.role || "-"}</TableCell>
//                     <TableCell style={CELL_BORDER}>
//                       {new Date(project.start_date).toLocaleDateString()}
//                     </TableCell>
//                     <TableCell style={CELL_BORDER}>
//                       {project.end_date
//                         ? new Date(project.end_date).toLocaleDateString()
//                         : project.is_ongoing
//                         ? "Present"
//                         : "-"}
//                     </TableCell>
//                     <TableCell style={CELL_BORDER}>
//                       <div className="flex flex-col gap-1">
//                         {project.project_link && (
//                           <a
//                             href={project.project_link}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-sm text-blue-600 underline"
//                           >
//                             Live
//                           </a>
//                         )}
//                         {project.repository_link && (
//                           <a
//                             href={project.repository_link}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-sm text-blue-600 underline"
//                           >
//                             Repo
//                           </a>
//                         )}
//                         {!project.project_link && !project.repository_link && "-"}
//                       </div>
//                     </TableCell>
//                     <TableCell style={CELL_BORDER}>
//                       <div className="flex gap-2">
//                         <Button
//                           type="button"
//                           variant="secondary"
//                           label="Update"
//                           onClick={() => startEdit(project)}
//                           disabled={projectLoading}
//                         />
//                         <Button
//                           type="button"
//                           variant="delete"
//                           label="Delete"
//                           onClick={() => requestDelete(project)}
//                           disabled={projectLoading}
//                         />
//                       </div>
//                     </TableCell>
//                   </tr>
//                 );
//               })}
//             </TableBody>
//           </Ctable>
//         </div>
//       </div>

//       {!personalDetailsId && (
//         <p className="text-sm text-gray-500">
//           Save your personal details first before adding projects.
//         </p>
//       )}

//       <Modal isOpen={isAddModalOpen} onClose={closeAddModal} title="Add Project">
//         <Cform onSubmit={handleAddProject}>
//           <div data-mode="light" className="flex flex-col gap-4">
//             <TextField
//               labelText="Image URL (optional)"
//               id="projectImage"
//               type="text"
//               placeholder="Enter image URL"
//               value={projectImage}
//               onChange={(e) => setProjectImage(e.target.value)}
//             />
//             <TextField
//               labelText="Project Title"
//               id="projectTitle"
//               type="text"
//               placeholder="Enter project title"
//               value={projectTitle}
//               onChange={(e) => setProjectTitle(e.target.value)}
//             />
//             <TextField
//               labelText="Project Description"
//               id="projectDescription"
//               type="text"
//               placeholder="Enter project description"
//               value={projectDescription}
//               onChange={(e) => setProjectDescription(e.target.value)}
//             />
//             <TextField
//               labelText="Project Type (optional)"
//               id="projectType"
//               type="text"
//               placeholder="e.g. Web App, Mobile App"
//               value={projectType}
//               onChange={(e) => setProjectType(e.target.value)}
//             />
//             <TextField
//               labelText="Role (optional)"
//               id="role"
//               type="text"
//               placeholder="e.g. Frontend Developer"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//             />
//             <TextField
//               labelText="Technologies Used"
//               id="technologiesUsed"
//               type="text"
//               placeholder="e.g. Next.js, Prisma, MySQL"
//               value={technologiesUsed}
//               onChange={(e) => setTechnologiesUsed(e.target.value)}
//             />
//             <TextField
//               labelText="Project Link (optional)"
//               id="projectLink"
//               type="text"
//               placeholder="Enter live project URL"
//               value={projectLink}
//               onChange={(e) => setProjectLink(e.target.value)}
//             />
//             <TextField
//               labelText="Repository Link (optional)"
//               id="repositoryLink"
//               type="text"
//               placeholder="Enter repository URL"
//               value={repositoryLink}
//               onChange={(e) => setRepositoryLink(e.target.value)}
//             />
//             <TextField
//               labelText="Start Date"
//               id="startDate"
//               type="text"
//               placeholder="YYYY-MM-DD"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//             />
//             <TextField
//               labelText="End Date (optional)"
//               id="endDate"
//               type="text"
//               placeholder="YYYY-MM-DD"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//             />
//             <Select
//               label="Project Status"
//               options={PROJECT_STATUS_OPTIONS}
//               value={projectStatus}
//               onChange={(val) => setProjectStatus(val)}
//             />
//             <CheckBox
//               id="isOngoing"
//               label="Currently Ongoing"
//               helperText="Check this if the project is still in progress"
//             />
//             <div data-mode="light" className="flex justify-end gap-2 mt-2">
//               <Button
//                 type="button"
//                 variant="secondary"
//                 label="Cancel"
//                 onClick={closeAddModal}
//                 disabled={projectLoading}
//               />
//               <Button
//                 type="submit"
//                 variant="primary"
//                 label={projectLoading ? "Adding..." : "Add Project"}
//                 disabled={projectLoading}
//               />
//             </div>
//           </div>
//         </Cform>
//       </Modal>

//       <Modal isOpen={deleteTarget !== null} onClose={cancelDelete} title="Delete Project">
//         <p className="text-sm text-gray-600 mb-6">
//           Are you sure you want to delete{" "}
//           <span className="font-semibold text-black">{deleteTarget?.project_title}</span>? This
//           action cannot be undone.
//         </p>
//         <div className="flex justify-end gap-2">
//           <Button
//             type="button"
//             variant="secondary"
//             label="Cancel"
//             onClick={cancelDelete}
//             disabled={projectLoading}
//           />
//           <Button
//             type="button"
//             variant="delete"
//             label={projectLoading ? "Deleting..." : "Delete"}
//             onClick={confirmDelete}
//             disabled={projectLoading}
//           />
//         </div>
//       </Modal>
//     </div>
//   );
// }
'use client';

import { useState } from "react";
import {
  Button,
  CheckBox,
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
import { project as ProjectInput } from "@/generated/prisma/client";
import type { project_status } from "@/generated/prisma/enums";
import {
  createProject,
  deleteProject,
  updateProject,
  type ProjectCreateInput,
} from "@/lib/actions/project-actions";
import { projectFormSchema } from "@/lib/validations/project";
import { getFieldErrors } from "@/lib/validations/shared";
import FieldError from "@/lib/validations/field-error";
import { resolveProjectImage } from "@/lib/utils/image";

interface ProjectSectionProps {
  personalDetailsId: string | null;
  initialProjects: ProjectInput[];
}

const PROJECT_STATUS_OPTIONS = [
  { key: 1, name: "ongoing", value: "Ongoing" },
  { key: 2, name: "finished", value: "Finished" },
  { key: 3, name: "cancelled", value: "Cancelled" },
];

const COLUMNS: TableHeadCell[] = [
  { key: 1, name: "project_image", value: "Image" },
  { key: 2, name: "project_title", value: "Title" },
  { key: 3, name: "project_status", value: "Status" },
  { key: 4, name: "technologies_used", value: "Technologies" },
  { key: 5, name: "role", value: "Role" },
  { key: 6, name: "start_date", value: "Start Date" },
  { key: 7, name: "end_date", value: "End Date" },
  { key: 8, name: "links", value: "Links" },
  { key: 9, name: "actions", value: "Actions" },
];

const CELL_BORDER = "border-b border-light-gray";
const ROW_CLASS = "transition-colors hover:bg-gray-50 [&:last-child_td]:border-b-0";

interface EditForm {
  project_title: string;
  project_description: string;
  project_image: string;
  project_type: string;
  role: string;
  technologies_used: string;
  project_link: string;
  repository_link: string;
  start_date: string;
  end_date: string;
  project_status: string;
  is_ongoing: boolean;
}

export default function ProjectSection({ personalDetailsId, initialProjects }: ProjectSectionProps) {
  const [projects, setProjects] = useState<ProjectInput[]>(initialProjects);
  const [projectLoading, setProjectLoading] = useState(false);

  // ---------- Add modal state ----------
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
  const [addErrors, setAddErrors] = useState<Record<string, string>>({});

  // ---------- Edit (inline row) state ----------
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<EditForm | null>(null);
  const [editErrors, setEditErrors] = useState<Record<string, string>>({});

  // ---------- Delete confirmation state ----------
  const [deleteTarget, setDeleteTarget] = useState<ProjectInput | null>(null);

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
    setAddErrors({});
  }

  function openAddModal() {
    resetProjectForm();
    setIsAddModalOpen(true);
  }

  function closeAddModal() {
    setIsAddModalOpen(false);
  }

  async function handleAddProject(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!personalDetailsId) return;
    if (!projectTitle || !projectDescription || !technologiesUsed || !startDate) return;
    const formValues = {
      project_title: projectTitle,
      project_description: projectDescription,
      project_image: projectImage,
      project_type: projectType,
      role,
      technologies_used: technologiesUsed,
      project_link: projectLink,
      repository_link: repositoryLink,
      start_date: startDate,
      end_date: endDate,
      project_status: projectStatus,
      is_ongoing: isOngoing,
    };

    const fieldErrors = getFieldErrors(projectFormSchema, formValues);
    if (fieldErrors) {
      setAddErrors(fieldErrors);
      return;
    }
    setAddErrors({});
    setProjectLoading(true);
    try {
      const payload: ProjectCreateInput = {
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
        project_status: projectStatus as project_status,
        is_ongoing: isOngoing,
        personal_details_id_fk: personalDetailsId,
      };
      const created = await createProject(payload);
      setProjects((prev) => [created, ...prev]);
      resetProjectForm();
      closeAddModal();
    } finally {
      setProjectLoading(false);
    }
  }

  // ---------- Delete flow: request -> confirm -> execute ----------

  function requestDelete(project: ProjectInput) {
    setDeleteTarget(project);
  }

  function cancelDelete() {
    setDeleteTarget(null);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    const id = deleteTarget.id;

    setProjectLoading(true);
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setEditForm(null);
        setEditErrors({});
      }
    } finally {
      setProjectLoading(false);
      setDeleteTarget(null);
    }
  }

  function startEdit(project: ProjectInput) {
    setEditingId(project.id);
    setEditErrors({});
    setEditForm({
      project_title: project.project_title,
      project_description: project.project_description,
      project_image: project.project_image ?? "",
      project_type: project.project_type ?? "",
      role: project.role ?? "",
      technologies_used: project.technologies_used,
      project_link: project.project_link ?? "",
      repository_link: project.repository_link ?? "",
      start_date: new Date(project.start_date).toISOString().slice(0, 10),
      end_date: project.end_date ? new Date(project.end_date).toISOString().slice(0, 10) : "",
      project_status: project.project_status,
      is_ongoing: project.is_ongoing,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm(null);
    setEditErrors({});
  }

  function updateEditField(field: keyof EditForm, value: string | boolean) {
    setEditForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  }

  async function handleSaveEdit(id: string) {
    if (!editForm || !personalDetailsId) return;

    const fieldErrors = getFieldErrors(projectFormSchema, editForm);
    if (fieldErrors) {
      setEditErrors(fieldErrors);
      return;
    }
    setEditErrors({});

    setProjectLoading(true);
    try {
      const payload: ProjectInput = {
        id,
        project_title: editForm.project_title,
        project_description: editForm.project_description,
        project_image: editForm.project_image || null,
        project_type: editForm.project_type || null,
        role: editForm.role || null,
        technologies_used: editForm.technologies_used,
        project_link: editForm.project_link || null,
        repository_link: editForm.repository_link || null,
        start_date: new Date(editForm.start_date),
        end_date: editForm.end_date ? new Date(editForm.end_date) : null,
        created_at: new Date(),
        updated_at: new Date(),
        project_status: editForm.project_status as project_status,
        is_ongoing: editForm.is_ongoing,
        personal_details_id_fk: personalDetailsId,
      };
      const updated = await updateProject(id, payload);
      setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
      cancelEdit();
    } finally {
      setProjectLoading(false);
    }
  }

  return (
    <div data-mode="light" className="flex flex-col gap-6 bg-white">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-black">Projects</h2>
        {personalDetailsId && (
          <Button
            type="button"
            variant="primary"
            label="Add Project"
            onClick={openAddModal}
          />
        )}
      </div>

      <div className="w-full overflow-x-auto mb-10">
        <div className="min-w-350">
          <Ctable maxRows={19}>
            <TableHead rowData={COLUMNS} />
            <TableBody>
              {projects.map((project) => {
                if (editingId === project.id && editForm) {
                  return (
                    <tr key={project.id} className={ROW_CLASS}>
                      <TableCell style={CELL_BORDER}>
                        <TextField
                          labelText="Image URL"
                          id={`edit-image-${project.id}`}
                          type="text"
                          placeholder="Image URL"
                          value={editForm.project_image}
                          onChange={(e) => updateEditField("project_image", e.target.value)}
                        />
                        <FieldError message={editErrors.project_image} />
                      </TableCell>
                      <TableCell style={CELL_BORDER}>
                        <TextField
                          labelText="Title"
                          id={`edit-title-${project.id}`}
                          type="text"
                          placeholder="Title"
                          value={editForm.project_title}
                          onChange={(e) => updateEditField("project_title", e.target.value)}
                        />
                        <FieldError message={editErrors.project_title} />
                      </TableCell>
                      <TableCell style={CELL_BORDER}>
                        <Select
                          label="Status"
                          options={PROJECT_STATUS_OPTIONS}
                          value={editForm.project_status}
                          onChange={(val) => updateEditField("project_status", val)}
                        />
                        <FieldError message={editErrors.project_status} />
                      </TableCell>
                      <TableCell style={CELL_BORDER}>
                        <TextField
                          labelText="Technologies"
                          id={`edit-tech-${project.id}`}
                          type="text"
                          placeholder="Technologies"
                          value={editForm.technologies_used}
                          onChange={(e) => updateEditField("technologies_used", e.target.value)}
                        />
                        <FieldError message={editErrors.technologies_used} />
                      </TableCell>
                      <TableCell style={CELL_BORDER}>
                        <TextField
                          labelText="Role"
                          id={`edit-role-${project.id}`}
                          type="text"
                          placeholder="Role"
                          value={editForm.role}
                          onChange={(e) => updateEditField("role", e.target.value)}
                        />
                        <FieldError message={editErrors.role} />
                      </TableCell>
                      <TableCell style={CELL_BORDER}>
                        <TextField
                          labelText="Start Date"
                          id={`edit-start-${project.id}`}
                          type="text"
                          placeholder="YYYY-MM-DD"
                          value={editForm.start_date}
                          onChange={(e) => updateEditField("start_date", e.target.value)}
                        />
                        <FieldError message={editErrors.start_date} />
                      </TableCell>
                      <TableCell style={CELL_BORDER}>
                        <TextField
                          labelText="End Date"
                          id={`edit-end-${project.id}`}
                          type="text"
                          placeholder="YYYY-MM-DD"
                          value={editForm.end_date}
                          onChange={(e) => updateEditField("end_date", e.target.value)}
                        />
                        <FieldError message={editErrors.end_date} />
                      </TableCell>
                      <TableCell style={CELL_BORDER}>
                        <div className="flex flex-col gap-2">
                          <div>
                            <TextField
                              labelText="Project Link"
                              id={`edit-project-link-${project.id}`}
                              type="text"
                              placeholder="Project Link"
                              value={editForm.project_link}
                              onChange={(e) => updateEditField("project_link", e.target.value)}
                            />
                            <FieldError message={editErrors.project_link} />
                          </div>
                          <div>
                            <TextField
                              labelText="Repo Link"
                              id={`edit-repo-link-${project.id}`}
                              type="text"
                              placeholder="Repository Link"
                              value={editForm.repository_link}
                              onChange={(e) => updateEditField("repository_link", e.target.value)}
                            />
                            <FieldError message={editErrors.repository_link} />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell style={CELL_BORDER}>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="primary"
                            label={projectLoading ? "Saving..." : "Save"}
                            onClick={() => handleSaveEdit(project.id)}
                            disabled={projectLoading}
                          />
                          <Button
                            type="button"
                            variant="secondary"
                            label="Cancel"
                            onClick={cancelEdit}
                            disabled={projectLoading}
                          />
                        </div>
                      </TableCell>
                    </tr>
                  );
                }

                return (
                  <tr key={project.id} className={ROW_CLASS}>
                    <TableCell style={CELL_BORDER}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={resolveProjectImage(project.project_image)}
                        alt={project.project_title}
                        className="h-12 w-12 rounded object-cover"
                      />
                    </TableCell>
                    <TableCell style={CELL_BORDER}>{project.project_title}</TableCell>
                    <TableCell style={CELL_BORDER}>
                      <span className="capitalize">{project.project_status}</span>
                    </TableCell>
                    <TableCell style={CELL_BORDER}>{project.technologies_used}</TableCell>
                    <TableCell style={CELL_BORDER}>{project.role || "-"}</TableCell>
                    <TableCell style={CELL_BORDER}>
                      {new Date(project.start_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell style={CELL_BORDER}>
                      {project.end_date
                        ? new Date(project.end_date).toLocaleDateString()
                        : project.is_ongoing
                        ? "Present"
                        : "-"}
                    </TableCell>
                    <TableCell style={CELL_BORDER}>
                      <div className="flex flex-col gap-1">
                        {project.project_link && (
                          <a
                            href={project.project_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 underline"
                          >
                            Live
                          </a>
                        )}
                        {project.repository_link && (
                          <a
                            href={project.repository_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 underline"
                          >
                            Repo
                          </a>
                        )}
                        {!project.project_link && !project.repository_link && "-"}
                      </div>
                    </TableCell>
                    <TableCell style={CELL_BORDER}>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="secondary"
                          label="Update"
                          onClick={() => startEdit(project)}
                          disabled={projectLoading}
                        />
                        <Button
                          type="button"
                          variant="delete"
                          label="Delete"
                          onClick={() => requestDelete(project)}
                          disabled={projectLoading}
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
          Save your personal details first before adding projects.
        </p>
      )}

      <Modal isOpen={isAddModalOpen} onClose={closeAddModal} title="Add Project">
        <Cform onSubmit={handleAddProject}>
          <div data-mode="light" className="flex flex-col gap-4">
            <div>
              <TextField
                labelText="Image URL (optional)"
                id="projectImage"
                type="text"
                placeholder="Enter image URL"
                value={projectImage}
                onChange={(e) => setProjectImage(e.target.value)}
              />
              <FieldError message={addErrors.project_image} />
            </div>
            <div>
              <TextField
                labelText="Project Title"
                id="projectTitle"
                type="text"
                placeholder="Enter project title"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
              />
              <FieldError message={addErrors.project_title} />
            </div>
            <div>
              <TextField
                labelText="Project Description"
                id="projectDescription"
                type="text"
                placeholder="Enter project description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
              <FieldError message={addErrors.project_description} />
            </div>
            <div>
              <TextField
                labelText="Project Type (optional)"
                id="projectType"
                type="text"
                placeholder="e.g. Web App, Mobile App"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
              />
              <FieldError message={addErrors.project_type} />
            </div>
            <div>
              <TextField
                labelText="Role (optional)"
                id="role"
                type="text"
                placeholder="e.g. Frontend Developer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              <FieldError message={addErrors.role} />
            </div>
            <div>
              <TextField
                labelText="Technologies Used"
                id="technologiesUsed"
                type="text"
                placeholder="e.g. Next.js, Prisma, MySQL"
                value={technologiesUsed}
                onChange={(e) => setTechnologiesUsed(e.target.value)}
              />
              <FieldError message={addErrors.technologies_used} />
            </div>
            <div>
              <TextField
                labelText="Project Link (optional)"
                id="projectLink"
                type="text"
                placeholder="Enter live project URL"
                value={projectLink}
                onChange={(e) => setProjectLink(e.target.value)}
              />
              <FieldError message={addErrors.project_link} />
            </div>
            <div>
              <TextField
                labelText="Repository Link (optional)"
                id="repositoryLink"
                type="text"
                placeholder="Enter repository URL"
                value={repositoryLink}
                onChange={(e) => setRepositoryLink(e.target.value)}
              />
              <FieldError message={addErrors.repository_link} />
            </div>
            <div>
              <TextField
                labelText="Start Date"
                id="startDate"
                type="text"
                placeholder="YYYY-MM-DD"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <FieldError message={addErrors.start_date} />
            </div>
            <div>
              <TextField
                labelText="End Date (optional)"
                id="endDate"
                type="text"
                placeholder="YYYY-MM-DD"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <FieldError message={addErrors.end_date} />
            </div>
            <div>
              <Select
                label="Project Status"
                options={PROJECT_STATUS_OPTIONS}
                value={projectStatus}
                onChange={(val) => setProjectStatus(val)}
              />
              <FieldError message={addErrors.project_status} />
            </div>
            <div>
              <CheckBox
                id="isOngoing"
                label="Currently Ongoing"
                helperText="Check this if the project is still in progress"
                checked={isOngoing}
                onChange={(e) => setIsOngoing(e.target.checked)}
              />
              <FieldError message={addErrors.is_ongoing} />
            </div>

            <div data-mode="light" className="flex justify-end gap-2 mt-2">
              <Button
                type="button"
                variant="secondary"
                label="Cancel"
                onClick={closeAddModal}
                disabled={projectLoading}
              />
              <Button
                type="submit"
                variant="primary"
                label={projectLoading ? "Adding..." : "Add Project"}
                disabled={projectLoading}
              />
            </div>
          </div>
        </Cform>
      </Modal>

      <Modal isOpen={deleteTarget !== null} onClose={cancelDelete} title="Delete Project">
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-black">{deleteTarget?.project_title}</span>? This
          action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            label="Cancel"
            onClick={cancelDelete}
            disabled={projectLoading}
          />
          <Button
            type="button"
            variant="delete"
            label={projectLoading ? "Deleting..." : "Delete"}
            onClick={confirmDelete}
            disabled={projectLoading}
          />
        </div>
      </Modal>
    </div>
  );
}