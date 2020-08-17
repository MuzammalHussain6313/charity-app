import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ListService} from '../../list.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {
  users = [];
  currentUser;
  recivedData;
  compareUser;
  constructor(public db: AngularFireDatabase,
              public router: Router,
              public http: HttpClient,
              private service: ListService) {
    this.http.get(`${this.service.homeUrl}/channels/conversation-user-list`,
        {observe: 'response'}).subscribe(response => {
      if (response.status === 200 || response.status === 201) {
        this.recivedData = response.body;
        this.users = this.recivedData;
      }
      console.log('status code', response.status);
      console.log('channels', this.users);
      console.log('complete content', response.body);
      console.log('X-Custom-Header', response.headers.get('X-Custom-Header'));
    }, (error) => {
      console.log('error', error);
    });
  }
  ngOnInit() {
  }

  openChat(item: any) {
    localStorage.setItem('chatUsername', JSON.stringify(item));
    console.log('sending item: ', item);
    this.router.navigate(['admin-chat']);
  }
}
