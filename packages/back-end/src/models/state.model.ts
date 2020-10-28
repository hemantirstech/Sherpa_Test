import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}, name: 'states'})
export class State extends Entity {
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
  ciuntryId: number;

  @property({
    type: 'string',
    required: true,
  })
  stateCode: string;

  @property({
    type: 'string',
    required: true,
  })
  stateTitle: string;

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
  updatedAt?: number;

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


  constructor(data?: Partial<State>) {
    super(data);
  }
}

export interface StateRelations {
  // describe navigational properties here
}

export type StateWithRelations = State & StateRelations;
