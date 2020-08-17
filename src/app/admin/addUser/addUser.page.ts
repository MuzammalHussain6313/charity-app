import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {ListService} from '../../list.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-addUser',
  templateUrl: './addUser.page.html',
  styleUrls: ['./addUser.page.scss']
})
export class AddUserPage implements OnInit {
  signupForm: FormGroup;
  passwordType = 'password';
  passwordIcon = 'eye-off';
  constructor(
    private router: Router,
    private http: HttpClient,
    private service: ListService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.formInitializer();
  }
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  formInitializer() {
    this.signupForm = this.formBuilder.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      user_name: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirm_password: [null, [Validators.required]],
      role: [null, [Validators.required]],
    });
  }

  save() {
    if (this.signupForm.valid) {
      console.log('formData', this.signupForm.value);
      const formData = this.signupForm.value;
      alert(formData.role);
      console.log(formData.role);
      this.saveHttpReq(formData).subscribe(
        data => {
          console.log('I got this response -> ', data);
          this.router.navigate(['list']);
        },
        error => {
          console.log('error', error);
        }
      );
    }
  }

  saveHttpReq(dataObj): Observable<any> {
    // const url = 'http://test-node-api-test.herokuapp.com/students/newStudent'; // This link is working coorectly.
    console.log(dataObj);
    const url = `${this.service.homeUrl}/users/newUser`;
    return this.http.post(url, dataObj);
  }
}
