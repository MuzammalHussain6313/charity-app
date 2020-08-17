import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonnerChatPage } from './donner-chat.page';

describe('DonnerChatPage', () => {
  let component: DonnerChatPage;
  let fixture: ComponentFixture<DonnerChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonnerChatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonnerChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
