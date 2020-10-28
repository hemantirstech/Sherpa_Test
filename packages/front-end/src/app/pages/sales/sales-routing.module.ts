import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateLeadComponent } from './create-lead/create-lead.component';
import { LeadDetailsComponent } from './lead-details/lead-details.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: CreateLeadComponent, data: { title: 'Create New Lead' } },
  {
    path: 'create-new-lead',
    component: CreateLeadComponent,
  },
  {
    path: 'lead-details/:id',
    component: LeadDetailsComponent,
  },
  { path: 'update-lead/:id', component: CreateLeadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class SalesRoutingModule {}
