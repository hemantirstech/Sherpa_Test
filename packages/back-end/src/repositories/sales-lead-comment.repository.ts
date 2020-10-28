import {DefaultCrudRepository} from '@loopback/repository';
import {SalesLeadComment, SalesLeadCommentRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SalesLeadCommentRepository extends DefaultCrudRepository<
  SalesLeadComment,
  typeof SalesLeadComment.prototype.id,
  SalesLeadCommentRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(SalesLeadComment, dataSource);
  }
}
