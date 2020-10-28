import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CredentialsService } from './credentials.service';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const routes = {
  login: () => `/login`,
};

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient, private credentialsService: CredentialsService) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext) {
    // Replace by proper authentication call
    const data: any = {
      username: context.username,
      password: context.password,
    };

    return this.httpClient.post<LoginContext>(routes.login(), data).pipe(
      tap((responseData: LoginContext) => {
        const statusCode = 'statusCode';

        if (responseData[statusCode] === 200) {
          this.credentialsService.setCredentials(responseData['token'], context.remember);
          return responseData['token'];
        }
      }),
      catchError((err) => {
        return of(err);
      })
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();

    return of(true);
  }
}
