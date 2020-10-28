import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/i18n';

import { DefaultComponent } from './dashboards/default/default.component';
import { SalesBoardComponent } from './sales-board/sales-board.component';
import { ConvertedToClientsComponent } from './converted-to-clients/converted-to-clients.component';
import { NotInterestedComponent } from './not-interested/not-interested.component';
import { DoNotCallComponent } from './do-not-call/do-not-call.component';
import { NextModComponent } from './next-mod/next-mod.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DefaultComponent, data: { title: extract('Dashboard') } },
  {
    path: 'sales-board',
    component: SalesBoardComponent,
  },
  {
    path: 'converted-to-clients',
    component: ConvertedToClientsComponent,
  },
  {
    path: 'do-not-call',
    component: DoNotCallComponent,
  },
  {
    path: 'not-interested',
    component: NotInterestedComponent,
  },
  {
    path: 'next-mod',
    component: NextModComponent,
  },
  { path: 'sales', loadChildren: () => import('@app/pages/sales/sales.module').then((m) => m.SalesModule) },
  { path: 'admin', loadChildren: () => import('@app/pages/admin/admin.module').then((m) => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
