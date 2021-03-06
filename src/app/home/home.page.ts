import {Component} from '@angular/core';
import {ListService} from '../list.service';
import {Router} from '@angular/router';
import {AlertController, Platform} from '@ionic/angular';
import {Push, PushObject, PushOptions} from '@ionic-native/push/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {Observable} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(private push: Push,
                private http: HttpClient,
                private platform: Platform,
                private splashScreen: SplashScreen,
                private statusBar: StatusBar,
                private service: ListService,
                private router: Router) {
        platform.ready().then(() => {
            // this.localNotifications.on('click').subscribe(res => {
            //     console.log('click', res);
            //     const msg = res.data ? res.data.mydata : '';
            //     this.showAlert(res.title, res.text, msg);
            // });
            //
            // this.localNotifications.on('trigger').subscribe(res => {
            //     console.log('trigger', res);
            //     const msg = res.data ? res.data.mydata : '';
            //     this.showAlert(res.title, res.text, msg);
            // });
            statusBar.styleDefault();
            splashScreen.hide();
            this.pushSetup();
        });
    }

    data;
    clickSub: any;
    private isAndroid: true;
    jsonData
    labels;
    test;
    loadLabels() {
        this.jsonData = JSON.parse(localStorage.getItem('labels'));
        alert(this.jsonData);
        if (this.jsonData) {
            this.labels = this.jsonData?.tags;
        }
    }

    loadService() {
        this.data = this.service.getUser();
        console.log('data', this.data);
    }

    openPage() {
        this.router.navigate(['upload-image']);
    }

    private pushSetup() {
        const options: PushOptions = {
            android: {
                senderID: '929354685211'
            },
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false'
            }
        }

        const pushObject: PushObject = this.push.init(options);
        pushObject.on('notification').subscribe((notification: any) => console
            .log('Received a notification', notification));

        pushObject.on('registration').subscribe((registration: any) => console
            .log('Device registered', registration));

        pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    }

    showNotification1() {
        // this.localNotifications.schedule({
        //     id: 1,
        //     title: 'title',
        //     text: 'Single ILocalNotification',
        //     data: {mydata: 'notification ata'},
        //     trigger: {at: new Date(new Date().getTime() + 3600)},
        //     // foreground: true
        // });
    }

    showNotification() {
        // this.localNotification.requestPermission().then(
        //     (permission) => {
        //         if (permission === 'granted') {
        //
        //             // Create the notification
        //             this.localNotification.create('My Title', {
        //                 tag: 'message1',
        //                 body: 'My body',
        //                 icon: 'assets/icon/favicon.png'
        //             });
        //
        //         }
        //     }
        // );
    }

    private showAlert(header: any, sub: any, msg: string) {
    }

    testRequest() {
        this.saveHttpReq('data').subscribe(data => {
            this.labels = data;
            console.log(this.labels);
            // console.log('data.result', data.result);
            // console.log('data.result', data.result.tags);
            // this.labels = data.result.tags;
        });
    }

    saveHttpReq(dataObj): Observable<any>{
        console.log('received data ', dataObj);
        const url = `${this.service.homeUrl}/testUpload`;
        console.log('url', url);
        const formData = new FormData();
        formData.append('file', 'Data sending');
        const test = this.http.post(url, formData);
        return test;
    }
}
