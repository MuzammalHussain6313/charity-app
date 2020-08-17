import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {HttpClient} from '@angular/common/http';
import {ListService} from '../../list.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-charity-houses',
  templateUrl: './charity-houses.page.html',
  styleUrls: ['./charity-houses.page.scss'],
})
export class CharityHousesPage implements OnInit {

  constructor(public router: Router,
              public http: HttpClient,
              private service: ListService) { }
  result: any = [];
  data: Observable<any>;
  t;
  loadData() {
    this.result = JSON.parse(localStorage.getItem('charity houses'));
  }

  ngOnInit(): void {
    const url = this.service.homeUrl + '/charityHouses/list';
    this.http.get(url, {observe: 'response'}).subscribe(response => {
      if (response.status === 200 || response.status === 201) {
        this.t = response.body;
        console.log('data loading from API');
        this.result = this.t.content;
        localStorage.removeItem('charity Houses');
        localStorage.setItem('charity Houses', JSON.stringify(this.t.content));
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
    // this.data = this.http.get('http://localhost:8095/users/list');
    // this.data.subscribe(data => {
    //   // if (data.status === 200) {
    //   console.log('code', data.status);
    //   console.log('data', this.data);
    //   this.result = data.content;
    // //   this.storage.set('users', this.result);
    //   // } else {
    //   //   this.loadData();
    //   // }
    //  });
    // // if (!this.result) {
    // //   this.loadData();
    // // } else if (this.result) {
    // //   this.storage.set('users', this.result);
    // // }
    // this.loadData();
    console.log('result' + this.result);
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
    // this.callAPI(item).subscribe(
    //     data => {
    //       console.log('I got this response -> ', data);
    //       // this.router.navigate(['donners']);
    //     },
    //     error => {
    //       console.log('error', error);
    //     }
    // );
    alert('can\'t deleted. Please! contact with supper admin using hmuzammal015@gmail.com');
    this.router.navigate(['tabs/charity-houses']);
  }
}
