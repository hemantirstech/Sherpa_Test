import { Injectable } from '@angular/core';
import { SalesLead } from '@app/pages/sales/salesLead.model';

import { Observable } from 'rxjs';
import { HttpDispatcherService } from '../http/http-dispatcher.service';

const routes = {
  salesLead: {
    getAll: (filters?: Map<string, string>) =>
      filters ? `/sales-leads?${filters.toSanitizedURLFilters()}` : `/sales-leads`,
    get: (id: number) => `/sales-leads/${id}`,
    create: () => `/sales-leads`,
    update: (id: number) => `/sales-leads/${id}`,
    delete: (id: number) => `/sales-leads/${id}`,
    getLeadsByStage: (leadStatus: number) => `/sales-leads-by-lead-status/${leadStatus}`,
  },
};

@Injectable({
  providedIn: 'root',
})
export class SalesLeadService {
  constructor(private httpDispatcher: HttpDispatcherService) {}

  // Get list of all available sales leads
  getAllLeads(filters?: Map<string, string>): Observable<SalesLead[]> {
    return this.httpDispatcher.get<SalesLead[]>(routes.salesLead.getAll(filters));
  }

  // Get only selected sales leads
  getLeadById(id: number): Observable<SalesLead> {
    return this.httpDispatcher.get<SalesLead>(routes.salesLead.get(id));
  }

  // Create new sales leads
  createNewLead(data: any): Observable<any> {
    return this.httpDispatcher.post(routes.salesLead.create(), data);
  }

  // Update sales leads
  updateLeadById(id: number, salesLead: SalesLead): Observable<any> {
    return this.httpDispatcher.put(routes.salesLead.update(id), salesLead);
  }

  // Delete sales leads
  deleteLeadById(id: number): Observable<any> {
    return this.httpDispatcher.delete(routes.salesLead.delete(id));
  }

  // Get sales leads by status
  getLeadsByStage(leadStatus: number) {
    return this.httpDispatcher.get<SalesLead>(routes.salesLead.getLeadsByStage(leadStatus));
  }
}
