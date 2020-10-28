import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Logger } from '../logger.service';
import { environment } from '@env/environment';

const log = new Logger('HttpDispatcherService');

@Injectable({
  providedIn: 'root',
})
export class HttpDispatcherService {
  constructor(private readonly httpClient: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url).pipe(
      map((response) => {
        return response['error'] && response['error']['statusCode'] != 200 ? response['error']['message'] : response;
      }),
      tap((item) => {
        if (item) {
          return item;
        }
      }),
      catchError(HttpDispatcherService.handleError)
    );
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.httpClient.post<T>(url, body).pipe(
      tap((responseData: any) => {
        return responseData;
      }),
      catchError(HttpDispatcherService.handleError)
    );
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.httpClient.put<T>(url, body).pipe(
      tap((responseData: any) => {
        return responseData;
      }),
      catchError(HttpDispatcherService.handleError)
    );
  }

  delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(url).pipe(
      tap((responseData: any) => {
        return responseData;
      }),
      catchError(HttpDispatcherService.handleError)
    );
  }

  private static handleError(error: HttpErrorResponse) {
    if (!environment.production) {
      if (error.error instanceof ErrorEvent) {
        // Log client-side or network error
        log.error('An error occurred:', error.error.message);
      } else {
        // Log server-side error [The response body may contain clues as to what went wrong]
        log.error(`Backend returned code '${error.status}', ` + ` with message: '${error.error.message}'`);
      }
    }

    return throwError(
      // return a user-facing error message, pipe backend messages with static fallback // FIXME move to CONSTANTS
      error.error.message ? error.error.message : 'Something bad happened; please try again later.'
    );
  }
}
