import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpDispatcherService } from '@core/http/http-dispatcher.service';
import { ContactUser } from './contact.model';

const routes = {
  contact: {
    getAll: (filters?: Map<string, string>) => (filters ? `/contacts?${filters.toSanitizedURLFilters()}` : `/contacts`),
    get: (id: string) => `/contacts/${id}`,
    create: () => `/contacts`,
    update: (id: string) => `/contacts/${id}`,
    delete: (id: string) => `/contacts/${id}`,
  },
};

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private readonly httpDispatcher: HttpDispatcherService) {}

  // Get list of all available contacts
  getAll(filters?: Map<string, string>): Observable<ContactUser[]> {
    return this.httpDispatcher.get<ContactUser[]>(routes.contact.getAll(filters));
  }

  // Get only selected contact
  show(id: string): Observable<ContactUser> {
    return this.httpDispatcher.get<ContactUser>(routes.contact.get(id));
  }

  // Create new contact
  create(data: any): Observable<any> {
    return this.httpDispatcher.post(routes.contact.create(), data);
  }

  // Update contact
  update(id: string, contact: ContactUser): Observable<any> {
    return this.httpDispatcher.put(routes.contact.update(id), contact);
  }

  // Delete contact
  delete(id: string): Observable<any> {
    return this.httpDispatcher.delete(routes.contact.delete(id));
  }
}
