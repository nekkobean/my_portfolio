import { Card, CardContent, CardImage, Section } from "@eloisallena/web_components";

export interface EducationItem {
  school_name?: string;
  school_address?: string;
  year_attended?: string;
  year_graduated?: string;
  course?: string | null;
}

export interface AboutMeProps {
  education: EducationItem[];
  interests?: string | null;
  what_i_do?: string | null;
}

export default function AboutMe({ info }: { info: AboutMeProps }) {
  const educationDescription = info.education.length
    ? info.education
        .map(
          (item) =>
            `${item.school_name ?? "Education"}\n${item.school_address ?? ""}\n${item.year_attended ?? ""} - ${item.year_graduated ?? "Present"}\n${item.course ?? ""}`,
        )
        .join("\n\n")
    : "No education records found.";

  return (
    <Section
      id="about-me"
      title="About Me"
      style="bg-white text-black min-h-0!"
      sectionTitleClassName="text-black text-xl md:text-2xl lg:text-3xl"
    >
      <div
        data-mode="light"
        className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]"
      >
        <Card style="w-full bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <CardImage
            image="https://www.rappler.com/tachyon/2023/05/CAEPUP-may-29-2023-1.png"
            alt="Education"
          />
          <CardContent
            title="Education"
            description={educationDescription}
            titleClassName="text-lg md:text-xl font-bold"
            descriptionClassName="text-sm md:text-base"
          />
        </Card>
        <Card style="w-full bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <CardImage
            image="whatido.png"
            alt="What I Do"
          />
          <CardContent
            title="What I Do"
            description={info.what_i_do ?? "No information provided."}
            titleClassName="text-lg md:text-xl font-bold"
            descriptionClassName="text-sm md:text-base"
          />
        </Card>
        <Card style="w-full bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <CardContent
            title="Interests"
            description={info.interests ?? "No information provided."}
            titleClassName="text-lg md:text-xl font-bold"
            descriptionClassName="text-sm md:text-base"
          />
        </Card>
      </div>
    </Section>
  );
}