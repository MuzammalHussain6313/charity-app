import {Component, OnInit, ViewChild} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {ActivatedRoute} from '@angular/router';
import {IonContent} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {ListService} from '../../list.service';

@Component({
    selector: 'app-charity-house-chat',
    templateUrl: './charity-house-chat.page.html',
    styleUrls: ['./charity-house-chat.page.scss'],
})
export class CharityHouseChatPage implements OnInit {
    messages = [];
    recivedData = [];
    currentUser;
    user;
    channel;
    newMsg: '';
    objectOfChannel;
    channelName;
    // donner;
    // donnerName;
    // @ts-ignore
    @ViewChild(IonContent) content: IonContent;

    constructor(public route: ActivatedRoute,
                public http: HttpClient,
                private service: ListService,
                public db: AngularFireDatabase) {
        this.loadchannelName();
        console.log('channel Name', this.channel);
        this.db.list(`/channels/${this.channel}`).valueChanges().subscribe(data => {
            console.log('data', data);
            this.recivedData = data;
            this.messages = data;
            // this.messages;
            // this.messages = this.recivedData.filter(x => x.channelName === this.channel);
            console.log('messages after filter', this.messages);
        });
    }

    ngOnInit() {
        // this.http.get(`${this.service.homeUrl}/channels/getByName/${this.channel}`,
        //     {observe: 'response'}).subscribe(response => {
        //   if (response.status === 200 || response.status === 201) {
        //     this.objectOfChannel = response.body;
        //   }
        //   console.log('channelName', this.channelName);
        //   console.log('status code', response.status);
        //   console.log('complete content', this.objectOfChannel);
        //   console.log('X-Custom-Header', response.headers.get('X-Custom-Header'));
        // }, (error) => {
        //   console.log('error', error);
        // });
        // if (this.objectOfChannel == null) {
        //   const channelObject = '{"name": "' + this.channel + '" }';
        //   const readyToSend = JSON.parse(channelObject);
        //   console.log('channel to send', readyToSend);
        //   const url = `${this.service.homeUrl}/channels/add`;
        //   console.log('url', url);
        //   this.http.post(url, readyToSend).subscribe(
        //       data => {
        //         console.log('I got this response -> ', data);
        //       },
        //       error => {
        //         console.log('error', error);
        //       }
        //   );
        // }
    }

    loadchannelName() {
        const donner = JSON.parse(localStorage.getItem('donnerName'));
        this.user = JSON.parse(localStorage.getItem('user'));
        // this.currentUser = this.user.user.first_name.toLowerCase() + ' ' + this.user.user.last_name.toLowerCase();
        this.currentUser = this.user.user.user_name.toLowerCase(); // + ' ' + this.user.user.last_name.toLowerCase();
        this.channel = donner + '-' + this.user.user.first_name.toLowerCase() + '-' + this.user.user.last_name.toLowerCase();
        console.log('current user', this.currentUser);
        console.log('channel', this.channel);
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
            createdAt: new Date().getTime()
        });
        this.newMsg = '';
        setTimeout(() => {
            this.content.scrollToBottom(10);
        });
    }
}
