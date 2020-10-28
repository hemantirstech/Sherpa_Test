import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterDesignationComponent } from './masterDesignation.component';
import { extract } from '@app/i18n';

const routes: Routes = [
  {
    path: 'ad-master-designations',
    component: MasterDesignationComponent,
    data: { title: extract('Admin Master Designation') },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterDesignationRoutingModule {}
