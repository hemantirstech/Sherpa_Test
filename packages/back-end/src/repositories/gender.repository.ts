import {DefaultCrudRepository} from '@loopback/repository';
import {Gender, GenderRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class GenderRepository extends DefaultCrudRepository<
  Gender,
  typeof Gender.prototype.id,
  GenderRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Gender, dataSource);
  }
}
