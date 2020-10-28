import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MasterDesignationRoutingModule } from './masterDesignation.routing';
import { UIModule } from '@app/@shared/ui/ui.module';

import { NgbNavModule, NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LoaderService } from '@app/@core/services/loader.service';
import { LoaderInterceptorService } from '@app/@core/services/interceptors/loader-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MasterDesignationComponent } from './masterDesignation.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 0.3,
};
@NgModule({
//   declarations: [ContactComponent, ContactFormComponent],
declarations: [MasterDesignationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MasterDesignationRoutingModule,
    UIModule,
    NgbNavModule,
    NgbModalModule,
    NgbTooltipModule,
    PerfectScrollbarModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
  ],
})
export class MasterDesignationModule {}
