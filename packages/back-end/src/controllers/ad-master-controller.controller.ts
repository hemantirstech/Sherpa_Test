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
import {AdMasterDeparment} from '../models';
import {AdMasterDeparmentRepository} from '../repositories';

export class AdMasterControllerController {
  constructor(
    @repository(AdMasterDeparmentRepository)
    public adMasterDeparmentRepository : AdMasterDeparmentRepository,
  ) {}

  @post('/ad-master-deparments', {
    responses: {
      '200': {
        description: 'AdMasterDeparment model instance',
        content: {'application/json': {schema: getModelSchemaRef(AdMasterDeparment)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdMasterDeparment, {
            title: 'NewAdMasterDeparment',
            exclude: ['masterDeparmentId'],
          }),
        },
      },
    })
    adMasterDeparment: Omit<AdMasterDeparment, 'masterDeparmentId'>,
  ): Promise<AdMasterDeparment> {
    return this.adMasterDeparmentRepository.create(adMasterDeparment);
  }

  @get('/ad-master-deparments/count', {
    responses: {
      '200': {
        description: 'AdMasterDeparment model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(AdMasterDeparment) where?: Where<AdMasterDeparment>,
  ): Promise<Count> {
    return this.adMasterDeparmentRepository.count(where);
  }

  @get('/ad-master-deparments', {
    responses: {
      '200': {
        description: 'Array of AdMasterDeparment model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(AdMasterDeparment, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(AdMasterDeparment) filter?: Filter<AdMasterDeparment>,
  ): Promise<AdMasterDeparment[]> {
    return this.adMasterDeparmentRepository.find(filter);
  }

  @patch('/ad-master-deparments', {
    responses: {
      '200': {
        description: 'AdMasterDeparment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdMasterDeparment, {partial: true}),
        },
      },
    })
    adMasterDeparment: AdMasterDeparment,
    @param.where(AdMasterDeparment) where?: Where<AdMasterDeparment>,
  ): Promise<Count> {
    return this.adMasterDeparmentRepository.updateAll(adMasterDeparment, where);
  }

  @get('/ad-master-deparments/{id}', {
    responses: {
      '200': {
        description: 'AdMasterDeparment model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AdMasterDeparment, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AdMasterDeparment, {exclude: 'where'}) filter?: FilterExcludingWhere<AdMasterDeparment>
  ): Promise<AdMasterDeparment> {
    return this.adMasterDeparmentRepository.findById(id, filter);
  }

  @patch('/ad-master-deparments/{id}', {
    responses: {
      '204': {
        description: 'AdMasterDeparment PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdMasterDeparment, {partial: true}),
        },
      },
    })
    adMasterDeparment: AdMasterDeparment,
  ): Promise<void> {
    await this.adMasterDeparmentRepository.updateById(id, adMasterDeparment);
  }

  @put('/ad-master-deparments/{id}', {
    responses: {
      '204': {
        description: 'AdMasterDeparment PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() adMasterDeparment: AdMasterDeparment,
  ): Promise<void> {
    await this.adMasterDeparmentRepository.replaceById(id, adMasterDeparment);
  }

  @del('/ad-master-deparments/{id}', {
    responses: {
      '204': {
        description: 'AdMasterDeparment DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.adMasterDeparmentRepository.deleteById(id);
  }
}
