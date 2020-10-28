import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { CredentialsService } from '@core/auth/credentials.service';

@Injectable({
  providedIn: 'root',
})
export class ApiAuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly credentialsService: CredentialsService,
    private router: Router,
    private state: ActivatedRoute
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = this.credentialsService.credentials;
    if (userToken && request.url.startsWith(environment.serverUrl)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userToken}`,
        },
      });
    }
    return next.handle(request).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 403) {
              this.credentialsService.setCredentials(null);
              this.router.navigate(['/login'], { queryParams: { redirect: this.state.url }, replaceUrl: true });
            }
          }
        }
      )
    );
  }
}
