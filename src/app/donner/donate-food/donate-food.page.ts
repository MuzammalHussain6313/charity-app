import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {ListService} from '../../list.service';

@Component({
  selector: 'app-donate-food',
  templateUrl: './donate-food.page.html',
  styleUrls: ['./donate-food.page.scss'],
})
export class DonateFoodPage implements OnInit {
  private charityID;
  donateFoodForm: FormGroup;
  data: Observable<any>;
  units: string [] = ['grams', 'kilo grams', 'dozen', 'pieces'];
  charityHouse: any;
  today = new Date();
  date;
  finalDonationObject;
  dateTill;
  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private formBuilder: FormBuilder,
              private service: ListService,
              private router: Router) { }
  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      console.log('charity-house', paramMap);
      this.charityID = paramMap.get('id');
      console.log('id', this.charityID);
    });
    this.formInitializer();
    // this.today.setDate(this.today.getDate() + 3);
    this.dateTill = this.today.toISOString().substr(0, 10);
  }
  formInitializer() {
    this.donateFoodForm = this.formBuilder.group({
      name: [null, Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      expiry_date: [null, [Validators.required]],
      type: [null, [Validators.required]],
      quantity: [null, Validators.compose([Validators.pattern('[0-9 ]*'), Validators.required])],
      unit: [null, Validators.required]
    });
  }

  donateFood() {
    console.log('unit', this.donateFoodForm.value.unit);
    this.date = this.today.getFullYear() + '-' + (this.today.getMonth() + 1 ) + '-' + this.today.getDate();
    console.log('current date', this.date);
    const test = this.donateFoodForm.value;
    // const dateFromForm = test.expiry_date.getFullYear() + '-' + (test.expiry_date.getMonth() + 1 ) + '-' + test.expiry_date.getDate();
    const dateFormat = test.expiry_date.split('T')[0];
    console.log('date after conversion', dateFormat);
    console.log('form data', test);
    // This id will comes from the service, because when user will login, his ID will save to service
    // and retrieved at time of send data to server.
    const donner = JSON.parse(localStorage.getItem('user'));
    const donnerID = donner.id;
    console.log('donner id ', donnerID);
    this.finalDonationObject = '{"quantityValue" : "' + test.quantity + '",' +
        '"quantityUnit" : "' + test.unit + '",' +
        '"foodItem": {' +
        '"name": "' +  test.name + '",' +
        '"expiry_date": "' + dateFormat + '",' +
        '"type": "' + test.type + '" },' +
        '"donation": {' + '"date": "' + this.date + '",' +
        '"donner": {' + '"id": ' + donnerID + ' },' +
        '"charityHouse": {' + '"id": ' + this.charityID + ' }}}';
    console.log('full object', this.finalDonationObject);
    const foodDonation = JSON.parse(this.finalDonationObject);
    this.saveFoodDonation(foodDonation).subscribe(
        data => {
          console.log('I got this response -> ', data);
          this.router.navigate(['charityList']);
        },
        error => {
          console.log('error', error);
        }
    );
    // console.log('expiry date', test.expiry_date);
    // if (test.expiry_date < this.date) {
    //   alert('date is not valid');
    // }
    // if (test.expiry_date > this.date) {
    //   alert('date is valid');
    // }
    // console.log(this.donateFoodForm.value);
  }

  saveFoodDonation(dataObj): Observable<any> {
    // const url = 'http://test-node-api-test.herokuapp.com/students/newStudent'; // This link is working coorectly.
    console.log('data recieved for put. ', dataObj);
    const url = `${this.service.homeUrl}/foodDonationDetails/newFoodDonationDetails`;
    return this.http.post(url, dataObj);
    alert('Notification sent. Please! wait while charity house connect with you. Thanks for donating fund.');
  }
}
