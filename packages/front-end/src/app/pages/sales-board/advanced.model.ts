import { SalesLeadContact } from '../sales/salesLeadContact.model';
// Table data
export interface Table2 {
  name: string;
  position: string;
  company: string;
  email: string;
  contact: string;
  stage: string;
  lastContacted: string;
  dateModified: string;
  salesOwner: {
    id: number;
    name: string;
    profilePic: string;
  };
}

export interface Table {
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

  createdBy: number;
  updatedBy: number;
  updatedAt: string;
  createdAt: string;
  deletedBy: number;
  deletedAt: string;

  leadContactId: number;

  salesLeadContact?: SalesLeadContact;
}

// Search Data
export interface SearchResult {
  tables: Table[];
  total: number;
}
