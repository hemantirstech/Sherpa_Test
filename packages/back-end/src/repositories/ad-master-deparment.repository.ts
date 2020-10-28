import {DefaultCrudRepository} from '@loopback/repository';
import {AdMasterDeparment, AdMasterDeparmentRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AdMasterDeparmentRepository extends DefaultCrudRepository<
  AdMasterDeparment,
  typeof AdMasterDeparment.prototype.masterDeparmentId,
  AdMasterDeparmentRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(AdMasterDeparment, dataSource);
  }
}
