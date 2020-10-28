import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdpComponent } from './bdp.component';

describe('BdpComponent', () => {
  let component: BdpComponent;
  let fixture: ComponentFixture<BdpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BdpComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
