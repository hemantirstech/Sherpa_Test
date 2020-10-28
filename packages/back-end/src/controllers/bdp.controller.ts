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
import {Bdp} from '../models';
import {BdpRepository} from '../repositories';

export class BdpController {
  constructor(
    @repository(BdpRepository)
    public bdpRepository: BdpRepository,
  ) {}

  @post('/bdps', {
    responses: {
      '200': {
        description: 'Bdp model instance',
        content: {'application/json': {schema: getModelSchemaRef(Bdp)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bdp, {
            title: 'NewBdp',
            exclude: ['id'],
          }),
        },
      },
    })
    bdp: Omit<Bdp, 'id'>,
  ): Promise<Bdp> {
    return this.bdpRepository.create(bdp);
  }

  @get('/bdps/count', {
    responses: {
      '200': {
        description: 'Bdp model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Bdp) where?: Where<Bdp>): Promise<Count> {
    return this.bdpRepository.count(where);
  }

  @get('/bdps', {
    responses: {
      '200': {
        description: 'Array of Bdp model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Bdp, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Bdp) filter?: Filter<Bdp>): Promise<Bdp[]> {
    return this.bdpRepository.find(filter);
  }

  @patch('/bdps', {
    responses: {
      '200': {
        description: 'Bdp PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bdp, {partial: true}),
        },
      },
    })
    bdp: Bdp,
    @param.where(Bdp) where?: Where<Bdp>,
  ): Promise<Count> {
    return this.bdpRepository.updateAll(bdp, where);
  }

  @get('/bdps/{id}', {
    responses: {
      '200': {
        description: 'Bdp model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Bdp, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Bdp, {exclude: 'where'}) filter?: FilterExcludingWhere<Bdp>,
  ): Promise<Bdp> {
    return this.bdpRepository.findById(id, filter);
  }

  @patch('/bdps/{id}', {
    responses: {
      '204': {
        description: 'Bdp PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bdp, {partial: true}),
        },
      },
    })
    bdp: Bdp,
  ): Promise<void> {
    await this.bdpRepository.updateById(id, bdp);
  }

  @put('/bdps/{id}', {
    responses: {
      '204': {
        description: 'Bdp PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() bdp: Bdp,
  ): Promise<void> {
    await this.bdpRepository.replaceById(id, bdp);
  }

  @del('/bdps/{id}', {
    responses: {
      '204': {
        description: 'Bdp DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.bdpRepository.deleteById(id);
  }
}
