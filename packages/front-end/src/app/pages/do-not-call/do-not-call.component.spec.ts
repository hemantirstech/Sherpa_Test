import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoNotCallComponent } from './do-not-call.component';

describe('DoNotCallComponent', () => {
  let component: DoNotCallComponent;
  let fixture: ComponentFixture<DoNotCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DoNotCallComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoNotCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
