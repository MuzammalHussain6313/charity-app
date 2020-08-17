import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ListService} from '../../list.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  updateForm;
  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router,
              private service: ListService,
              private formBuilder: FormBuilder) { }

  user;
  childUser;
  donner;
  data: Observable<any>;
  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const val = paramMap.get('id');
      console.log('id', val);
      const url = `${this.service.homeUrl}/users/getUser/${val}`;
      console.log('url', url);
      this.data = this.http.get(url);
      console.log('data', this.data);
      this.data.subscribe(data => {
        this.user = data;
        console.log('user', this.user);
      });
      console.log(this.user);
    });
    this.formInitializer();
  }

  formInitializer() {
    console.log('formInitializer', this.user);
    this.updateForm = this.formBuilder.group({
      id: [null, [Validators.required]],
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      user_name: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  generateUser() {
    const data = this.updateForm.value;
    this.childUser = '{ "id" : "' + this.user.id +
        '" , \n"first_name" : "' + data.first_name +
        '" , \n"last_name" : "' + data.last_name +
        '" , \n"email" : "' + data.email +
        '" , \n"user_name" : "' + data.user_name +
        '" , \n"password" : "' + data.password +
        '" , \n"applicationStatus" : "' + this.user.applicationStatus +
        '" , \n"role" : "' + this.user.role + '"}';
    console.log('data before parsing', this.childUser);
    const completeUser = JSON.parse(this.childUser);
    console.log('complete Donner', completeUser);
    return completeUser;
  }

  updateData() {
    if (this.updateForm.valid) {
      console.log('formData', this.updateForm.value);

      const formData = this.updateForm.value;
      console.log('data', this.generateUser());
      this.saveHttpReq(this.generateUser()).subscribe(
          data => {
            console.log('I got this response -> ', data);
            const url = `/admin-profile/${this.user.id}`;
            this.router.navigateByUrl(url);
            alert('user updated successfully');
          },
          error => {
            console.log('error', error);
          }
      );
    }
  }

  saveHttpReq(dataObj): Observable<any> {
    const url = `${this.service.homeUrl}/users/updateUser`;
    console.log('link', url);
    return this.http.put(url, dataObj);
  }

}
