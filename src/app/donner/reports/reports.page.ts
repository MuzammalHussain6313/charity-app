import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {ListService} from '../../list.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  constructor(public router: Router,
              private route: ActivatedRoute,
              private storage: Storage,
              private service: ListService,
              public http: HttpClient) {
  }
  user;
  donner: boolean;
  id;
  reportList: any = [];
  result: any = [];
  admin: boolean;
  data: Observable<any>;
  donnerID;
  isEmpty = false;
  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.donnerID = paramMap.get('id');
      console.log('id', this.donnerID);
    });
    console.log('id', this.donnerID);
    this.http.get(`${this.service.homeUrl}/reports/findByDonner/${this.donnerID}`,
        {observe: 'response'}).subscribe(response => {
      if (response.status === 200 || response.status === 201) {
        console.log('responce', response.body);
        this.reportList = response.body;
        console.log('data loading from API');
        this.result = this.reportList.content;
        console.log('length', this.result.length);
        if (this.result.length === 0) {
          this.isEmpty = true;
        }
        console.log('result', this.result);
        localStorage.removeItem('reportList');
        localStorage.setItem('reportList', JSON.stringify(this.result));
        console.log('reportList : ', this.reportList.content);
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
    this.loadData();
  }

  loadData() {
    // this.result = JSON.parse(localStorage.getItem('user'));
    this.user = localStorage.getItem('role');
    console.log('role', this.user);
    if (this.user === 'donner') {
      this.donner = true;
    }
    if (this.user === 'admin') {
      this.admin = true;
    }
    console.log('admin role', this.user);
    console.log('donner role', this.user);
  }

  expandCLick(item) {
    item.show = !item.show;
  }

  loadDonnerList() {
      if (this.admin) {
    this.router.navigate(['/tabs']);
  } else {
          this.router.navigate(['/profile']);
      }
  }
}
