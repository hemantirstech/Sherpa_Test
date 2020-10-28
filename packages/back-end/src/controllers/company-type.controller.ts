import {Filter, repository} from '@loopback/repository';
import {post, param, get, getModelSchemaRef, requestBody} from '@loopback/rest';
import {CompanyType} from '../models';
import {CompanyTypeRepository} from '../repositories';

export class CompanyTypeController {
  constructor(
    @repository(CompanyTypeRepository)
    public companyTypeRepository: CompanyTypeRepository,
  ) {}

  @post('/company-types', {
    responses: {
      '200': {
        description: 'CompanyType model instance',
        content: {'application/json': {schema: getModelSchemaRef(CompanyType)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyType, {
            title: 'NewCompanyType',
            exclude: ['id'],
          }),
        },
      },
    })
    companyType: Omit<CompanyType, 'id'>,
  ): Promise<CompanyType> {
    return this.companyTypeRepository.create(companyType);
  }
  @get('/company-types', {
    responses: {
      '200': {
        description: 'Array of CompanyType model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CompanyType, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(CompanyType) filter?: Filter<CompanyType>,
  ): Promise<CompanyType[]> {
    return this.companyTypeRepository.find(filter);
  }
}
