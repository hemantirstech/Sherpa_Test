import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterDepartmentComponent } from './masterDepartment.component';
import { extract } from '@app/i18n';

const routes: Routes = [
  {
    path: 'ad-master-deparments',
    component: MasterDepartmentComponent,
    data: { title: extract('Admin Master Department') },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterDepartmentRoutingModule {}
