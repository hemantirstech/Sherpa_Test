import { SalesLeadContact } from './salesLeadContact.model';

export interface SalesLead {
  id: number;
  companyName: string;
  companyType: number;
  contactNo: string;
  email: string;
  fax: string;
  address: string;
  city: string;
  state: string;
  contry: string;
  zipCode: string;
  leadStatus: number;
  labels: string;
  assigneeId: number;
  salesOwner: string;
  leadSource: number;
  leadReference: number;
  timeZone: string;
  leadContactId: number;

  createdBy: number;
  updatedBy: number;
  updatedAt: string;
  createdAt: string;
  deletedBy: number;
  deletedAt: string;

  salesLeadContact?: SalesLeadContact;
}
