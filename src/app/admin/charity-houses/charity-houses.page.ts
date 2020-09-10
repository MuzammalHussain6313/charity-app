import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {HttpClient} from '@angular/common/http';
import {ListService} from '../../list.service';
import {Observable} from 'rxjs';
import {LoadingController, ToastController} from '@ionic/angular';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-charity-houses',
  templateUrl: './charity-houses.page.html',
  styleUrls: ['./charity-houses.page.scss'],
})
export class CharityHousesPage implements OnInit {

  constructor(private readonly loadingCtrl: LoadingController,
              private readonly toastCtrl: ToastController,
              private alertController: AlertController,
              public router: Router,
              public http: HttpClient,
              private service: ListService) { }
  result: any = [];
  data: Observable<any>;
  t;
  loading;
  loadData() {
    this.result = JSON.parse(localStorage.getItem('charity houses'));
  }

  ngOnInit(): void {
    this.loadCharityHouses();
    console.log('result' + this.result);
  }

  async loadCharityHouses() {
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    this.loading.present();
    this.http.get(this.service.homeUrl + '/charityHouses/list', {observe: 'response'}).subscribe(response => {
      if (response.status === 200 || response.status === 201) {
        this.t = response.body;
        console.log('data loading from API');
        this.result = this.t.content;
        this.loading.dismiss();
        localStorage.removeItem('charity Houses');
        localStorage.setItem('charity Houses', JSON.stringify(this.t.content));
        console.log('data : ', this.t.content);
      }
      console.log('status code', response.status);
      console.log('complete content', response.body);
      console.log('X-Custom-Header', response.headers.get('X-Custom-Header'));
    }, (error) => {
      console.log('data loading from loadData function.');
      this.loadData();
      console.log('error', error);
    });
  }
  showSingleItem(item: any) {
    const url = `show-single-charity-house/${item}`;
    this.router.navigateByUrl(url);
  }

  updateItem(id: any) {
    const url = `update-charity-house/${id}`;
    this.router.navigateByUrl(url);
  }

  deleteCharityHouse(item: any) {
    console.log('id ' + item);
    this.presentAlertConfirm();
    this.router.navigate(['tabs/charity-houses']);
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>can\'t deleted.Please! contact with supper admin using hmuzammal015@gmail.com</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Request Sent for deletion.');
          }
        }
      ]
    });
    await alert.present();
  }
}
