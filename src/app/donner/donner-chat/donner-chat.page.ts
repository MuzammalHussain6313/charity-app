import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {IonContent} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {ListService} from '../../list.service';

@Component({
  selector: 'app-donner-chat',
  templateUrl: './donner-chat.page.html',
  styleUrls: ['./donner-chat.page.scss'],
})
export class DonnerChatPage implements OnInit {

  messages = [];
  recivedData = [];
  currentUser; user;
  channel;
  channelName;
  newMsg: '';
  objectOfChannel;
  // charityHouse;
  // @ts-ignore
  @ViewChild(IonContent) content: IonContent;
  constructor(public route: ActivatedRoute,
              public http: HttpClient,
              private service: ListService,
              public db: AngularFireDatabase) {
    this.loadchannelName();
    console.log('channel Name', this.channel);
    this.db.list(`/channels/${this.channel}`).valueChanges().subscribe( data => {
      console.log('data', data);
      this.recivedData = data;
      this.messages = data;
      // this.messages = this.recivedData.filter(x => x.channelName === this.channel);
      console.log('messages after filter', this.messages);
    });
  }
  ngOnInit() {
  }

  loadchannelName() {
    this.channel = JSON.parse(localStorage.getItem('channelName'));
    this.user = JSON.parse(localStorage.getItem('user'));
    this.currentUser = this.user.user.user_name.toLowerCase(); // + ' ' + this.user.user.last_name.toLowerCase();
    console.log('current user', this.currentUser);
  }
  sendMessage() {
    const url = `${this.service.homeUrl}/channels/exist-or-not/${this.channel}`;
    this.http.post(url, 1).subscribe(
        data => {
          console.log('I got this response -> ', data);
        },
        error => {
          console.log('error', error);
        });
    this.db.list(`/channels/${this.channel}`).push({
      sender: this.currentUser,
      message: this.newMsg,
      createdAt: new Date().getTime(),
    });
    this.newMsg = '';
    setTimeout(() => {
      this.content.scrollToBottom(10);
    });
  }
}
