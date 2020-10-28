import { Injectable } from '@angular/core';
import { employeeUser } from '@app/pages/admin/master/employee/employee.model';

import { Observable } from 'rxjs';
import { HttpDispatcherService } from '../../http/http-dispatcher.service';

const routes = {
  salesLead: {
    getAll: (filters?: Map<string, string>) =>
      filters ? `/employees?${filters.toSanitizedURLFilters()}` : `/employees`,
    get: (id: number) => `/employees/${id}`,
    create: () => `/employees`,
    update: (id: number) => `/employees/${id}`,
    delete: (id: number) => `/employees/${id}`,
  },
};

@Injectable({
  providedIn: 'root',
})
export class SalesLeadService {
  constructor(private httpDispatcher: HttpDispatcherService) {}

  // Get list of all available sales leads
  getAllLeads(filters?: Map<string, string>): Observable<employeeUser[]> {
    return this.httpDispatcher.get<employeeUser[]>(routes.salesLead.getAll(filters));
  }

  // Get only selected sales leads
  getLeadById(id: number): Observable<employeeUser> {
    return this.httpDispatcher.get<employeeUser>(routes.salesLead.get(id));
  }

  // Create new sales leads
  createNewLead(data: any): Observable<any> {
    return this.httpDispatcher.post(routes.salesLead.create(), data);
  }

  // Update sales leads
  updateLeadById(id: number, salesLead: employeeUser): Observable<any> {
    return this.httpDispatcher.put(routes.salesLead.update(id), salesLead);
  }

  // Delete sales leads
  deleteLeadById(id: number): Observable<any> {
    return this.httpDispatcher.delete(routes.salesLead.delete(id));
  }
}
