import {DefaultCrudRepository} from '@loopback/repository';
import {Bdp, BdpRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class BdpRepository extends DefaultCrudRepository<
  Bdp,
  typeof Bdp.prototype.id,
  BdpRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Bdp, dataSource);
  }
}
