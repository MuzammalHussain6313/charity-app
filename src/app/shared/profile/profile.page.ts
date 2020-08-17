import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {ListService} from '../../list.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public router: Router,
              private storage: Storage,
              private service: ListService,
              public http: HttpClient) { }

  result: any = [];
  reviewsList: any = [];
  temp: boolean;
  user: any;
  close = true;
  open = false;
  role: any;
  admin: boolean;
  donner: boolean;
  isEmpty = false;
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    const id = this.user.id;
    this.http.get(`${this.service.homeUrl}/reviews/findByDonner/${id}`,
        {observe: 'response'}).subscribe(response => {
      if (response.status === 200 || response.status === 201) {
        this.reviewsList = response.body;
        console.log('data loading from API');
        this.result = this.reviewsList.content;
        if (this.result.length === 0) {
          this.isEmpty = true;
        }
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
    this.loadUser();
  }
  expandCLick() {
    this.temp = this.close;
    this.close = this.open;
    this.open = this.temp;
  }
  loadUser() {
    this.role = localStorage.getItem('role');
    console.log('role', this.role);
    if (this.role === 'donner') {
      this.donner = true;
    }
    if (this.role === 'admin') {
     this.admin = true;
    }
  }
}
