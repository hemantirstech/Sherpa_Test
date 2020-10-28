import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdpDetailsComponent } from './bdp-details.component';

describe('BdpDetailsComponent', () => {
  let component: BdpDetailsComponent;
  let fixture: ComponentFixture<BdpDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BdpDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdpDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
