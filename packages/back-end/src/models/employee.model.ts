import {Entity, model, property} from '@loopback/repository';

@model()
export class Employee extends Entity {
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
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  designation: number;

  @property({
    type: 'number',
    required: true,
  })
  userId: number;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  contactNo?: string;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'string',
  })
  type?: string;

  @property({
    type: 'string',
  })
  alternateMobile?: string;

  @property({
    type: 'string',
  })
  addressLine1?: string;

  @property({
    type: 'string',
  })
  addressLine2?: string;

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
  pan?: string;

  @property({
    type: 'string',
  })
  aadharCardNo?: string;

  @property({
    type: 'string',
  })
  accType?: string;

  @property({
    type: 'string',
  })
  accNumber?: string;

  @property({
    type: 'string',
  })
  bankName?: string;

  @property({
    type: 'string',
  })
  branchName?: string;

  @property({
    type: 'string',
  })
  ifscCode?: string;

  @property({
    type: 'string',
  })
  shiftCode?: string;

  @property({
    type: 'string',
  })
  image?: string;

  constructor(data?: Partial<Employee>) {
    super(data);
  }
}

export interface EmployeeRelations {
  // describe navigational properties here
}

export type EmployeeWithRelations = Employee & EmployeeRelations;
