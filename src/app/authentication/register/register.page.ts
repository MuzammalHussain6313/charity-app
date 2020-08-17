import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {ListService} from '../../list.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    constructor(
        private router: Router,
        private http: HttpClient,
        private service: ListService,
        private formBuilder: FormBuilder
    ) {
    }

    get registerFormControl() {
        return this.registerForm.controls;
    }

    registerForm: FormGroup;
    passwordType = 'password';
    passwordIcon = 'eye-off';
    loading: boolean;
    submitted = false;
    obj1;
    obj2;
    results: any;
    donnerList;
    mailloading: boolean;
    usernameVerification = false;
    usernameEmptyCheck = false;
    emailVerification = false;
    emailEmptyCheck = false;
    passwordMatch = false;
    ngOnInit() {
        this.formInitializer();
        // this.loading = true;
    }

    hideShowPassword() {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }

    formInitializer() {
        const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        this.registerForm = this.formBuilder.group({
            first_name: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3), Validators.maxLength(20)]],
            last_name: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3), Validators.maxLength(20)]],
            email: [null, [Validators.required, Validators.pattern(EMAILPATTERN)]],
            user_name: [null, [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9]+$')]],
            role: [null, [Validators.required]],
            password: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
            confirm_password: [
                '',
                [
                    Validators.required,
                    // this.mismatchedPasswords('password')
                ]
            ]
        });
    }

    mismatchedPasswords(otherControlName: string) {
        return (control: AbstractControl): { [key: string]: any } => {
            const otherControl: AbstractControl = control.root.get(otherControlName);

            if (otherControl) {
                const subscription: Subscription = otherControl.valueChanges.subscribe(
                    () => {
                        control.updateValueAndValidity();
                        subscription.unsubscribe();
                    }
                );
            }
            return otherControl && control.value !== otherControl.value
                ? {match: true}
                : null;
        };
    }

    loadForm() {
        this.submitted = true;
        this.loading = true;
        if (!this.registerForm.valid) {
            alert('Please provide all the required valid values!');
            return false;
        } else {
            const data = this.registerForm.value;
            if (data.role === 'donner') {
                console.log('formData', this.registerForm.value);
                const userData = this.registerForm.value;
                alert(userData.role);
                this.loading = false;
                this.router.navigate(['register-donner', userData]);
            }
            if (data.role === 'charity house') {
                console.log('formData', this.registerForm.value);
                const userData = this.registerForm.value;
                this.loading = false;
                this.router.navigate(['register-charity-house', userData]);
                // alert(formData.role);
                // this.obj1 = '1';
                // this.obj2 = '2';
                // const fullID = '{ "obj2" : "' + this.obj2 + '", "obj1" : "' + this.obj1 + '" } ';
                // const t = JSON.parse(fullID);
                // console.log('full Object', t);
            }
        }
    }
    onSubmit() {
        this.submitted = true;
        if (this.registerForm.valid) {
            alert('Form Submitted succesfully!!!\n Check the values in browser console.');
            console.table(this.registerForm.value);
        }
    }
    async checkEmail() {
        this.mailloading = true;
        const test = this.registerForm.value;
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
                    if ( tester.toString() === 'false') {
                        this.emailVerification = true;
                        this.mailloading = false;
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
    onFoucusOut() {
        const test = this.registerForm.value;
        const item = test.email;
        console.log('test', test);
        console.log('email', item);
        const str = '    ';
        if (!str.replace(/\s/g, '').length) {
            // alert('str contains spaces.');
        }
        if ( item === '' || item == null) {
            this.emailEmptyCheck = true;
        }
    }
    removeError() {
        this.emailVerification = false;
        this.emailEmptyCheck = false;
    }

    async checkUsername() {
        const test = this.registerForm.value;
        const item = test.user_name;
        console.log('test', test);
        console.log('username', item);
        if (item) {
            this.http.get(`${this.service.homeUrl}/users/username/${item}`,
                {observe: 'response'}).subscribe(response => {
                if (response.status === 200 || response.status === 201) {
                    console.log('response', response);
                    const tester = response.body;
                    console.log('tester', tester.toString());
                    if ( tester.toString() === 'false') {
                        this.usernameVerification = true;
                        this.loading = false;
                    }
                    this.loading = false;
                    // this.donnerList = response.body;
                    // console.log('content', this.donnerList);
                    // this.results = this.donnerList.content;
                }
            }, (error) => {
                console.log('error.', error);
            });
            this.loading = false;
        }
    }

    onFoucusOutUsername() {
        const test = this.registerForm.value;
        const item = test.user_name;
        console.log('test', test);
        console.log('username', item);
        const str = '    ';
        if (!str.replace(/\s/g, '').length) {
            // alert('str contains spaces.');
        }
        if ( item === '' || item == null) {
            this.usernameEmptyCheck = true;
        }
    }
    removeErrorUsername() {
        this.usernameVerification = false;
        this.usernameEmptyCheck = false;
    }
    matchPasswords() {
        const data = this.registerForm.value;
        if (data.password === data.confirm_password) {
            this.passwordMatch =  false;
        } else {
            this.passwordMatch = true;
        }
    }
    removePasswordMatchError() {
        this.passwordMatch = false;
    }
}
