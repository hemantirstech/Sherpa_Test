import {Entity, hasMany, model, property} from '@loopback/repository';
import {SalesLead} from './sales-lead.model';

@model({settings: {strict: false}, name: 'company_type'})
export class CompanyType extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  constructor(data?: Partial<CompanyType>) {
    super(data);
  }
}

export interface CompanyTypeRelations {
  // describe navigational properties here
}

export type CompanyTypeWithRelations = CompanyType & CompanyTypeRelations;
