import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, untilDestroyed } from '@core';
import { AuthenticationService } from '@core/auth';

const log = new Logger('Login');

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.scss'],
})
export class LockScreenComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  submitted = false;
  returnUrl: string;

  // set the currenr year
  year: number = new Date().getFullYear();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }
  ngOnDestroy() {}
  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
  login() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      const login$ = this.authenticationService.login(this.loginForm.value);
      login$
        .pipe(
          finalize(() => {
            this.loginForm.markAsPristine();
          }),
          untilDestroyed(this)
        )
        .subscribe(
          (user: any) => {
            log.debug(`${user.username} successfully logged in`);
            this.router.navigate([this.route.snapshot.queryParams.redirect || '/dashboard'], { replaceUrl: true });
          },
          (error: any) => {
            log.debug(`Login error: ${error}`);
            this.error = error;
          }
        );
    }
  }
  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }
}
