import {Entity, model, property} from '@loopback/repository';

@model()
export class Gender extends Entity {
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
  genderTitle: string;

  @property({
    type: 'string',
    required: true,
  })
  genderCode: string;

  @property({
    type: 'string',
    required: true,
  })
  genderIcon: string;


  constructor(data?: Partial<Gender>) {
    super(data);
  }
}

export interface GenderRelations {
  // describe navigational properties here
}

export type GenderWithRelations = Gender & GenderRelations;
