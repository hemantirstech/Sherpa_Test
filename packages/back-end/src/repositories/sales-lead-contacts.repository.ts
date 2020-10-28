import {DefaultCrudRepository} from '@loopback/repository';
import {SalesLeadContacts, SalesLeadContactsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SalesLeadContactsRepository extends DefaultCrudRepository<
  SalesLeadContacts,
  typeof SalesLeadContacts.prototype.id,
  SalesLeadContactsRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(SalesLeadContacts, dataSource);
  }
}
