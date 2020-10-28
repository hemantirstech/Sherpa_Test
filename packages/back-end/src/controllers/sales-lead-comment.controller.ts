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
import {SalesLeadComment} from '../models';
import {SalesLeadCommentRepository} from '../repositories';

export class SalesLeadCommentController {
  constructor(
    @repository(SalesLeadCommentRepository)
    public salesLeadCommentRepository: SalesLeadCommentRepository,
  ) {}

  @post('/sales-lead-comments', {
    responses: {
      '200': {
        description: 'SalesLeadComment model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(SalesLeadComment)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalesLeadComment, {
            title: 'NewSalesLeadComment',
            exclude: ['id'],
          }),
        },
      },
    })
    salesLeadComment: Omit<SalesLeadComment, 'id'>,
  ): Promise<SalesLeadComment> {
    return this.salesLeadCommentRepository.create(salesLeadComment);
  }

  @get('/sales-lead-comments/count', {
    responses: {
      '200': {
        description: 'SalesLeadComment model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(SalesLeadComment) where?: Where<SalesLeadComment>,
  ): Promise<Count> {
    return this.salesLeadCommentRepository.count(where);
  }

  @get('/sales-lead-comments', {
    responses: {
      '200': {
        description: 'Array of SalesLeadComment model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(SalesLeadComment, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(SalesLeadComment) filter?: Filter<SalesLeadComment>,
  ): Promise<SalesLeadComment[]> {
    return this.salesLeadCommentRepository.find(filter);
  }

  @patch('/sales-lead-comments', {
    responses: {
      '200': {
        description: 'SalesLeadComment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalesLeadComment, {partial: true}),
        },
      },
    })
    salesLeadComment: SalesLeadComment,
    @param.where(SalesLeadComment) where?: Where<SalesLeadComment>,
  ): Promise<Count> {
    return this.salesLeadCommentRepository.updateAll(salesLeadComment, where);
  }

  @get('/sales-lead-comments/{id}', {
    responses: {
      '200': {
        description: 'SalesLeadComment model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SalesLeadComment, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SalesLeadComment, {exclude: 'where'})
    filter?: FilterExcludingWhere<SalesLeadComment>,
  ): Promise<SalesLeadComment> {
    return this.salesLeadCommentRepository.findById(id, filter);
  }

  @patch('/sales-lead-comments/{id}', {
    responses: {
      '204': {
        description: 'SalesLeadComment PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalesLeadComment, {partial: true}),
        },
      },
    })
    salesLeadComment: SalesLeadComment,
  ): Promise<void> {
    await this.salesLeadCommentRepository.updateById(id, salesLeadComment);
  }

  @put('/sales-lead-comments/{id}', {
    responses: {
      '204': {
        description: 'SalesLeadComment PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() salesLeadComment: SalesLeadComment,
  ): Promise<void> {
    await this.salesLeadCommentRepository.replaceById(id, salesLeadComment);
  }

  @del('/sales-lead-comments/{id}', {
    responses: {
      '204': {
        description: 'SalesLeadComment DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.salesLeadCommentRepository.deleteById(id);
  }
}
