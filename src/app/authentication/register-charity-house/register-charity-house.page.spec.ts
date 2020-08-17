import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCharityHousePage } from './register-charity-house.page';

describe('RegisterCharityHousePage', () => {
  let component: RegisterCharityHousePage;
  let fixture: ComponentFixture<RegisterCharityHousePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterCharityHousePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCharityHousePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
