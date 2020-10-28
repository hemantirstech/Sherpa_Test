import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextModComponent } from './next-mod.component';

describe('NextModComponent', () => {
  let component: NextModComponent;
  let fixture: ComponentFixture<NextModComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NextModComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
