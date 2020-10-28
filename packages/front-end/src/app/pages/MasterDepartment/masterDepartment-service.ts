import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpDispatcherService } from '@core/http/http-dispatcher.service';
import { MasterDepartmentUser } from './masterDepartment.model';

const routes = {
  masterdepartment: {
    getAll: (filters?: Map<string, string>) => (filters ? `/ad-master-deparments?${filters.toSanitizedURLFilters()}` : `/ad-master-deparments`),
    get: (id: string) => `/ad-master-deparments/${id}`,
    create: () => `/ad-master-deparments`,
    update: (id: string) => `/ad-master-deparments/${id}`,
    delete: (id: string) => `/ad-master-deparments/${id}`,
  },
};

@Injectable({
  providedIn: 'root',
})
export class MasterDepartmentService {
  constructor(private readonly httpDispatcher: HttpDispatcherService) {}

  // Get list of all available masterdepartments
  getAll(filters?: Map<string, string>): Observable<MasterDepartmentUser[]> {
    return this.httpDispatcher.get<MasterDepartmentUser[]>(routes.masterdepartment.getAll(filters));
  }

  // Get only selected masterdepartment
  show(id: string): Observable<MasterDepartmentUser> {
    return this.httpDispatcher.get<MasterDepartmentUser>(routes.masterdepartment.get(id));
  }

  // Create new masterdepartment
  create(data: any): Observable<any> {
    return this.httpDispatcher.post(routes.masterdepartment.create(), data);
  }

  // Update masterdepartment
  update(id: string, masterdepartment: MasterDepartmentUser): Observable<any> {
    return this.httpDispatcher.put(routes.masterdepartment.update(id), masterdepartment);
  }

  // Delete masterdepartment
  delete(id: string): Observable<any> {
    return this.httpDispatcher.delete(routes.masterdepartment.delete(id));
  }
}
