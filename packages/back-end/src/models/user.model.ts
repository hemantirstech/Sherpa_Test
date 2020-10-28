import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'number',
  })
  statusId?: number;

  @property({
    type: 'number',
    default: 1,
  })
  isActive?: number;

  @property({
    type: 'number',
  })
  userTypeId?: number;

  @property({
    type: 'number',
  })
  createdBy?: number;

  @property({
    type: 'date',
    default: '$now',
  })
  createdAt?: string;

  @property({
    type: 'number',
  })
  updatedBy?: number;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  @property({
    type: 'number',
  })
  deletedBy?: number;

  @property({
    type: 'date',
  })
  deletedAt?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
