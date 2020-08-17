import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {ListService} from '../../list.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-feed-backs',
    templateUrl: './feed-backs.page.html',
    styleUrls: ['./feed-backs.page.scss'],
})
export class FeedBacksPage implements OnInit {

    constructor(public router: Router,
                private storage: Storage,
                private service: ListService,
                public http: HttpClient) {
    }

    result: any = [];
    reviewsList: any = [];
    data: Observable<any>;
    user: any;
    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
        const id = this.user.id;
        this.http.get(`${this.service.homeUrl}/feedbacks/findByDonner/${id}`,
            {observe: 'response'}).subscribe(response => {
            if (response.status === 200 || response.status === 201) {
                this.reviewsList = response.body;
                console.log('data loading from API');
                this.result = this.reviewsList.content;
                localStorage.removeItem('reviewsList');
                localStorage.setItem('reviewsList', JSON.stringify(this.result));
                console.log('reviewsList : ', this.reviewsList.content);
            }
            // You can access status:
            console.log('status code', response.status);
            console.log('complete content', response.body);
            // Or any other header:
            console.log('X-Custom-Header', response.headers.get('X-Custom-Header'));
        }, (error) => {
            console.log('data loading from loadData function.');
            console.log('error', error);
        });
        console.log('result' + this.result);
    }
}
