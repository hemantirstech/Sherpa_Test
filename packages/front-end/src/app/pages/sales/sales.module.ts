import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbNavModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from '@app/@shared/ui/ui.module';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// import { FormlyModule } from '@ngx-formly/core';
// import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

import { SalesRoutingModule } from './sales-routing.module';

import { CreateLeadComponent } from './create-lead/create-lead.component';
import { LeadDetailsComponent } from './lead-details/lead-details.component';
import { TableTopbarComponent } from './table-topbar/table-topbar.component';

import { SalesLeadService } from '@app/@core/services/sales-lead.service';
import { SalesLeadContactService } from '@app/@core/services/sales-lead-contact.service';

const config: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 100,
};
@NgModule({
  declarations: [CreateLeadComponent, LeadDetailsComponent, TableTopbarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbNavModule,
    NgbProgressbarModule,
    UIModule,
    DropzoneModule,
    CarouselModule,
    CKEditorModule,
    // FormlyBootstrapModule,
    // FormlyModule.forRoot(),
    SalesRoutingModule,
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: config,
    },
    SalesLeadService,
    SalesLeadContactService,
  ],
})
export class SalesModule {}
