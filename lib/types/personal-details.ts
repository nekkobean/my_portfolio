export default interface PersonalDetails {
  id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  languages: string;
  email: string;
  phone_number?: string;
  what_i_do?: string;
  interests?: string;
  introduction?: string;
  socials?: string;
}
