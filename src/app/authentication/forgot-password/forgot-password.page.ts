import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ListService} from '../../list.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  forgotPasswordForm: FormGroup;
  passwordType = 'password';
  passwordIcon = 'eye-off';
  mailloading: boolean;
  emailVerification: boolean;
  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private formBuilder: FormBuilder,
              private service: ListService,
              private router: Router) { }

  ngOnInit() {
    this.formInitializer();
  }

  formInitializer() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  resetPassword() {
    if (this.forgotPasswordForm.valid) {
      const passwordData = this.forgotPasswordForm.value;
      this.sendRequest(passwordData).subscribe(d => {
            console.log('I got this response -> ', d);
            alert('password is successfully updated.');
            this.router.navigate(['']);
          },
          error => {
            alert(':( OOPS ! Server Error.');
            console.log('error', error);
          }
      );
    } else {
      return false;
    }
  }
  sendRequest(dataObj): Observable<any> {
    console.log('recieved data ', dataObj);
    const url = `${this.service.homeUrl}/users/updatePassword`;
    console.log('url', url);
    const test = this.http.post(url, dataObj);
    return test;
  }
  async checkEmail() {
    this.mailloading = true;
    const test = this.forgotPasswordForm.value;
    const item = test.email;
    console.log('test', test);
    console.log('email', item);
    if (item) {
      this.http.get(`${this.service.homeUrl}/users/email/${item}`,
          {observe: 'response'}).subscribe(response => {
        if (response.status === 200 || response.status === 201) {
          console.log('response', response);
          const tester = response.body;
          console.log('tester', tester.toString());
          if ( tester.toString() === 'true') {
            alert('Email does not exist. Try with another email!');
            // this.emailVerification = true;
            // this.mailloading = false;
          }
          this.mailloading = false;
          // this.donnerList = response.body;
          // console.log('content', this.donnerList);
          // this.results = this.donnerList.content;
        }
      }, (error) => {
        console.log('error.', error);
      });
      this.mailloading = false;
    }
    this.mailloading = false;
  }
}
