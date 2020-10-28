import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}, name: 'sales_lead_contacts'})
export class SalesLeadContacts extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  primaryEmail?: string;

  @property({
    type: 'string',
  })
  secondaryEmail?: string;

  @property({
    type: 'string',
  })
  companyName?: string;

  @property({
    type: 'string',
  })
  designation?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  mobileNumber?: string;

  @property({
    type: 'string',
  })
  alternateNumber?: string;

  @property({
    type: 'string',
  })
  city?: string;

  @property({
    type: 'string',
  })
  state?: string;

  @property({
    type: 'string',
  })
  country?: string;

  @property({
    type: 'string',
  })
  zipCode?: string;

  @property({
    type: 'string',
  })
  notes?: string;

  @property({
    type: 'number',
  })
  salesLeadId?: number;

  @property({
    type: 'number',
  })
  createdBy?: number;

  @property({
    type: 'number',
  })
  updatedBy?: number;

  @property({
    type: 'number',
  })
  deletedBy?: number;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  @property({
    type: 'date',
  })
  lastContacted?: string;

  constructor(data?: Partial<SalesLeadContacts>) {
    super(data);
  }
}

export interface SalesLeadContactsRelations {
  // describe navigational properties here
}

export type SalesLeadContactsWithRelations = SalesLeadContacts &
  SalesLeadContactsRelations;
