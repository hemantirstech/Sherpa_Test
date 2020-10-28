import {Entity, model, property} from '@loopback/repository';

@model()
export class AdMasterDeparment extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  masterDeparmentId?: number;

  @property({
    type: 'string',
    required: true,
  })
  deparmentTitle: string;

  @property({
    type: 'string',
    required: true,
  })
  departmentCode: string;

  @property({
    type: 'string',
    required: true,
  })
  departmentDescription: string;

  @property({
    type: 'number',
  })
  createdBy?: number;

  @property({
    type: 'number',
  })
  updatedBy?: number;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'number',
  })
  deletedBy?: number;

  @property({
    type: 'date',
  })
  deletedAt?: string;


  constructor(data?: Partial<AdMasterDeparment>) {
    super(data);
  }
}

export interface AdMasterDeparmentRelations {
  // describe navigational properties here
}

export type AdMasterDeparmentWithRelations = AdMasterDeparment & AdMasterDeparmentRelations;
