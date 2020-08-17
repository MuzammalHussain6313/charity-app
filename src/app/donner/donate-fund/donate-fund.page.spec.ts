import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateFundPage } from './donate-fund.page';

describe('DonateFundPage', () => {
  let component: DonateFundPage;
  let fixture: ComponentFixture<DonateFundPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateFundPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateFundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
