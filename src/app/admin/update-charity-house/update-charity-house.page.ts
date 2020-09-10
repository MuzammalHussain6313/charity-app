import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ListService} from '../../list.service';
import {LoadingController, ToastController} from '@ionic/angular';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-update-charity-house',
    templateUrl: './update-charity-house.page.html',
    styleUrls: ['./update-charity-house.page.scss'],
})
export class UpdateCharityHousePage implements OnInit {

    constructor(private router: Router,
                private http: HttpClient,
                private service: ListService,
                private formBuilder: FormBuilder,
                private readonly loadingCtrl: LoadingController,
                private readonly toastCtrl: ToastController,
                private route: ActivatedRoute,
                private readonly changeDetectorRef: ChangeDetectorRef) {
    }

    loading;
    user;
    charityForm: FormGroup;
    data: Observable<any>;

    ngOnInit() {
        this.loadCharityHouse();
        this.charityFormInitializer();
        this.changeDetectorRef.detectChanges();
        this.changeDetectorRef.markForCheck();
    }

    async loadCharityHouse() {
        this.loading = await this.loadingCtrl.create({
            message: 'Please wait...'
        });

        this.loading.present();
        this.route.paramMap.subscribe(paramMap => {
            const val = paramMap.get('id');
            console.log('id', val);
            const url = `${this.service.homeUrl}/charityHouses/getCharityHouse/${val}`;
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

    charityFormInitializer() {
        const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
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

    generateUser() {
        const data = this.charityForm.value;
        const childAddress = '"address" : {"id" : "' + this.user.address.id +
            '" , \n"streetAddress" : "' + this.user.address.streetAddress +
            '" , \n"city" : "' + this.user.address.city +
            '" , \n"zipCode" : "' + this.user.address.zipCode +
            '" , \n"state" : "' + this.user.address.state +
            '" , \n"country" : "' + this.user.address.country + '"\n}';
        const childUser = '"user" : {"id" : "' + this.user.user.id +
            '" , \n"first_name" : "' + this.user.user.first_name +
            '" , \n"last_name" : "' + this.user.user.last_name +
            '" , \n"email" : "' + this.user.user.email +
            '" , \n"user_name" : "' + this.user.user.user_name +
            '" , \n"password" : "' + this.user.user.password +
            '" , \n"role"  : "' + this.user.user.role +
            '" , \n"image" : "' + null + '"\n}';
        const charityHouse = '{"id" : "' + this.user.id +
            '", \n"name" : "' + data.name +
            '", \n"email" : "' + data.email +
            '", \n"no_of_dependents" : "' + data.no_of_dependents +
            '", \n"contact" : "' + data.contact +
            '", \n"type" : "' + data.type +
            '", \n"bank_name" : "' + data.bank_name +
            '", \n"account_no" : "' + data.account_no +
            '", \n' + childAddress +
            ', \n' + childUser + '\n}';
        console.log('data before parsing', charityHouse);
        const completeCharityHouse = JSON.parse(charityHouse);
        console.log('complete Charity House : ', completeCharityHouse);
        return completeCharityHouse;
    }

    async updateData() {
        this.loading = await this.loadingCtrl.create({
            message: 'Please wait...'
        });

        this.loading.present();
        if (this.charityForm.valid) {
            console.log('formData', this.charityForm.value);
            const formData = this.charityForm.value;
            console.log('data', this.generateUser());
            this.saveHttpReq(this.generateUser()).subscribe(
                data => {
                    console.log('I got this response -> ', data);
                    this.loading.dismiss();
                    this.router.navigate(['tabs/charity-houses']);
                    alert('user updated successfully');
                },
                error => {
                    console.log('error', error);
                }
            );
        }
    }

    saveHttpReq(dataObj): Observable<any> {
        const url = `${this.service.homeUrl}/charityHouses/updateCharityHouse`;
        console.log('link', url);
        return this.http.put(url, dataObj);
    }
}
