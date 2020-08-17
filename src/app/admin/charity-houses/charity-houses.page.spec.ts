import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityHousesPage } from './charity-houses.page';

describe('CharityHousesPage', () => {
  let component: CharityHousesPage;
  let fixture: ComponentFixture<CharityHousesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharityHousesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharityHousesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
