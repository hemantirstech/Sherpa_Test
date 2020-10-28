import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { KanbanRoutingModule } from './kanban-routing.module';
import { UIModule } from '@app/@shared/ui/ui.module';

import { KanbanboardComponent } from './kanbanboard/kanbanboard.component';
import { SharedModule } from '@app/@shared';

@NgModule({
  declarations: [KanbanboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    KanbanRoutingModule,
    UIModule,
    NgbDatepickerModule,
    SharedModule,
  ],
})
export class KanbanModule {}
