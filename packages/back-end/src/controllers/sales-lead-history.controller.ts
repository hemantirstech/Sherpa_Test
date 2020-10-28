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
import {SalesLeadHistory} from '../models';
import {SalesLeadHistoryRepository} from '../repositories';

export class SalesLeadHistoryController {
  constructor(
    @repository(SalesLeadHistoryRepository)
    public salesLeadHistoryRepository: SalesLeadHistoryRepository,
  ) {}

  @post('/sales-lead-histories', {
    responses: {
      '200': {
        description: 'SalesLeadHistory model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(SalesLeadHistory)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalesLeadHistory, {
            title: 'NewSalesLeadHistory',
            exclude: ['id'],
          }),
        },
      },
    })
    salesLeadHistory: Omit<SalesLeadHistory, 'id'>,
  ): Promise<SalesLeadHistory> {
    return this.salesLeadHistoryRepository.create(salesLeadHistory);
  }

  @get('/sales-lead-histories/count', {
    responses: {
      '200': {
        description: 'SalesLeadHistory model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(SalesLeadHistory) where?: Where<SalesLeadHistory>,
  ): Promise<Count> {
    return this.salesLeadHistoryRepository.count(where);
  }

  @get('/sales-lead-histories', {
    responses: {
      '200': {
        description: 'Array of SalesLeadHistory model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(SalesLeadHistory, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(SalesLeadHistory) filter?: Filter<SalesLeadHistory>,
  ): Promise<SalesLeadHistory[]> {
    return this.salesLeadHistoryRepository.find(filter);
  }

  @patch('/sales-lead-histories', {
    responses: {
      '200': {
        description: 'SalesLeadHistory PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalesLeadHistory, {partial: true}),
        },
      },
    })
    salesLeadHistory: SalesLeadHistory,
    @param.where(SalesLeadHistory) where?: Where<SalesLeadHistory>,
  ): Promise<Count> {
    return this.salesLeadHistoryRepository.updateAll(salesLeadHistory, where);
  }

  @get('/sales-lead-histories/{id}', {
    responses: {
      '200': {
        description: 'SalesLeadHistory model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SalesLeadHistory, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SalesLeadHistory, {exclude: 'where'})
    filter?: FilterExcludingWhere<SalesLeadHistory>,
  ): Promise<SalesLeadHistory> {
    return this.salesLeadHistoryRepository.findById(id, filter);
  }

  @patch('/sales-lead-histories/{id}', {
    responses: {
      '204': {
        description: 'SalesLeadHistory PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalesLeadHistory, {partial: true}),
        },
      },
    })
    salesLeadHistory: SalesLeadHistory,
  ): Promise<void> {
    await this.salesLeadHistoryRepository.updateById(id, salesLeadHistory);
  }

  @put('/sales-lead-histories/{id}', {
    responses: {
      '204': {
        description: 'SalesLeadHistory PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() salesLeadHistory: SalesLeadHistory,
  ): Promise<void> {
    await this.salesLeadHistoryRepository.replaceById(id, salesLeadHistory);
  }

  @del('/sales-lead-histories/{id}', {
    responses: {
      '204': {
        description: 'SalesLeadHistory DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.salesLeadHistoryRepository.deleteById(id);
  }
}
