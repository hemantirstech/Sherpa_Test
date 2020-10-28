import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BdpDetailsComponent } from './master/bdp/bdp-details/bdp-details.component';
import { BdpListComponent } from './master/bdp/bdp-list/bdp-list.component';
import { BdpComponent } from './master/bdp/bdp.component';
import { EmployeeDetailsComponent } from './master/employee/employee-details/employee-details.component';
import { EmployeeListComponent } from './master/employee/employee-list/employee-list.component';
import { EmployeeComponent } from './master/employee/employee.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: 'createemployee', component: EmployeeComponent, data: { title: 'Add Employee ' } },
  { path: 'createbdp', component: BdpComponent, data: { title: 'Add BDP ' } },
  { path: 'updateemployee/:id', component: EmployeeComponent, data: { title: 'Update Employee ' } },
  { path: 'updatebdp/:id', component: BdpComponent, data: { title: 'Update BDP ' } },
  { path: 'employee', component: EmployeeListComponent, data: { title: ' Employee ' } },
  { path: 'employee/:id', component: EmployeeDetailsComponent, data: { title: ' Employee ' } },
  { path: 'bdp', component: BdpListComponent, data: { title: ' BDP ' } },
  { path: 'bdp/:id', component: BdpDetailsComponent, data: { title: ' BDP ' } },
  // // // {
  // // //   path: 'create-new-lead',
  // // //   component: CreateLeadComponent,
  // // // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AdminRoutingModule {}
