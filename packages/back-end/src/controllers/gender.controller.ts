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
import {Gender} from '../models';
import {GenderRepository} from '../repositories';

export class GenderController {
  constructor(
    @repository(GenderRepository)
    public genderRepository : GenderRepository,
  ) {}

  @post('/genders', {
    responses: {
      '200': {
        description: 'Gender model instance',
        content: {'application/json': {schema: getModelSchemaRef(Gender)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gender, {
            title: 'NewGender',
            exclude: ['id'],
          }),
        },
      },
    })
    gender: Omit<Gender, 'id'>,
  ): Promise<Gender> {
    return this.genderRepository.create(gender);
  }

  @get('/genders/count', {
    responses: {
      '200': {
        description: 'Gender model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Gender) where?: Where<Gender>,
  ): Promise<Count> {
    return this.genderRepository.count(where);
  }

  @get('/genders', {
    responses: {
      '200': {
        description: 'Array of Gender model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Gender, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Gender) filter?: Filter<Gender>,
  ): Promise<Gender[]> {
    return this.genderRepository.find(filter);
  }

  @patch('/genders', {
    responses: {
      '200': {
        description: 'Gender PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gender, {partial: true}),
        },
      },
    })
    gender: Gender,
    @param.where(Gender) where?: Where<Gender>,
  ): Promise<Count> {
    return this.genderRepository.updateAll(gender, where);
  }

  @get('/genders/{id}', {
    responses: {
      '200': {
        description: 'Gender model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Gender, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Gender, {exclude: 'where'}) filter?: FilterExcludingWhere<Gender>
  ): Promise<Gender> {
    return this.genderRepository.findById(id, filter);
  }

  @patch('/genders/{id}', {
    responses: {
      '204': {
        description: 'Gender PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gender, {partial: true}),
        },
      },
    })
    gender: Gender,
  ): Promise<void> {
    await this.genderRepository.updateById(id, gender);
  }

  @put('/genders/{id}', {
    responses: {
      '204': {
        description: 'Gender PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() gender: Gender,
  ): Promise<void> {
    await this.genderRepository.replaceById(id, gender);
  }

  @del('/genders/{id}', {
    responses: {
      '204': {
        description: 'Gender DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.genderRepository.deleteById(id);
  }
}
