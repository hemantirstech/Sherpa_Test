import {Entity, model, property, belongsTo} from '@loopback/repository';
import {CompanyType} from './company-type.model';

@model({settings: {strict: false}, name: 'sales_lead'})
export class SalesLead extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  companyName?: string;

  @property({
    type: 'number',
  })
  companyType?: number;

  @property({
    type: 'string',
  })
  contactNo?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  fax?: string;

  @property({
    type: 'string',
  })
  address?: string;

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
  contry?: string;

  @property({
    type: 'string',
  })
  zipCode?: string;

  @property({
    type: 'number',
  })
  leadStatus?: number;

  @property({
    type: 'string',
  })
  labels?: string;

  @property({
    type: 'number',
  })
  assigneeId?: number;

  @property({
    type: 'string',
  })
  salesOwner?: string;

  @property({
    type: 'number',
  })
  leadSource?: number;

  @property({
    type: 'number',
  })
  leadReference?: number;

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
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  @property({
    type: 'date',
  })
  deletedAt?: string;

  @property({
    type: 'number',
  })
  leadContactId?: number;

  constructor(data?: Partial<SalesLead>) {
    super(data);
  }
}

export interface SalesLeadRelations {
  // describe navigational properties here
}

export type SalesLeadWithRelations = SalesLead & SalesLeadRelations;
