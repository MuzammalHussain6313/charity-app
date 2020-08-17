import {Component, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';
import {ListService} from './list.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    public selectedIndex = 0;
    // public appPages = [
    //   {
    //     title: 'Address',
    //     url: '/address',
    //     icon: 'mail'
    //   },
    //   {
    //     title: 'Forget password',
    //     url: '/forgot-password',
    //     icon: 'paper-plane'
    //   },
    //   {
    //     title: 'Login',
    //     url: '/login',
    //     icon: 'heart'
    //   },
    //   {
    //     title: 'Profile Picture',
    //     url: '/profile-picture',
    //     icon: 'archive'
    //   },
    //   {
    //     title: 'Trash',
    //     url: '/folder/Trash',
    //     icon: 'trash'
    //   },
    //   {
    //     title: 'Spam',
    //     url: '/folder/Spam',
    //     icon: 'warning'
    //   }
    // ];
    // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

    role: any;
    user: any;
    appPages = [];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private router: Router,
        private service: ListService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    ngOnInit() {
        this.service.currentMessage.subscribe(data => {
            console.log('role coming', data);
            if (data) {
                this.role = data;
                this.role = this.role.role;
                console.log('test', this.role);
                this.loadUserAndPages(this.role);
            }
        });
        const path = window.location.pathname.split('/')[1];
        if (path !== undefined) {
            this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
        }
    }

    loadUserAndPages(role: any) {
        this.appPages = JSON.parse(localStorage.getItem('appPages'));
        this.user = JSON.parse(localStorage.getItem('user'));
        console.log('user', this.user);
    }

    logOut() {
        alert('Are you sure to logout application.');
        localStorage.removeItem('role');
        localStorage.removeItem('appPages');
        localStorage.removeItem('user');
        this.router.navigate(['']);
    }

    addProfilePicture() {
        this.router.navigate(['profile-picture']);
    }
}
