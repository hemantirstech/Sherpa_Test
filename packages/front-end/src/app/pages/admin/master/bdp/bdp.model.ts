export interface bdpUser {
  id?: number;
  status?: string;

  type: string;

  name?: string;
  contactNo?: string;
  alternateMobile?: string;
  email?: string;
  companyName?: string;
  addressLine1?: string;
  addressLine2?: string;
  designation?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;

  firmName?: string;

  employeeId?: string;

  dateOfReg?: string;
  pan?: string;
  baseCurrency?: string;
  incentiveType?: string;

  accType?: string;
  accNumber?: string;
  bankName?: string;
  branchName?: string;
  ifscCode?: string;
  shiftCode?: string;

  image?: string;

  notes?: string;
}
