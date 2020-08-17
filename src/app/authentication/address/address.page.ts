import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {ListService} from '../../list.service';

@Component({
    selector: 'app-address',
    templateUrl: './address.page.html',
    styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

    addressForm: FormGroup;
    charity;
    loading: boolean;
    submitted: any;
    constructor(private route: ActivatedRoute,
                private router: Router,
                private http: HttpClient,
                private service: ListService,
                private formBuilder: FormBuilder
    ) {
    }

    obj;
    user;

    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            this.obj = paramMap.get('id');
            console.log('reciving data', this.obj);
        });
        this.formInitializer();
    }

    formInitializer() {
        this.addressForm = this.formBuilder.group({
            streetAddress: [null, [Validators.required]],
            city: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
            zipCode: [null, [Validators.required, Validators.pattern('[0-9]*')]],
            state: [null, [Validators.required, Validators.pattern('[a-zA-Z]*')]],
            country: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]]
        });
    }

    get registerAddressFormControl() {
        return this.addressForm.controls;
    }

    registerUser() {
        this.submitted = true;
        this.loading = true;
        if (this.addressForm.valid) {
            console.log('formData', this.addressForm.value);
            const formData = this.addressForm.value;
            this.charity = '' + this.obj + '"address" : {"streetAddress" : "' + formData.streetAddress +
                '" , "city" : "' + formData.city +
                '" , "zipCode" : "' + formData.zipCode +
                '" , "state" : "' + formData.state +
                '" , "country" : "' + formData.country +
                '" } }';
            console.log('data befor parsing', this.charity);
            const completeCharityHouse = JSON.parse(this.charity);
            console.log('complete charity house', completeCharityHouse);
            this.saveHttpReq(completeCharityHouse).subscribe(
                data => {
                    console.log('I got this response -> ', data);
                    this.loading = false;
                    alert('Please! check your email and verify your account.');
                    this.router.navigate(['login']);
                },
                error => {
                    console.log('error', error);
                }
            );
        }
        this.loading = false;
    }

    saveHttpReq(dataObj): Observable<any> {
        console.log('recieved data ', dataObj);
        const url = `${this.service.homeUrl}/charityHouses/newCharityHouse`;
        const test = this.http.post(url, dataObj);
        this.loading = false;
        return test;
    }
}
