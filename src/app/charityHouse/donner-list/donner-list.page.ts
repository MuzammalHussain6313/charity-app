import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PopoverController} from '@ionic/angular';
import {ReviewComponent} from './review/review.component';
import {Storage} from '@ionic/storage';
import {ListService} from '../../list.service';

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
                public http: HttpClient) {
    }

    result: any = [];
    data: Observable<any>;
    itration = [1, 2, 3, 4];

    ngOnInit() {
        this.http.get(`${this.service.homeUrl}/donners/list`,
            {observe: 'response'}).subscribe(response => {
            if (response.status === 200 || response.status === 201) {
                this.donnerList = response.body;
                console.log('data loading from API');
                this.result = this.donnerList.content;
                localStorage.removeItem('donners');
                localStorage.setItem('donners', JSON.stringify(this.result));
                console.log('donnerList : ', this.donnerList.content);
            }
            // You can access status:
            console.log('status code', response.status);
            console.log('complete content', response.body);
            // Or any other header:
            console.log('X-Custom-Header', response.headers.get('X-Custom-Header'));
        }, (error) => {
            console.log('data loading from loadData function.');
            this.loadData();
            console.log('error', error);
        });
        console.log('result' + this.result);
        // this.data = this.http.get('http://localhost:8095/donners/list');
        // // this.loading = false;
        // console.log('data', this.data);
        // this.data.subscribe(data => {
        //   this.result = data.content;
        // });
        // console.log('result' + this.result);
    }

    loadData() {
        this.result = JSON.parse(localStorage.getItem('donners'));
        // this.storage.get('donners').then((val) => {
        //     this.result = val;
        //     console.log('Your data is', val);
        // });
    }

    async review(myEvent, item: any) {
        const review = await this.popoverController.create({
            component: ReviewComponent,
            componentProps: {id: item.id}
        });
        return await review.present();
    }

    feedBack(item: any) {
        // const url = `feedback/${item.id}`;
        this.router.navigate(['feedback', item]);
    }

    active($event: MouseEvent) {

    }

    openChat(first: string, last: string) {
        localStorage.setItem('donnerName', JSON.stringify(first.toLowerCase() + '-' + last.toLowerCase()));
        this.router.navigate(['charity-house-chat']);
    }

    sendReport(item: any) {
        this.router.navigate(['send-report', item]);
    }
}
