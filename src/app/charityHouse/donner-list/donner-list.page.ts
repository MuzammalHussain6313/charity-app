import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PopoverController} from '@ionic/angular';
import {ReviewComponent} from './review/review.component';
import {Storage} from '@ionic/storage';
import {ListService} from '../../list.service';
import {LoadingController, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-donner-list',
    templateUrl: './donner-list.page.html',
    styleUrls: ['./donner-list.page.scss'],
})
export class DonnerListPage implements OnInit {
    donnerList;

    constructor(public router: Router,
                public popoverController: PopoverController,
                private storage: Storage,
                private service: ListService,
                public http: HttpClient,
                private readonly loadingCtrl: LoadingController,
                private readonly toastCtrl: ToastController) {
    }

    result: any = [];
    data: Observable<any>;
    itration = [1, 2, 3, 4];
    loading;
    ngOnInit() {
        this.loadDonnerList();
    }

    async loadDonnerList() {
        this.loading = await this.loadingCtrl.create({
            message: 'Loading data...'
        });
        this.loading.present();
        this.http.get(`${this.service.homeUrl}/donners/list`,
            {observe: 'response'}).subscribe(response => {
            if (response.status === 200 || response.status === 201) {
                this.donnerList = response.body;
                console.log('data loading from API');
                this.result = this.donnerList.content;
                this.loading.dismiss();
                localStorage.removeItem('donners');
                localStorage.setItem('donners', JSON.stringify(this.result));
                console.log('donnerList : ', this.donnerList.content);
            }
            console.log('status code', response.status);
            console.log('complete content', response.body);
            console.log('X-Custom-Header', response.headers.get('X-Custom-Header'));
        }, (error) => {
            console.log('data loading from loadData function.');
            this.loadData();
            console.log('error', error);
        });
        console.log('result' + this.result);
    }
    loadData() {
        this.result = JSON.parse(localStorage.getItem('donners'));
    }

    async review(myEvent, item: any) {
        const review = await this.popoverController.create({
            component: ReviewComponent,
            componentProps: {id: item.id}
        });
        return await review.present();
    }

    feedBack(item: any) {
        this.router.navigate(['feedback', item]);
    }

    openChat(first: string, last: string) {
        localStorage.setItem('donnerName', JSON.stringify(first.toLowerCase() + '-' + last.toLowerCase()));
        this.router.navigate(['charity-house-chat']);
    }

    sendReport(item: any) {
        this.router.navigate(['send-report', item]);
    }
}
