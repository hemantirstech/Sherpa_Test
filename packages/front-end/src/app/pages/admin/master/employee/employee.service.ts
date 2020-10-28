import { Injectable } from '@angular/core';
import { HttpDispatcherService } from '@core/http/http-dispatcher.service';
import { Observable } from 'rxjs';
import { employeeUser } from './employee.model';

const routes = {
  emp: {
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
export class employeeService {
  constructor(private readonly httpDispatcher: HttpDispatcherService) {}

  // Get list of all available emps
  getAll(filters?: Map<string, string>): Observable<employeeUser[]> {
    return this.httpDispatcher.get<employeeUser[]>(routes.emp.getAll(filters));
  }

  // Get only selected sales leads
  getEmployeeId(id: number): Observable<employeeUser> {
    return this.httpDispatcher.get<employeeUser>(routes.emp.get(id));
  }
  // Create new emp
  create(data: any): Observable<any> {
    return this.httpDispatcher.post(routes.emp.create(), data);
  }

  // Update emp
  update(id: number, emp: employeeUser): Observable<any> {
    return this.httpDispatcher.put(routes.emp.update(id), emp);
  }

  // Delete emp
  delete(id: number): Observable<any> {
    return this.httpDispatcher.delete(routes.emp.delete(id));
  }
}
