import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityHouseChatPage } from './charity-house-chat.page';

describe('CharityHouseChatPage', () => {
  let component: CharityHouseChatPage;
  let fixture: ComponentFixture<CharityHouseChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharityHouseChatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharityHouseChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
