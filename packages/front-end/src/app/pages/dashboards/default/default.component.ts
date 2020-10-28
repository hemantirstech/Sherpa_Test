import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  constructor() {}

  ngOnInit() {
    this.breadCrumbItems = [{ label: '' }];
  }
}
