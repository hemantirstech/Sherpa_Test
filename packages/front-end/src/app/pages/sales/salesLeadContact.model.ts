export interface SalesLeadContact {
  id: number;
  name: string;
  primaryEmail: string;
  designation: string;
  mobileNumber: number;
  alternateNumber: number;
  notes: string;

  createdBy?: number;
  updatedBy?: number;
  updatedAt?: string;
  createdAt?: string;
  deletedBy?: number;
  deletedAt?: string;
  lastContacted?: string;
}
