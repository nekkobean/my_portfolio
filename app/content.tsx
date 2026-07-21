"use server";
// import { LandingLayout } from "@eloisallena/web_components";
import Home, { HomeProps } from "./components/sections/Home";
import AboutMe from "./components/sections/AboutMe";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import { getProfileData } from "@/lib/actions/portfolio";
import Header from "./components/sections/Header";

export default async function HomeContent() {
  const profileInfo = await getProfileData("elois.dev@gmail.com", true);

  const formatDate = (value?: Date | null) =>
    value
      ? value.toLocaleDateString("en-US", { month: "short", year: "numeric" })
      : undefined;

  const homeData: HomeProps = {
    first_name: profileInfo?.first_name,
    middle_name: profileInfo?.middle_name,
    last_name: profileInfo?.last_name,
    introduction: profileInfo?.introduction,
  };

  const aboutMeData = {
    education:
      profileInfo?.education.map((item) => ({
        school_name: item.school_name,
        school_address: item.school_address,
        year_attended: formatDate(item.year_attended),
        year_graduated: formatDate(item.year_graduated),
        course: item.course,
      })) ?? [],
    interests: profileInfo?.interests,
    what_i_do: profileInfo?.what_i_do,
  };

  const projectData = {
    projects:
      profileInfo?.projects.map((item) => ({
        project_title: item.project_title,
        project_description: item.project_description,
        project_type: item.project_type,
        project_image: item.project_image,
        role: item.role,
        technologies_used: item.technologies_used,
        project_link: item.project_link, // ADDED
        repository_link: item.repository_link, // ADDED
        start_date: formatDate(item.start_date),
        end_date: formatDate(item.end_date),
      })) ?? [],
  };

  const skillData = {
    skills:
      profileInfo?.skills.map((item) => ({
        skill_category: item.skill_category,
        skill_name: item.skill_name,
        skill_description: item.skill_description,
        skill_image: item.skill_image,
        proficiency_level: item.proficiency_level,
      })) ?? [],
  };
  // const aboutMeInfo = {
  //   about_me: profileInfo?.about_me,
  //   education: profileInfo?.education,
  // };

  return (
    <div className="bg-gray-100">
      <Header/>
      <Home info={homeData} />
      <AboutMe info={aboutMeData} />
      <Projects info={projectData} />
      <Skills info={skillData} />
      <Contact />
    </div>
  );
};