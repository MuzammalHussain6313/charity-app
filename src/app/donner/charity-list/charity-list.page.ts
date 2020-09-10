import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListService} from '../../list.service';
import {Storage} from '@ionic/storage';
import {LoadingController, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-charity-list',
    templateUrl: './charity-list.page.html',
    styleUrls: ['./charity-list.page.scss'],
})
export class CharityListPage implements OnInit {
    loading: any;
    charityList;

    constructor(private readonly loadingCtrl: LoadingController,
                private readonly toastCtrl: ToastController,
                public router: Router,
                private storage: Storage,
                private service: ListService,
                public http: HttpClient) {
      this.loadFromAPi();
    }

    result: any = [];
    data: Observable<any>;

    ngOnInit() {
        this.loadData();
    }

    async loadFromAPi(){
      this.loading = await this.loadingCtrl.create({
        message: 'Please Wait...'
      });
      this.loading.present();
      this.http.get(`${this.service.homeUrl}/charityHouses/list`,
          {observe: 'response'}).subscribe(response => {
        if (response.status === 200 || response.status === 201) {
          this.charityList = response.body;
          console.log('data loading from API');
          this.result = this.charityList.content;
          this.loading.dismiss();
          localStorage.removeItem('charityHouses');
          localStorage.setItem('charityHouses', JSON.stringify(this.result));
          console.log('charityList : ', this.charityList.content);
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
        this.result = JSON.parse(localStorage.getItem('charityHouses'));
    }

    donateFund(item) {
        this.router.navigate(['donate-fund', item]);
    }

    donateFood(item) {
        this.router.navigate(['donate-food', item]);
    }
}
