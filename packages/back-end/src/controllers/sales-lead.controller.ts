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
import {SalesLead} from '../models';
import {SalesLeadRepository} from '../repositories';

export class SalesLeadController {
  constructor(
    @repository(SalesLeadRepository)
    public salesLeadRepository: SalesLeadRepository,
  ) {}

  @post('/sales-leads', {
    responses: {
      '200': {
        description: 'SalesLead model instance',
        content: {'application/json': {schema: getModelSchemaRef(SalesLead)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalesLead, {
            title: 'NewSalesLead',
            exclude: ['id'],
          }),
        },
      },
    })
    salesLead: Omit<SalesLead, 'id'>,
  ): Promise<SalesLead> {
    return this.salesLeadRepository.create(salesLead);
  }

  @get('/sales-leads/count', {
    responses: {
      '200': {
        description: 'SalesLead model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(SalesLead) where?: Where<SalesLead>,
  ): Promise<Count> {
    return this.salesLeadRepository.count(where);
  }

  @get('/sales-leads', {
    responses: {
      '200': {
        description: 'Array of SalesLead model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(SalesLead, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(SalesLead) filter?: Filter<SalesLead>,
  ): Promise<SalesLead[]> {
    return this.salesLeadRepository.find(filter);
  }

  @patch('/sales-leads', {
    responses: {
      '200': {
        description: 'SalesLead PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalesLead, {partial: true}),
        },
      },
    })
    salesLead: SalesLead,
    @param.where(SalesLead) where?: Where<SalesLead>,
  ): Promise<Count> {
    return this.salesLeadRepository.updateAll(salesLead, where);
  }

  @get('/sales-leads/{id}', {
    responses: {
      '200': {
        description: 'SalesLead model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SalesLead, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SalesLead, {exclude: 'where'})
    filter?: FilterExcludingWhere<SalesLead>,
  ): Promise<SalesLead> {
    return this.salesLeadRepository.findById(id, filter);
  }

  @patch('/sales-leads/{id}', {
    responses: {
      '204': {
        description: 'SalesLead PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalesLead, {partial: true}),
        },
      },
    })
    salesLead: SalesLead,
  ): Promise<void> {
    await this.salesLeadRepository.updateById(id, salesLead);
  }

  @put('/sales-leads/{id}', {
    responses: {
      '204': {
        description: 'SalesLead PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() salesLead: SalesLead,
  ): Promise<void> {
    await this.salesLeadRepository.replaceById(id, salesLead);
  }

  @del('/sales-leads/{id}', {
    responses: {
      '204': {
        description: 'SalesLead DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.salesLeadRepository.deleteById(id);
  }

  @get('/sales-leads-by-lead-status/{leadStatus}', {
    responses: {
      '200': {
        description: 'Array of SalesLead model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(SalesLead, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async findByLead(
    @param.path.number('leadStatus') leadStatus: number,
  ): Promise<SalesLead[] | undefined> {
    return this.salesLeadRepository.findByLead(leadStatus);
  }
}
