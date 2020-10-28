import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { NgbNavModule, NgbDropdownModule, NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { WidgetModule } from '@app/@shared/widget/widget.module';
import { UIModule } from '@app/@shared/ui/ui.module';

import { PagesRoutingModule } from './pages-routing.module';

import { DashboardsModule } from './dashboards/dashboards.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoaderService } from '@app/@core/services/loader.service';
import { LoaderInterceptorService } from '@app/@core/services/interceptors/loader-interceptor.service';
import { CompanyTypeService } from '@app/@core/services/company-type.service';
import { UserService } from '@app/@core/services/user.service';
import { SalesLeadService } from '@app/@core/services/sales-lead.service';
import { SalesLeadContactService } from '@app/@core/services/sales-lead-contact.service';

import { KanbanModule } from './kanban/kanban.module';
import { SalesBoardComponent } from './sales-board/sales-board.component';
import { ConvertedToClientsComponent } from './converted-to-clients/converted-to-clients.component';
import { NotInterestedComponent } from './not-interested/not-interested.component';
import { DoNotCallComponent } from './do-not-call/do-not-call.component';
import { ContactModule } from './contact/contact.module';
import { SharedModule } from '@app/@shared';
import { EmployeeComponent } from './admin/master/employee/employee.component';
import { BdpComponent } from './admin/master/bdp/bdp.component';
import { NextModComponent } from './next-mod/next-mod.component';

import { MasterDepartmentModule } from './MasterDepartment/masterDepartment.module';
import { MasterDesignationModule } from './MasterDesignation/masterDesignation.module';
import { GenderModule } from './gender/gender.module';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 0.3,
};

@NgModule({
  declarations: [
    SalesBoardComponent,
    ConvertedToClientsComponent,
    NotInterestedComponent,
    DoNotCallComponent,
    EmployeeComponent,
    BdpComponent,
    NextModComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgbModalModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    UIModule,
    WidgetModule,
    NgbNavModule,
    NgbTooltipModule,
    PerfectScrollbarModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    // Custom Modules
    DashboardsModule,
    KanbanModule,
    ContactModule,
    SharedModule,
    MasterDepartmentModule,
    MasterDesignationModule,
    GenderModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
    CompanyTypeService,
    UserService,
    SalesLeadService,
    SalesLeadContactService,
  ],
})
export class PagesModule {}
