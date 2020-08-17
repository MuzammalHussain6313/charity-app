import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ListService} from '../../list.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-show-single-charity-house',
  templateUrl: './show-single-charity-house.page.html',
  styleUrls: ['./show-single-charity-house.page.scss'],
})
export class ShowSingleCharityHousePage implements OnInit {
  constructor(private route: ActivatedRoute,
              private service: ListService,
              private http: HttpClient,
              private router: Router
  ) {
  }

  result: any = [];
  data: Observable<any>;
  user;

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const val = paramMap.get('id');
      const url  = `${this.service.homeUrl}/charityHouses/getCharityHouse/${val}`;
      this.data =  this.http.get(url);
      console.log(this.data);
      this.data.subscribe(data => {
        this.user = data;
        // this.result = this.user.content;
        console.log('user', this.user);
      });
      console.log(this.user);
    });
  }

  contactDealer(contactNumber: any) {
    alert('You can contactwith owner via ' + contactNumber + ' Number.');
  }
}
