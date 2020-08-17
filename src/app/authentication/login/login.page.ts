import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListService} from '../../list.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    constructor(private route: ActivatedRoute,
                private http: HttpClient,
                private formBuilder: FormBuilder,
                private service: ListService,
                private router: Router) {
    }

    test = false;
    loginForm: FormGroup;
    data: Observable<any>;
    passwordType = 'password';
    passwordIcon = 'eye-off';
    isSubmitted = false;
    private userButDisAproved: boolean;
    appPages = [];
    ngOnInit() {
        this.formInitializer();
    }

    hideShowPassword() {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }

    formInitializer() {
        this.loginForm = this.formBuilder.group({
            email: [null, [Validators.required]],
            password: [null, [Validators.required]]
        });
    }

    login() {
        this.isSubmitted = true;
        if (this.loginForm.valid) {
            const loginData = this.loginForm.value;
            this.saveHttpReq(loginData).subscribe(d => {
                    console.log('I got this response -> ', d);
                    console.log('data.emailStatus', d.emailStatus);
                    console.log('response', d);
                    if (d.emailStatus && d.loginStatus && d.applicationStatus === 'approved' && d.role != null) {
                        if (d.role === 'donner') {
                            this.appPages = [{ title: 'Home', url: '/home', icon: 'home' },
                                { title: 'charity Houses', url: '/charityList', icon: 'list' },
                                { title: 'Open Chat', url: '/chat-channels', icon: 'ios-chatboxes'},
                                { title: 'Reports', url: `/reports/${d.donner.id}`, icon: 'list' },
                                { title: 'Settings', url: '/setting', icon: 'settings'},
                                { title: 'Feedbacks', url: '/feed-backs', icon: 'list' }];
                            this.service.setRole(d.role);
                            console.log('donner coming from API', d.donner);
                            localStorage.setItem('user', JSON.stringify(d.donner));
                            localStorage.setItem('appPages', JSON.stringify(this.appPages));
                            localStorage.setItem('role', d.role); // store role in local storage
                            this.service.changeMessage({role: d.role});
                            this.router.navigate(['home']);
                        }
                        if (d.role === 'charity house') {
                            this.appPages = [{ title: 'Home', url: '/home', icon: 'home' },
                                { title: 'Donner List', url: '/donner-list', icon: 'list', },
                                { title: 'Setting', url: '/setting', icon: 'settings'},
                                ];
                            this.service.setRole(d.role);
                            localStorage.setItem('appPages', JSON.stringify(this.appPages));
                            localStorage.setItem('user', JSON.stringify(d.charityHouse));
                            localStorage.setItem('role', d.role); // store role in local storage
                            this.service.changeMessage({role: d.role});
                            this.router.navigate(['home']);
                        }
                        if (d.role === 'admin') {
                            this.appPages = [{ title: 'Home', url: '/home', icon: 'home' },
                                { title: 'Manage Users', url: '/tabs', icon: 'list', },
                                { title: 'Message', url: '/chat-list', icon: 'ios-chatboxes'},
                                { title: 'Profile', url: `/admin-profile/${d.user.id}`, icon: 'person'}];
                            console.log('user', d.role);
                            this.service.setRole(d.role);
                            localStorage.setItem('user', JSON.stringify(d.user));
                            localStorage.setItem('appPages', JSON.stringify(this.appPages));
                            localStorage.setItem('role', d.role); // store role in local storage
                            this.service.changeMessage({role: d.role});
                            this.router.navigate(['home']);
                        }
                    } else if (d.emailStatus && d.loginStatus && d.applicationStatus === null) {
                        alert('Your email and password is correct but Application status is disapproved. ' +
                            'Now you hve to check confirmation Email and approve your application status. Thank you!');
                    } else if (d.emailStatus || d.loginStatus) {
                        alert('Invalid Email, password. Try again latter !');
                    } else if (d.emailStatus === false) {
                        alert('Sorry ! User with that email, password does not exist');
                    }
                    // this.router.navigate(['home']);
                },
                error => {
                    alert(':( OOPS ! Server Error. Confirm your internet connection.');
                    console.log('error', error);
                }
            );
            // if (loginData.role === 'donner') {
            //     this.service.setRole(loginData.role);
            //     localStorage.setItem('role', loginData.role); // store role in local storage
            //     this.service.changeMessage({role: loginData.role});
            //     // this.service.addDonner(loginData);
            // }
            // if (loginData.role === 'charity house') {
            //     this.service.addUser(4);
            //     this.service.setRole(loginData.role);
            //     localStorage.setItem('role', loginData.role); // store role in local storage
            //     this.service.changeMessage({role: loginData.role});
            //     this.router.navigate(['home']);
            // }
            // if (loginData.role === 'admin') {
            //     this.service.addUser(4);
            //     this.service.setRole(loginData.role);
            //     localStorage.setItem('role', loginData.role); // store role in local storage
            //     this.service.changeMessage({role: loginData.role});
            //     this.router.navigate(['home']);
            // }
        } else {
            return false;
            // comment
        }
    }

    get errorControl() {
        return this.loginForm.controls;
    }

    saveHttpReq(dataObj): Observable<any> {
        console.log('recieved data ', dataObj);
        const url = `${this.service.homeUrl}/users/login`;
        console.log('url', url);
        const test = this.http.post(url, dataObj);
        return test;
    }

    registerUser() {
        this.router.navigate(['register']);
    }

    forgotPassword() {
        this.router.navigate(['forgot-password']);
    }
}
