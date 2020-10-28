import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EventService } from '@app/@core/services/event.service';

import { LAYOUT_HORIZONTAL } from './layouts.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, AfterViewInit {
  layoutChange = false;
  // layout related config
  layoutType: string;
  constructor(private eventService: EventService) {}

  ngOnInit() {}

  ngAfterViewInit() {}

  /**
   * Horizontal layout Request
   */
  isHorizontalLayoutRequested() {
    return this.layoutType === LAYOUT_HORIZONTAL;
  }
}
