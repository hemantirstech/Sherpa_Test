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
import {AdMasterDesignation} from '../models';
import {AdMasterDesignationRepository} from '../repositories';

export class AdMasterDesignationController {
  constructor(
    @repository(AdMasterDesignationRepository)
    public adMasterDesignationRepository : AdMasterDesignationRepository,
  ) {}

  @post('/ad-master-designations', {
    responses: {
      '200': {
        description: 'AdMasterDesignation model instance',
        content: {'application/json': {schema: getModelSchemaRef(AdMasterDesignation)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdMasterDesignation, {
            title: 'NewAdMasterDesignation',
            exclude: ['masterDesignationId'],
          }),
        },
      },
    })
    adMasterDesignation: Omit<AdMasterDesignation, 'masterDesignationId'>,
  ): Promise<AdMasterDesignation> {
    return this.adMasterDesignationRepository.create(adMasterDesignation);
  }

  @get('/ad-master-designations/count', {
    responses: {
      '200': {
        description: 'AdMasterDesignation model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(AdMasterDesignation) where?: Where<AdMasterDesignation>,
  ): Promise<Count> {
    return this.adMasterDesignationRepository.count(where);
  }

  @get('/ad-master-designations', {
    responses: {
      '200': {
        description: 'Array of AdMasterDesignation model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(AdMasterDesignation, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(AdMasterDesignation) filter?: Filter<AdMasterDesignation>,
  ): Promise<AdMasterDesignation[]> {
    return this.adMasterDesignationRepository.find(filter);
  }

  @patch('/ad-master-designations', {
    responses: {
      '200': {
        description: 'AdMasterDesignation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdMasterDesignation, {partial: true}),
        },
      },
    })
    adMasterDesignation: AdMasterDesignation,
    @param.where(AdMasterDesignation) where?: Where<AdMasterDesignation>,
  ): Promise<Count> {
    return this.adMasterDesignationRepository.updateAll(adMasterDesignation, where);
  }

  @get('/ad-master-designations/{id}', {
    responses: {
      '200': {
        description: 'AdMasterDesignation model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AdMasterDesignation, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AdMasterDesignation, {exclude: 'where'}) filter?: FilterExcludingWhere<AdMasterDesignation>
  ): Promise<AdMasterDesignation> {
    return this.adMasterDesignationRepository.findById(id, filter);
  }

  @patch('/ad-master-designations/{id}', {
    responses: {
      '204': {
        description: 'AdMasterDesignation PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdMasterDesignation, {partial: true}),
        },
      },
    })
    adMasterDesignation: AdMasterDesignation,
  ): Promise<void> {
    await this.adMasterDesignationRepository.updateById(id, adMasterDesignation);
  }

  @put('/ad-master-designations/{id}', {
    responses: {
      '204': {
        description: 'AdMasterDesignation PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() adMasterDesignation: AdMasterDesignation,
  ): Promise<void> {
    await this.adMasterDesignationRepository.replaceById(id, adMasterDesignation);
  }

  @del('/ad-master-designations/{id}', {
    responses: {
      '204': {
        description: 'AdMasterDesignation DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.adMasterDesignationRepository.deleteById(id);
  }
}
