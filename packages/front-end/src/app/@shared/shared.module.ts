import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from './ui/ui.module';
import { WidgetModule } from './widget/widget.module';
import { TableXComponent } from './table-x/table-x.component';
import { TableFiltersComponent } from './table-filters/table-filters.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule, UIModule, WidgetModule],
  declarations: [TableXComponent, TableFiltersComponent, ComingSoonComponent],
  exports: [TableFiltersComponent],
})
export class SharedModule {}
