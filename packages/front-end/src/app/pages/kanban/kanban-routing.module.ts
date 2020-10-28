import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KanbanboardComponent } from './kanbanboard/kanbanboard.component';
import { extract } from '@app/i18n';

const routes: Routes = [
  {
    path: 'kanban',
    component: KanbanboardComponent,
    data: { title: extract('Kanban Board') },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KanbanRoutingModule {}
