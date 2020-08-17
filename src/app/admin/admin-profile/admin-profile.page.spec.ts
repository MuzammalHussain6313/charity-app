import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfilePage } from './admin-profile.page';

describe('AdminProfilePage', () => {
  let component: AdminProfilePage;
  let fixture: ComponentFixture<AdminProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
