import {DefaultCrudRepository} from '@loopback/repository';
import {SalesLeadHistory, SalesLeadHistoryRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SalesLeadHistoryRepository extends DefaultCrudRepository<
  SalesLeadHistory,
  typeof SalesLeadHistory.prototype.id,
  SalesLeadHistoryRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(SalesLeadHistory, dataSource);
  }
}
