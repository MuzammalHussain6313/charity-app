import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ListService} from '../../list.service';
import {LoadingController, ToastController} from '@ionic/angular';

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
  loading;
  constructor(private readonly loadingCtrl: LoadingController,
              private readonly toastCtrl: ToastController,
              public db: AngularFireDatabase,
              public router: Router,
              public http: HttpClient,
              private service: ListService) {
    this.loadMessages();
  }
  ngOnInit() {
  }

  async loadMessages() {
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });

    this.loading.present();
    this.http.get(`${this.service.homeUrl}/channels/conversation-user-list`,
        {observe: 'response'}).subscribe(response => {
      if (response.status === 200 || response.status === 201) {
        this.recivedData = response.body;
        this.users = this.recivedData;
        this.loading.dismiss();
      }
      console.log('status code', response.status);
      console.log('channels', this.users);
      console.log('complete content', response.body);
      console.log('X-Custom-Header', response.headers.get('X-Custom-Header'));
    }, (error) => {
      console.log('error', error);
    });
  }

  openChat(item: any) {
    localStorage.setItem('chatUsername', JSON.stringify(item));
    console.log('sending item: ', item);
    this.router.navigate(['admin-chat']);
  }
}
