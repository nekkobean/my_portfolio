import type { education_level } from "@/generated/prisma/enums";

export default interface EducationEntry {
  id: string;
  level: education_level;
  school_name: string;
  school_address: string;
  year_attended: Date;
  year_graduated: Date | null;
  course: string | null;
  description: string | null;
  personal_details_id_fk: string;
}
