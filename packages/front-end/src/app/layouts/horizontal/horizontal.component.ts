import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-horizontal',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss'],
})

/**
 * Horizontal-layout component
 */
export class HorizontalComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit() {
    document.body.setAttribute('data-layout', 'horizontal');
    document.body.setAttribute('data-topbar', 'dark');
    document.body.removeAttribute('data-layout-size');
    document.body.removeAttribute('data-keep-enlarged');

    if (window.innerWidth > 1600) {
      this.boxedWidth();
    }
  }

  ngAfterViewInit() {}

  /**
   * Set boxed width
   */
  boxedWidth() {
    document.body.setAttribute('data-layout-size', 'boxed');
    document.body.setAttribute('data-topbar', 'dark');
  }
}
