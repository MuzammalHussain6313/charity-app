import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ListService} from '../../list.service';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.page.html',
  styleUrls: ['./admin-chat.page.scss'],
})
export class AdminChatPage implements OnInit {
  messages = [];
  recivedData = [];
  currentUser; user;
  channel;
  username;
  newMsg: '';
  // @ts-ignore

  a;
  b;
  c;

  @ViewChild(IonContent) content: IonContent;
  constructor(public route: ActivatedRoute,
              public http: HttpClient,
              private service: ListService,
              public db: AngularFireDatabase) {
    this.optionAUpload();
    this.optionBUpload();
    this.optionCUpload();
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
    this.username = JSON.parse(localStorage.getItem('chatUsername'));
    this.channel = this.username + '-admin';
    this.user = JSON.parse(localStorage.getItem('user'));
    this.currentUser = this.user.user_name.toLowerCase(); // + ' ' + this.user.last_name.toLowerCase();
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
      question: 'xyz',
      correct_answer: 'asdfghj',
      A: this.a,
      B: this.b,
      C: this.c
    });
    this.newMsg = '';
    setTimeout(() => {
      this.content.scrollToBottom(10);
    });
  }


  optionAUpload() {
    this.a = 'https://meet.google.com/cza-dgzw-wyp';
  }

  optionBUpload() {
    this.b = 'https://meet.google.com/hamza';
  }

  optionCUpload() {
    // upload picture
    // store url in globle variable
    this.c = 'https://meet.google.com/muzammal-hussain';
  }
}
