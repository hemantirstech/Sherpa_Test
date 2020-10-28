import {DefaultCrudRepository} from '@loopback/repository';
import {AdMasterDesignation, AdMasterDesignationRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AdMasterDesignationRepository extends DefaultCrudRepository<
  AdMasterDesignation,
  typeof AdMasterDesignation.prototype.masterDesignationId,
  AdMasterDesignationRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(AdMasterDesignation, dataSource);
  }
}
