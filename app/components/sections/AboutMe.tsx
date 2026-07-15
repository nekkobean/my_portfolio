import { Card, CardContent, Section } from "@eloisallena/web_components";

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
    <Section id="about-me" title="About Me" style="bg-white text-black">
      <div data-mode="light" className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card style="bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <CardContent title="Education" description={educationDescription} />
        </Card>
        <Card style="bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <CardContent
            title="What I Do"
            description={info.what_i_do ?? "No information provided."}
          />
        </Card>
        <Card style="bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <CardContent
            title="Interests"
            description={info.interests ?? "No information provided."}
          />
        </Card>
      </div>
    </Section>
  );
}
