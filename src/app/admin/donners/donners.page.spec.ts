import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonnersPage } from './donners.page';

describe('DonnersPage', () => {
  let component: DonnersPage;
  let fixture: ComponentFixture<DonnersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonnersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonnersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
