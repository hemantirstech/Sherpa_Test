import {Entity, model, property} from '@loopback/repository';

@model()
export class SalesLeadHistory extends Entity {
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
  salesLeadId: number;

  @property({
    type: 'number',
    required: true,
  })
  userId: number;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
    required: true,
  })
  action: string;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  @property({
    type: 'date',
  })
  deletedAt?: string;

  constructor(data?: Partial<SalesLeadHistory>) {
    super(data);
  }
}

export interface SalesLeadHistoryRelations {
  // describe navigational properties here
}

export type SalesLeadHistoryWithRelations = SalesLeadHistory &
  SalesLeadHistoryRelations;
