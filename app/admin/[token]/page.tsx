
import { getEducationsByPersonalId } from "@/lib/actions/education-actions";
import { getSkillsByPersonalId } from "@/lib/actions/skill-actions";
import { getProjectsByPersonalId } from "@/lib/actions/project-actions";
import AdminForm from "./Admin";
import { getProfileData } from "@/lib/actions/portfolio";
import { personal_details as PersonalDetails } from "@/generated/prisma/client";

interface AdminProps {
  params: Promise<{ token: string }>;
}

export default async function Admin({ params }: AdminProps) {
  const { token } = await params;

  if (token !== process.env.TOKEN) {
    return <div>Access Denied</div>;
  }
 
const email = "elois.dev@gmail.com"; // Replace with actual email retrieval logic

  const initialData = await getProfileData(email, true);

  return (
    <AdminForm
      initialData={ initialData as PersonalDetails }
      initialEducations={initialData?.education || []}
      initialSkills={initialData?.skills || []}
      initialProjects={initialData?.projects || []}
    />
  );
}