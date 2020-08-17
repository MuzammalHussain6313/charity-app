import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendReportPage } from './send-report.page';

describe('SendReportPage', () => {
  let component: SendReportPage;
  let fixture: ComponentFixture<SendReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
