import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertedToClientsComponent } from './converted-to-clients.component';

describe('ConvertedToClientsComponent', () => {
  let component: ConvertedToClientsComponent;
  let fixture: ComponentFixture<ConvertedToClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConvertedToClientsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertedToClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
