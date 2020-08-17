import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChatPage } from './admin-chat.page';

describe('AdminChatPage', () => {
  let component: AdminChatPage;
  let fixture: ComponentFixture<AdminChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
