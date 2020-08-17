import {Component} from '@angular/core';
import {ListService} from '../list.service';
import {Router} from '@angular/router';
import {Platform} from '@ionic/angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';

// import { StatusBar} from '@ionic-native/status-bar';
// import { SplashScreen} from '@ionic-native/splash-screen';

import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(private push: Push,
                private platform: Platform,
                private splashScreen: SplashScreen,
                private statusBar: StatusBar,
                private service: ListService,
                private router: Router) {
        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
            this.pushSetup();
        });
    }

    data;

    clickSub: any;

    loadService() {
        this.data = this.service.getUser();
        console.log('data', this.data);
    }

    openPage() {
        this.router.navigate(['profile-picture']);
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
}
