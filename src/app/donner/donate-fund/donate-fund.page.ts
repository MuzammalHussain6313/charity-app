import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ListService} from '../../list.service';

@Component({
  selector: 'app-donate-fund',
  templateUrl: './donate-fund.page.html',
  styleUrls: ['./donate-fund.page.scss'],
})
export class DonateFundPage implements OnInit {
  donateForm: FormGroup;
  today = new Date();
  date;
  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private service: ListService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }
  data: Observable<any>;
  charityHouse;
  finalFundObject;
  currencies: string [] = ['PKR', 'Dollar', 'rayal', 'denaar'];
  ngOnInit() {
    this.formInitializer();
    this.route.paramMap.subscribe(paramMap => {
      console.log('charity-house', paramMap);
      this.charityHouse = paramMap.get('id');
    });
    // this.route.paramMap.subscribe(paramMap => {
    // const val = paramMap.get('id');
      // console.log('id', val);
      // const url  = `http://localhost:8095/charityHouses/getCharityHouse/${val}`;
      // this.data =  this.http.get(url);
      // console.log(this.data);
      // this.data.subscribe(data => {
      //   this.charityHouse = data;
      //   console.log(this.charityHouse);
      // });
      // console.log(this.charityHouse);
    // });
  }

  formInitializer() {
    this.date = this.today.getFullYear() + '-' + (this.today.getMonth() + 1 ) + '-' + this.today.getDate();
    // console.log('current date', this.date);
    this.donateForm = this.formBuilder.group({
      amount: [null, [Validators.required]],
      currency: [null, [Validators.required]],
      donner_card: [null, [Validators.required]],
      card_expiry_date: [null, [Validators.required]],
    });
  }

  donateFund() {
    const test = this.donateForm.value;
    const dateFormat = test.card_expiry_date.split('T')[0];
    // This id will comes from the service, because when user will login, his ID will save to service
    // and retrieved at time of send data to server.
    const donner = JSON.parse(localStorage.getItem('user'));
    const donnerID = donner.id;
    console.log('donner id ', donnerID);
    this.finalFundObject = '{"amount": "' + test.amount + '",' +
      '"currency": "' + test.currency + '",' +
        '"donnerCard": "' + test.donner_card + '",' +
        '"cardExpiryDate": "' + dateFormat + '",' +
        '"donation": { ' + '"date": "' + this.date + '",' +
        '"donner": { "id": ' + donnerID + '},' +
        '"charityHouse": { "id": ' + this.charityHouse + '}' + '}' + '}';
    console.log('full object', this.finalFundObject);
    const fundDonation = JSON.parse(this.finalFundObject);
    this.saveFoodDonation(fundDonation).subscribe(
        data => {
          console.log('I got this response -> ', data);
          this.router.navigate(['charityList']);
        },
        error => {
          console.log('error', error);
        }
    );
  }
  saveFoodDonation(dataObj): Observable<any> {
    console.log('data recieved for put. ', dataObj);
    const url = `${this.service.homeUrl}/fundDonations/newFundDonation`;
    return this.http.post(url, dataObj);
    alert('Your donation successfully sent to selected charity house. Thanks for donating fund.');
  }
}
