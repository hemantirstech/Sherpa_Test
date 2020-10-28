import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpDispatcherService } from '@core/http/http-dispatcher.service';
import { GenderUser } from './gender.model';

const routes = {
  gender: {
    getAll: (filters?: Map<string, string>) => (filters ? `/genders?${filters.toSanitizedURLFilters()}` : `/genders`),
    get: (id: string) => `/genders/${id}`,
    create: () => `/genders`,
    update: (id: string) => `/genders/${id}`,
    delete: (id: string) => `/genders/${id}`,
  },
};

@Injectable({
  providedIn: 'root',
})
export class GenderService {
  constructor(private readonly httpDispatcher: HttpDispatcherService) {}

  // Get list of all available gender
  getAll(filters?: Map<string, string>): Observable<GenderUser[]> {
    return this.httpDispatcher.get<GenderUser[]>(routes.gender.getAll(filters));
  }

  // Get only selected gender
  show(id: string): Observable<GenderUser> {
    return this.httpDispatcher.get<GenderUser>(routes.gender.get(id));
  }

  // Create new gender
  create(data: any): Observable<any> {
    return this.httpDispatcher.post(routes.gender.create(), data);
  }

  // Update gender
  update(id: string, gender: GenderUser): Observable<any> {
    return this.httpDispatcher.put(routes.gender.update(id), gender);
  }

  // Delete gender
  delete(id: string): Observable<any> {
    return this.httpDispatcher.delete(routes.gender.delete(id));
  }
}
