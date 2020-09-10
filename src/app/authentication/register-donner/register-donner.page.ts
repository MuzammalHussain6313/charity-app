import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListService} from '../../list.service';
import {LoadingController, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-register-donner',
    templateUrl: './register-donner.page.html',
    styleUrls: ['./register-donner.page.scss'],
})
export class RegisterDonnerPage implements OnInit {
    private JSONObject;
    registerDonnerForm: FormGroup;
    today = new Date();
    date;
    obj;
    user;
    donner;
    addressVerification = false;
    contactEmptyCheck = false;
    private loading;

    constructor(private route: ActivatedRoute,
                private http: HttpClient,
                private formBuilder: FormBuilder,
                private service: ListService,
                private router: Router,
                private readonly loadingCtrl: LoadingController,
                private readonly toastCtrl: ToastController) {
    }

    data: Observable<any>;
    charityHouse: any;
    submitted: any;

    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            this.obj = paramMap.get('first_name');
            console.log('reciving data', this.obj);
            this.user = '"user" : {"first_name" : "' + paramMap.get('first_name') +
                '" , "last_name" : "' + paramMap.get('last_name') +
                '" , "email" : "' + paramMap.get('email') +
                '" , "user_name" : "' + paramMap.get('user_name') +
                '" , "password" : "' + paramMap.get('password') +
                '" , "role"  : "' + paramMap.get('role') + '"}';
        });
        this.formInitializer();
    }

    formInitializer() {
        this.registerDonnerForm = this.formBuilder.group({
            address: [null, [Validators.required]],
            contact: [null, [Validators.required, Validators.pattern('[0-9 ]*')]]
        });
    }

    get registerDonnerFormControl() {
        return this.registerDonnerForm.controls;
    }

    async registerUser() {
        console.log('form Data', this.registerDonnerForm.value);
        const formData = this.registerDonnerForm.value;
        this.donner = '{"address" : "' + formData.address +
            '", \n"contact" : "' + formData.contact +
            '", \n' + this.user + ' }';
        console.log('data before parsing', this.donner);
        const completeDonner = JSON.parse(this.donner);
        console.log('complete Donner', completeDonner);
        if (this.registerDonnerForm.valid) {
            this.loading = await this.loadingCtrl.create({
                message: 'Please wait...'
            });
            this.loading.present();
            this.saveHttpReq(completeDonner).subscribe(
                data => {
                    alert('Please! check your email and verify your account.');
                    console.log('I got this response -> ', data);
                    this.loading.dismiss();
                    this.router.navigate(['login']);
                },
                error => {
                    console.log('error', error);
                }
            );
        }
    }

    saveHttpReq(dataObj): Observable<any> {
        console.log('recieved data ', dataObj);
        const url = `${this.service.homeUrl}/donners/newDonner`;
        const test = this.http.post(url, dataObj);
        this.loading = false;
        return test;
    }

    onFoucusOut() {
        const test = this.registerDonnerForm.value;
        const item = test.address;
        console.log('test', test);
        console.log('address', item);
        const str = '  ';
        if (!str.replace(/\s/g, '').length) {
            // alert('str contains spaces.');
        }
        if (item === '' || item == null) {
            this.addressVerification = true;
        }
    }

    removeError() {
        this.addressVerification = false;
    }

    onFoucusOutContact() {
        const test = this.registerDonnerForm.value;
        const item = test.contact;
        console.log('test', test);
        console.log('contact', item);
        const str = '    ';
        if (!str.replace(/\s/g, '').length) {
            // alert('str contains spaces.');
        }
        if (item === '' || item == null) {
            this.contactEmptyCheck = true;
        }
    }

    removeErrorContact() {
        this.contactEmptyCheck = false;
    }
}
