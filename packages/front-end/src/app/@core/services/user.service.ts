import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

import { User } from '@core/auth/credentials.service';

import { Observable } from 'rxjs';
import { HttpDispatcherService } from '../http/http-dispatcher.service';

const userRoutes = {
  login: () => `/users/login`,
  getUsers: () => environment.serverUrl + `/users`,
};

const routes = {
  users: {
    login: () => `/users/login`,
    getAll: (filters?: Map<string, string>) => (filters ? `/users?${filters.toSanitizedURLFilters()}` : `/users`),
    register: () => `/users/register`,
  },
};

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpDispatcher: HttpDispatcherService) {}

  // Get list of all available routess
  getUsers(filters?: Map<string, string>): Observable<User[]> {
    return this.httpDispatcher.get<User[]>(routes.users.getAll(filters));
  }

  // Create new sales leads
  register(data: any): Observable<any> {
    return this.httpDispatcher.post(routes.users.register(), data);
  }
}
