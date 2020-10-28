import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdpListComponent } from './bdp-list.component';

describe('BdpListComponent', () => {
  let component: BdpListComponent;
  let fixture: ComponentFixture<BdpListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BdpListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
