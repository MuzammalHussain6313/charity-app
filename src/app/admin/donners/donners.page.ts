import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {HttpClient} from '@angular/common/http';
import {ListService} from '../../list.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-donners',
  templateUrl: './donners.page.html',
  styleUrls: ['./donners.page.scss'],
})
export class DonnersPage implements OnInit {

  constructor(public router: Router,
              private storage: Storage,
              public http: HttpClient,
              private alertController: AlertController,
              private service: ListService) {
  }

  t;
  result: any = [];
  data: Observable<any>;
  listActive = true;
  updateActive = false;

  ngOnInit(): void {
    const url = this.service.homeUrl + '/donners/list';
    this.http.get(url, {observe: 'response'}).subscribe(response => {
      if (response.status === 200 || response.status === 201) {
        this.t = response.body;
        console.log('data loading from API');
        this.result = this.t.content;
        localStorage.removeItem('donners');
        localStorage.setItem('donners', JSON.stringify(this.t.content));
        console.log('data : ', this.t.content);
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
  }
  loadData() {
    this.result = JSON.parse(localStorage.getItem('donners'));
  }

  showSingleItem(item: any) {
    const url = `detail/${item}`;
    this.router.navigateByUrl(url);
  }

  updateItem(id: any) {
    // this.listActive = false;
    // this.updateActive = true;
    const url = `update/${id}`;
    this.router.navigateByUrl(url);
  }

  deleteDonner(item: any) {
    console.log('id ' + item);
    // this.callAPI(item).subscribe(
    //     data => {
    //       console.log('I got this response -> ', data);
    //       // this.router.navigate(['donners']);
    //     },
    //     error => {
    //       console.log('error', error);
    //     }
    // );
    // alert('can\'t deleted. Please! contact with supper admin using hmuzammal015@gmail.com');
    this.presentAlertConfirm();
    this.router.navigate(['tabs/donners']);
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
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }
  callAPI(studentId): Observable<any> {
    // delete code added and working correctly.
    console.log('data received.', studentId);
    const url = `${this.service.homeUrl}/donners/deleteDonner/${studentId}`;
    console.log('link', url);
    return this.http.delete(url);
  }
}
