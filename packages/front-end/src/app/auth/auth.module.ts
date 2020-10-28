import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { I18nModule } from '@app/i18n';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { UIModule } from '@app/@shared/ui/ui.module';
import { SignupComponent } from './signup/signup.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { AuthTemplateComponent } from './auth-template/auth-template.component';
import { LockScreenComponent } from './lock-screen/lock-screen.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbModule,
    NgbAlertModule,
    UIModule,
    I18nModule,
    AuthRoutingModule,
  ],
  declarations: [LoginComponent, SignupComponent, PasswordresetComponent, AuthTemplateComponent, LockScreenComponent],
})
export class AuthModule {}
