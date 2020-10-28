import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}, name: 'sales_lead_comment'})
export class SalesLeadComment extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  userId: number;

  @property({
    type: 'number',
    required: true,
  })
  salesLeadId: number;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @property({
    type: 'date',
    required: true,
  })
  updatedAt: string;

  @property({
    type: 'date',
  })
  deletedAt?: string;

  constructor(data?: Partial<SalesLeadComment>) {
    super(data);
  }
}

export interface SalesLeadCommentRelations {
  // describe navigational properties here
}

export type SalesLeadCommentWithRelations = SalesLeadComment &
  SalesLeadCommentRelations;
