import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCharityHousePage } from './update-charity-house.page';

describe('UpdateCharityHousePage', () => {
  let component: UpdateCharityHousePage;
  let fixture: ComponentFixture<UpdateCharityHousePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCharityHousePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCharityHousePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
