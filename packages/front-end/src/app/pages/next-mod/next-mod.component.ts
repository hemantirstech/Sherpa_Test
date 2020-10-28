import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-next-mod',
  templateUrl: './next-mod.component.html',
  styleUrls: ['./next-mod.component.scss'],
})
export class NextModComponent implements OnInit {
  breadCrumbItems: Array<{}>;

  constructor() {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Dashboard', path: 'dashboard', redirectTo: '/dashboard' },
      { label: 'Coming Soon', active: true },
    ];
  }
}
