import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatChannelsPage } from './chat-channels.page';

describe('ChatChannelsPage', () => {
  let component: ChatChannelsPage;
  let fixture: ComponentFixture<ChatChannelsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatChannelsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatChannelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
