import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { LayoutComponent } from '@app/layouts/layout.component';
import { ComingSoonComponent } from './@shared/coming-soon/coming-soon.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'about', loadChildren: () => import('./about/about.module').then((m) => m.AboutModule) }]),

  // { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  // // tslint:disable-next-line: max-line-length
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
  },

  // Fallback when no prior route is matched
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'comingsoon', component: ComingSoonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
