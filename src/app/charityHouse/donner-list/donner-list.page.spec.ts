import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonnerListPage } from './donner-list.page';

describe('DonnerListPage', () => {
  let component: DonnerListPage;
  let fixture: ComponentFixture<DonnerListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonnerListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonnerListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
