import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {ListService} from '../../list.service';
import {LoadingController, ToastController} from '@ionic/angular';
@Component({
    selector: 'app-update',
    templateUrl: './update.page.html',
    styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

    public signupForm;

    constructor(private readonly loadingCtrl: LoadingController,
                private readonly toastCtrl: ToastController,
                private route: ActivatedRoute,
                private http: HttpClient,
                private router: Router,
                private service: ListService,
                private formBuilder: FormBuilder) {
    }

    user;
    childUser;
    donner;
    loading;
    data: Observable<any>;

    ngOnInit() {
        this.loadDonner();
        this.formInitializer();
    }

    async loadDonner() {
        this.loading = await this.loadingCtrl.create({
            message: 'Please wait...'
        });

        this.loading.present();
        this.route.paramMap.subscribe(paramMap => {
            const val = paramMap.get('id');
            console.log('id', val);
            const url = `${this.service.homeUrl}/donners/findById/${val}`;
            console.log('url', url);
            this.data = this.http.get(url);
            console.log('data', this.data);
            this.data.subscribe(data => {
                this.user = data;
                this.loading.dismiss();
                console.log('user', this.user);
            });
            console.log(this.user);
        });
    }
    formInitializer() {
        console.log('formInitializer', this.user);
        this.signupForm = this.formBuilder.group({
            id: [null, [Validators.required]],
            first_name: [null, [Validators.required]],
            last_name: [null, [Validators.required]],
            email: [null, [Validators.required]],
            user_name: [null, [Validators.required]],
            password: [null, [Validators.required]],
            role: [null, [Validators.required]],
            address: [null, [Validators.required]],
            contact: [null, [Validators.required]]
        });
    }

    generateUser() {
        const data = this.signupForm.value;
        this.childUser = '"user" : {"id" : "' + this.user.user.id +
            '" , \n"first_name" : "' + data.first_name +
            '" , \n"last_name" : "' + data.last_name +
            '" , \n"email" : "' + data.email +
            '" , \n"user_name" : "' + data.user_name +
            '" , \n"password" : "' + data.password +
            '" , \n"role"  : "' + data.role + '"}';
        this.donner = '{"id" : "' + data.id +
            '", \n"address" : "' + data.address +
            '", \n"contact" : "' + data.contact +
            '", \n' + this.childUser + ' }';
        console.log('data before parsing', this.donner);
        const completeDonner = JSON.parse(this.donner);
        console.log('complete Donner', completeDonner);
        return completeDonner;
    }

    updateData() {
        if (this.signupForm.valid) {
            console.log('formData', this.signupForm.value);

            const formData = this.signupForm.value;
            console.log('data', this.generateUser());
            this.saveHttpReq(this.generateUser()).subscribe(
                data => {
                    console.log('I got this response -> ', data);
                    this.router.navigate(['tabs/donners']);
                    alert('user updated successfully');
                },
                error => {
                    console.log('error', error);
                }
            );
        }
    }

    saveHttpReq(dataObj): Observable<any> {
        const url = `${this.service.homeUrl}/donners/updateDonner`;
        console.log('link', url);
        return this.http.put(url, dataObj);
    }
}
