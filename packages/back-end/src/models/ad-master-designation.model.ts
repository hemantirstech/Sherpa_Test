import {Entity, model, property} from '@loopback/repository';

@model()
export class AdMasterDesignation extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  masterDesignationId?: number;

  @property({
    type: 'string',
    required: true,
  })
  designationTitle: string;

  @property({
    type: 'string',
    required: true,
  })
  designationCode: string;

  @property({
    type: 'string',
    required: true,
  })
  designationDescription: string;

  @property({
    type: 'number',
    required: true,
  })
  masterDeparmentId: number;

  @property({
    type: 'string',
    required: true,
  })
  designationType: string;

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


  constructor(data?: Partial<AdMasterDesignation>) {
    super(data);
  }
}

export interface AdMasterDesignationRelations {
  // describe navigational properties here
}

export type AdMasterDesignationWithRelations = AdMasterDesignation & AdMasterDesignationRelations;
