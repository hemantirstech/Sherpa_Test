import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpDispatcherService } from '@core/http/http-dispatcher.service';
import { MasterDesignationUser } from './masterDesignation.model';

const routes = {
  masterdesignation: {
    getAll: (filters?: Map<string, string>) => (filters ? `/ad-master-designations?${filters.toSanitizedURLFilters()}` : `/ad-master-designations`),
    get: (id: string) => `/ad-master-designations/${id}`,
    create: () => `/ad-master-designations`,
    update: (id: string) => `/ad-master-designations/${id}`,
    delete: (id: string) => `/ad-master-designations/${id}`,
  },
};

@Injectable({
  providedIn: 'root',
})
export class MasterDesignationService {
  constructor(private readonly httpDispatcher: HttpDispatcherService) {}

  // Get list of all available masterdesignation
  getAll(filters?: Map<string, string>): Observable<MasterDesignationUser[]> {
    return this.httpDispatcher.get<MasterDesignationUser[]>(routes.masterdesignation.getAll(filters));
  }

  // Get only selected masterdesignation
  show(id: string): Observable<MasterDesignationUser> {
    return this.httpDispatcher.get<MasterDesignationUser>(routes.masterdesignation.get(id));
  }

  // Create new masterdesignation
  create(data: any): Observable<any> {
    return this.httpDispatcher.post(routes.masterdesignation.create(), data);
  }

  // Update masterdesignation
  update(id: string, masterdesignation: MasterDesignationUser): Observable<any> {
    return this.httpDispatcher.put(routes.masterdesignation.update(id), masterdesignation);
  }

  // Delete masterdesignation
  delete(id: string): Observable<any> {
    return this.httpDispatcher.delete(routes.masterdesignation.delete(id));
  }
}
