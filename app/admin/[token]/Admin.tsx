'use client';

import { useState } from "react";
import { User, GraduationCap, Wrench, Briefcase } from "lucide-react";
import { personal_details as PersonalDetails } from "@/generated/prisma/client";
import { education as EducationInput } from "@/generated/prisma/client";
import { skill as SkillInput } from "@/generated/prisma/client";
import { project as ProjectInput } from "@/generated/prisma/client";

import PersonalDetailsSection from "@/app/components/admin-sections/PersonalDetailsSection";
import EducationSection from "@/app/components/admin-sections/EducationSection";
import SkillSection from "@/app/components/admin-sections/SkillSection";
import ProjectSection from "@/app/components/admin-sections/ProjectSection";

interface AdminFormProps {
  initialData: PersonalDetails | null;
  initialEducations: EducationInput[];
  initialSkills: SkillInput[];
  initialProjects: ProjectInput[];
}

type Tab = "personal" | "education" | "skills" | "projects";

const NAV_ITEMS: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: "personal", label: "Personal Details", icon: User },
  { key: "education", label: "Education", icon: GraduationCap },
  { key: "skills", label: "Skills", icon: Wrench },
  { key: "projects", label: "Projects", icon: Briefcase },
];

export default function AdminForm({
  initialData,
  initialEducations,
  initialSkills,
  initialProjects,
}: AdminFormProps) {
  const [activeTab, setActiveTab] = useState<Tab>("personal");

  const personalDetailsId = initialData?.id ?? null;

  return (
    <div className="min-h-screen w-full bg-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col py-8 px-4 gap-2">
        <h1 className="text-lg font-bold text-black mb-6 px-2">Admin Panel</h1>
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
          const isActive = activeTab === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          );
        })}
      </aside>

      {/* Content */}
      <main className="flex-1 px-10 py-10 overflow-y-auto bg-white">
        {activeTab === "personal" && (
          <PersonalDetailsSection initialData={initialData} />
        )}
        {activeTab === "education" && (
          <EducationSection
            personalDetailsId={personalDetailsId}
            initialEducations={initialEducations}
          />
        )}
        {activeTab === "skills" && (
          <SkillSection
            personalDetailsId={personalDetailsId}
            initialSkills={initialSkills}
          />
        )}
        {activeTab === "projects" && (
          <ProjectSection
            personalDetailsId={personalDetailsId}
            initialProjects={initialProjects}
          />
        )}
      </main>
    </div>
  );
}




// 'use client';

// import { useState } from "react";
// import { User, GraduationCap, Wrench, Briefcase } from "lucide-react";
// import { personal_details as PersonalDetails } from "@/generated/prisma/client";
// import { education as EducationInput } from "@/generated/prisma/client";
// import { skill as SkillInput } from "@/generated/prisma/client";
// import { project as ProjectInput } from "@/generated/prisma/client";

// import PersonalDetailsSection from "@/app/components/admin-sections/PersonalDetailsSection";
// import EducationSection from "@/app/components/admin-sections/EducationSection";
// import SkillSection from "@/app/components/admin-sections/SkillSection";
// import ProjectSection from "@/app/components/admin-sections/ProjectSection";

// interface AdminFormProps {
//   initialData: PersonalDetails | null;
//   initialEducations: EducationInput[];
//   initialSkills: SkillInput[];
//   initialProjects: ProjectInput[];
// }

// type Tab = "personal" | "education" | "skills" | "projects";

// const NAV_ITEMS: { key: Tab; label: string; icon: React.ElementType }[] = [
//   { key: "personal", label: "Personal Details", icon: User },
//   { key: "education", label: "Education", icon: GraduationCap },
//   { key: "skills", label: "Skills", icon: Wrench },
//   { key: "projects", label: "Projects", icon: Briefcase },
// ];

// export default function AdminForm({
//   initialData,
//   initialEducations,
//   initialSkills,
//   initialProjects,
// }: AdminFormProps) {
//   const [activeTab, setActiveTab] = useState<Tab>("personal");

//   const personalDetailsId = initialData?.id ?? null;

//   return (
//     <div className="min-h-screen w-full bg-white flex">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white border-r border-gray-200 flex flex-col py-8 px-4 gap-2">
//         <h1 className="text-lg font-bold text-black mb-6 px-2">Admin Panel</h1>
//         {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
//           const isActive = activeTab === key;


//           return (
//             <button
//               key={key}
//               type="button"
//               onClick={() => setActiveTab(key)}
//               className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
//                 isActive
//                   ? "bg-black text-white"
//                   : "text-gray-600 hover:bg-gray-200"
//               }`}
//             >
//               <Icon size={18} />
//               {label}
//             </button>
//           );
//         })}
//       </aside>

//       {/* Content */}
//       <main className="flex-1 px-10 py-10 overflow-y-auto">
//         {activeTab === "personal" && (
//           <PersonalDetailsSection initialData={initialData} />
//         )}
//         {activeTab === "education" && (
//           <EducationSection
//             personalDetailsId={personalDetailsId}
//             initialEducations={initialEducations}
//           />
//         )}
//         {activeTab === "skills" && (
//           <SkillSection
//             personalDetailsId={personalDetailsId}
//             initialSkills={initialSkills}
//           />
//         )}
//         {activeTab === "projects" && (
//           <ProjectSection
//             personalDetailsId={personalDetailsId}
//             initialProjects={initialProjects}
//           />
//         )}
//       </main>
//     </div>
//   );
// }

// 'use client';

// import EducationSection from "@/app/components/admin-sections/EducationSection";
// import PersonalDetailsSection from "@/app/components/admin-sections/PersonalDetailsSection";
// import ProjectSection from "@/app/components/admin-sections/ProjectSection";
// import SkillSection from "@/app/components/admin-sections/SkillSection";
// import { personal_details as PersonalDetails } from "@/generated/prisma/client";
// import { education as EducationInput } from "@/generated/prisma/client";
// import { skill as SkillInput } from "@/generated/prisma/client";
// import { project as ProjectInput } from "@/generated/prisma/client";


// interface AdminFormProps {
//   initialData: PersonalDetails | null;
//   initialEducations: EducationInput[];
//   initialSkills: SkillInput[];
//   initialProjects: ProjectInput[];
// }

// export default function AdminForm({
//   initialData,
//   initialEducations,
//   initialSkills,
//   initialProjects,
// }: AdminFormProps) {
//   const personalDetailsId = initialData?.id ?? null;

//   return (
//     <div>
//       <PersonalDetailsSection initialData={initialData} />
//       <EducationSection
//         personalDetailsId={personalDetailsId}
//         initialEducations={initialEducations}
//       />
//       <SkillSection
//         personalDetailsId={personalDetailsId}
//         initialSkills={initialSkills}
//       />
//       <ProjectSection
//         personalDetailsId={personalDetailsId}
//         initialProjects={initialProjects}
//       />
//     </div>
//   );
// }