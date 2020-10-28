import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableXComponent } from './table-x.component';

describe('TableXComponent', () => {
  let component: TableXComponent;
  let fixture: ComponentFixture<TableXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableXComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
