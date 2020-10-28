import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-table-filters',
  templateUrl: './table-filters.component.html',
  styleUrls: ['./table-filters.component.scss'],
})
export class TableFiltersComponent implements OnInit {
  filterForm: FormGroup;

  // Input for sort by option
  @Input() sortBy: any = [
    {
      id: 0,
      name: 'Latest First',
    },
    {
      id: 1,
      name: 'Oldest First',
    },
    {
      id: 2,
      name: 'Last Updated',
    },
  ];

  // Input for assignable users
  @Input() assignedTo: any;

  @Input() isSearchable: boolean = true;

  @Input() searchModel: any;

  // Send event for search field
  @Output()
  ngFilter: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      searchTicket: ['', null],
      sort_by: ['', null],
      managed_by: ['', null],
    });
  }

  // Notify Subscriber for event handling
  onSearch(model: object) {
    this.ngFilter.emit();
  }
}
