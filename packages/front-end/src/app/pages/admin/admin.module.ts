import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BdpListComponent } from './master/bdp/bdp-list/bdp-list.component';
import { EmployeeListComponent } from './master/employee/employee-list/employee-list.component';
import { AdminRoutingModule } from './admin-routing.module';
import { BdpDetailsComponent } from './master/bdp/bdp-details/bdp-details.component';
import { EmployeeDetailsComponent } from './master/employee/employee-details/employee-details.component';

@NgModule({
  declarations: [BdpListComponent, EmployeeListComponent, BdpDetailsComponent, EmployeeDetailsComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
