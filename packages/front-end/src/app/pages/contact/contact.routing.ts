import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact.component';
import { extract } from '@app/i18n';

const routes: Routes = [
  {
    path: 'contacts',
    component: ContactComponent,
    data: { title: extract('Contacts') },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactRoutingModule {}
