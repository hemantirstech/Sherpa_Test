import {DefaultCrudRepository} from '@loopback/repository';
import {SalesLead, SalesLeadRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SalesLeadRepository extends DefaultCrudRepository<
  SalesLead,
  typeof SalesLead.prototype.id,
  SalesLeadRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(SalesLead, dataSource);
  }

  async findByLead(leadStatus: number): Promise<SalesLead[] | undefined> {
    try {
      return await this.find({
        where: {leadStatus: leadStatus},
        fields: {
          id: true,
          companyName: true,
          companyType: true,
          contactNo: true,
          email: true,
          leadStatus: true,
          assigneeId: true,
          leadContactId: true,
        },
      });
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
