import type { skill_category } from "@/generated/prisma/enums";

export interface SkillInput {
  skill_name: string;
  skill_category: skill_category;
  skill_description?: string;
  proficiency_level?: number;
  personal_details_id_fk: string;
}
