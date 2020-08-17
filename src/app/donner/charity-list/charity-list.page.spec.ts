import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityListPage } from './charity-list.page';

describe('CharityListPage', () => {
  let component: CharityListPage;
  let fixture: ComponentFixture<CharityListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharityListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharityListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
