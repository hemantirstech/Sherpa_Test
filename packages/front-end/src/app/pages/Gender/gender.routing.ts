import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenderComponent } from './gender.component';
import { extract } from '@app/i18n';

const routes: Routes = [
  {
    path: 'genders',
    component: GenderComponent,
    data: { title: extract('Gender') },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenderRoutingModule {}
