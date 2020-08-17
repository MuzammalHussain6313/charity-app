import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ListService} from '../../list.service';

@Component({
  selector: 'app-update-charity-house',
  templateUrl: './update-charity-house.page.html',
  styleUrls: ['./update-charity-house.page.scss'],
})
export class UpdateCharityHousePage implements OnInit {

  constructor(private router: Router,
              private http: HttpClient,
              private service: ListService,
              private formBuilder: FormBuilder) { }
  userForm: FormGroup;
  charityForm: FormGroup;
  addressForm: FormGroup;
  ngOnInit() {
  }
  userFormInitializer() {
    const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.userForm = this.formBuilder.group({
      first_name: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3), Validators.maxLength(20)]],
      last_name: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.pattern(EMAILPATTERN)]],
      user_name: [null, [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9]+$')]],
      role: [null, [Validators.required]],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
    });
  }
  charityFormInitializer() {
    const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    // this.date = this.today.getFullYear() + '-' + (this.today.getMonth() + 1 ) + '-' + this.today.getDate();
    // console.log('current date', this.date);
    this.charityForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: [null, [Validators.required, Validators.pattern(EMAILPATTERN)]],
      no_of_dependents: [null, [Validators.required, Validators.pattern('[0-9]*')]],
      contact: [null, [Validators.required, Validators.pattern('[0-9]*')]],
      type: [null, [Validators.required]],
      bank_name: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      account_no: [null, [Validators.required, Validators.pattern('[0-9]*')]]
    });
  }
  addressFormInitializer() {
    this.addressForm = this.formBuilder.group({
      streetAddress: [null, [Validators.required]],
      city: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      zipCode: [null, [Validators.required, Validators.pattern('[0-9]*')]],
      state: [null, [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      country: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]]
    });
  }
}
