import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSingleCharityHousePage } from './show-single-charity-house.page';

describe('ShowSingleCharityHousePage', () => {
  let component: ShowSingleCharityHousePage;
  let fixture: ComponentFixture<ShowSingleCharityHousePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSingleCharityHousePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSingleCharityHousePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
