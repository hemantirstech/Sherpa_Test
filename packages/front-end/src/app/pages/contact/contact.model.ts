export interface ContactUser {
  id?: number;
  image?: string;
  name: string;
  mobile?: string;
  alternateMobile?: string;
  primaryEmail?: string;
  secondaryEmail?: string;
  companyName?: string;
  addressLine1?: string;
  addressLine2?: string;
  designation?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  notes?: string;
}
