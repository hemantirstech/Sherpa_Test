import {DefaultCrudRepository} from '@loopback/repository';
import {CompanyType, CompanyTypeRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CompanyTypeRepository extends DefaultCrudRepository<
  CompanyType,
  typeof CompanyType.prototype.id,
  CompanyTypeRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(CompanyType, dataSource);
  }
}
