import {Component, OnInit, ViewChild} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {ActivatedRoute} from '@angular/router';
import {IonContent} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {ListService} from '../../list.service';
import {LoadingController, ToastController} from '@ionic/angular';

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
    loading;
    constructor(public route: ActivatedRoute,
                public http: HttpClient,
                private service: ListService,
                public db: AngularFireDatabase,
                private readonly loadingCtrl: LoadingController,
                private readonly toastCtrl: ToastController) {
        this.loadchannelName();
        console.log('channel Name', this.channel);
        this.loadMessage();
    }

    async loadMessage(){
        this.loading = await this.loadingCtrl.create({
            message: 'Loading...'
        });
        this.loading.present();
        this.db.list(`/channels/${this.channel}`).valueChanges().subscribe(data => {
            console.log('data', data);
            this.recivedData = data;
            this.messages = data;
            this.loading.dismiss();
        });
    }
    ngOnInit() {
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

    async sendMessage() {
        this.loading = await this.loadingCtrl.create({
            message: 'Sending...'
        });
        this.loading.present();
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
        this.loading.dismiss();
        this.newMsg = '';
        setTimeout(() => {
            this.content.scrollToBottom(10);
        });
    }
}
