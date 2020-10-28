import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {SalesLeadContacts} from '../models';
import {SalesLeadContactsRepository} from '../repositories';

export class SalesLeadContactsController {
  constructor(
    @repository(SalesLeadContactsRepository)
    public salesLeadContactsRepository: SalesLeadContactsRepository,
  ) {}

  @post('/sales-lead-contacts', {
    responses: {
      '200': {
        description: 'SalesLeadContacts model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(SalesLeadContacts)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalesLeadContacts, {
            title: 'NewSalesLeadContacts',
            exclude: ['id'],
          }),
        },
      },
    })
    salesLeadContacts: Omit<SalesLeadContacts, 'id'>,
  ): Promise<SalesLeadContacts> {
    return this.salesLeadContactsRepository.create(salesLeadContacts);
  }

  @get('/sales-lead-contacts/count', {
    responses: {
      '200': {
        description: 'SalesLeadContacts model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(SalesLeadContacts) where?: Where<SalesLeadContacts>,
  ): Promise<Count> {
    return this.salesLeadContactsRepository.count(where);
  }

  @get('/sales-lead-contacts', {
    responses: {
      '200': {
        description: 'Array of SalesLeadContacts model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(SalesLeadContacts, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(SalesLeadContacts) filter?: Filter<SalesLeadContacts>,
  ): Promise<SalesLeadContacts[]> {
    return this.salesLeadContactsRepository.find(filter);
  }

  @patch('/sales-lead-contacts', {
    responses: {
      '200': {
        description: 'SalesLeadContacts PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalesLeadContacts, {partial: true}),
        },
      },
    })
    salesLeadContacts: SalesLeadContacts,
    @param.where(SalesLeadContacts) where?: Where<SalesLeadContacts>,
  ): Promise<Count> {
    return this.salesLeadContactsRepository.updateAll(salesLeadContacts, where);
  }

  @get('/sales-lead-contacts/{id}', {
    responses: {
      '200': {
        description: 'SalesLeadContacts model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SalesLeadContacts, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SalesLeadContacts, {exclude: 'where'})
    filter?: FilterExcludingWhere<SalesLeadContacts>,
  ): Promise<SalesLeadContacts> {
    return this.salesLeadContactsRepository.findById(id, filter);
  }

  @patch('/sales-lead-contacts/{id}', {
    responses: {
      '204': {
        description: 'SalesLeadContacts PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalesLeadContacts, {partial: true}),
        },
      },
    })
    salesLeadContacts: SalesLeadContacts,
  ): Promise<void> {
    await this.salesLeadContactsRepository.updateById(id, salesLeadContacts);
  }

  @put('/sales-lead-contacts/{id}', {
    responses: {
      '204': {
        description: 'SalesLeadContacts PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() salesLeadContacts: SalesLeadContacts,
  ): Promise<void> {
    await this.salesLeadContactsRepository.replaceById(id, salesLeadContacts);
  }

  @del('/sales-lead-contacts/{id}', {
    responses: {
      '204': {
        description: 'SalesLeadContacts DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.salesLeadContactsRepository.deleteById(id);
  }
}
