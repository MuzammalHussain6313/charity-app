import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenAdminChatPage } from './open-admin-chat.page';

describe('OpenAdminChatPage', () => {
  let component: OpenAdminChatPage;
  let fixture: ComponentFixture<OpenAdminChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenAdminChatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenAdminChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
