"use server";
// import { LandingLayout } from "@eloisallena/web_components";
import Home, { HomeProps } from "./components/sections/Home";
import AboutMe from "./components/sections/AboutMe";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import { getProfileData } from "@/lib/actions/portfolio";

export default async function HomeContent() {
  const profileInfo = await getProfileData("elois.dev127@gmail.com");
  
  const homeData: HomeProps = {
    first_name: profileInfo?.first_name,
    middle_name: profileInfo?.middle_name,
    last_name: profileInfo?.last_name,
    introduction: profileInfo?.introduction,
  };

 const aboutMeData = {
    school_name: profileInfo?.education?.school_name,
    school_address: profileInfo?.education?.school_address,
    year_attended: profileInfo?.education?.year_attended,
    year_graduated: profileInfo?.education?.year_graduated,
    course: profileInfo?.education?.course,
  };

  const projectData = {
    project_title: profileInfo?.projects?.project_title,
    project_description: profileInfo?.projects?.project_description,
    project_type: profileInfo?.projects?.project_type,
    role: profileInfo?.projects?.role,
    technologies_used: profileInfo?.projects?.technologies_used,
    start_date: profileInfo?.projects?.start_date,
    end_date: profileInfo?.projects?.end_date,
  };

  const skillData = {
    skill_category: profileInfo?.skills?.skill_category,
    skill_name: profileInfo?.skills?.skill_name,
    skill_description: profileInfo?.skills?.skill_description,
    proficiency_level: profileInfo?.skills?.proficiency_level,
  };
  // const aboutMeInfo = {
  //   about_me: profileInfo?.about_me,
  //   education: profileInfo?.education,
  // };

  return (
    <div className="bg-gray-100">
      <Home info={homeData} />
      <AboutMe info={aboutMeData} />
      <Projects info={projectData} />
      <Skills info={skillData} />
      <Contact />
    </div>
  );
}
