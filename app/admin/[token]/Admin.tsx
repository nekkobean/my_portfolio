
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
    <div className="min-h-screen w-full bg-white">

      {/* MOBILE HEADER */}
      <header className="md:hidden sticky top-0 z-20 bg-white border-b border-gray-200">
        <nav className="flex justify-center items-center gap-3 py-2">
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
            const isActive = activeTab === key;

            return (
              <button
                key={key}
                type="button"
                title={label}
                onClick={() => setActiveTab(key)}
                className={`p-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={22} />
              </button>
            );
          })}
        </nav>
      </header>

     
      <div className="flex">

        {/* Sidebar (Desktop Only) */}
        <aside className="hidden md:flex w-64 flex-shrink-0 bg-white border-r border-gray-200 flex-col py-8 px-4 gap-2">
          <h1 className="text-lg font-bold text-black mb-6 px-2">
            Admin Panel
          </h1>

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

        {/* Main Content */}
        <main className="flex-1 px-4 md:px-10 py-6 md:py-10 overflow-y-auto bg-white">

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
//     <div className="min-h-screen w-full bg-white flex  md:flex-row">
//         {/* Mobile Top Navigation */}
//   <header className="md:hidden sticky top-0 z-20 bg-white border-b border-gray-200 items-center ">
//     <nav className="flex justify-around py-2">
//       {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
//         const isActive = activeTab === key;

//         return (
//           <button
//             key={key}
//             type="button"
//             title={label}
//             onClick={() => setActiveTab(key)}
//             className={`p-3 rounded-lg transition-colors ${
//               isActive
//                 ? "bg-black text-white"
//                 : "text-gray-600 hover:bg-gray-100"
//             }`}
//           >
//             <Icon size={22} />
//           </button>
//         );
//       })}
//     </nav>
//   </header>

//       {/* Sidebar */}
//       <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col py-8 px-4 gap-2">
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
//       <main className="flex-1 px-10 py-10 overflow-y-auto bg-white">
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
