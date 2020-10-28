import { Injectable } from '@angular/core';
import { bdpUser } from '@app/pages/admin/master/bdp/bdp.model';

import { Observable } from 'rxjs';
import { HttpDispatcherService } from '../../http/http-dispatcher.service';

const routes = {
  api: {
    getAll: (filters?: Map<string, string>) => (filters ? `/bdps?${filters.toSanitizedURLFilters()}` : `/bdps`),
    get: (id: number) => `/bdps/${id}`,
    create: () => `/bdps`,
    update: (id: number) => `/bdps/${id}`,
    delete: (id: number) => `/bdps/${id}`,
  },
};

@Injectable({
  providedIn: 'root',
})
export class SalesLeadService {
  constructor(private httpDispatcher: HttpDispatcherService) {}

  // Get list of all available sales leads
  getAllLeads(filters?: Map<string, string>): Observable<bdpUser[]> {
    return this.httpDispatcher.get<bdpUser[]>(routes.api.getAll(filters));
  }

  // Get only selected sales leads
  getLeadById(id: number): Observable<bdpUser> {
    return this.httpDispatcher.get<bdpUser>(routes.api.get(id));
  }

  // Create new sales leads
  createNewLead(data: any): Observable<any> {
    return this.httpDispatcher.post(routes.api.create(), data);
  }

  // Update sales leads
  updateLeadById(id: number, salesLead: bdpUser): Observable<any> {
    return this.httpDispatcher.put(routes.api.update(id), salesLead);
  }

  // Delete sales leads
  deleteLeadById(id: number): Observable<any> {
    return this.httpDispatcher.delete(routes.api.delete(id));
  }
}
