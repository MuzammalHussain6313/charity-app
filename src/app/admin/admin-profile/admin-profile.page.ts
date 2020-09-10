import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ListService} from '../../list.service';
import {LoadingController, ToastController} from '@ionic/angular';
@Component({
    selector: 'app-admin-profile',
    templateUrl: './admin-profile.page.html',
    styleUrls: ['./admin-profile.page.scss'],
})
export class AdminProfilePage implements OnInit {

    constructor(private readonly loadingCtrl: LoadingController,
                private readonly toastCtrl: ToastController,
                private route: ActivatedRoute,
                private router: Router,
                private http: HttpClient,
                private service: ListService) {
    }

    loading;
    user;
    data;
    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            const val = paramMap.get('id');
            console.log('parm', paramMap.get('id'));
            this.loadUser(val);
            console.log('user', this.user);
        });
    }

    async loadUser(val) {
        this.loading = await this.loadingCtrl.create({
            message: 'Please wait...'
        });

        this.loading.present();
        const url = `${this.service.homeUrl}/users/getUser/${38}`;
        this.data = this.http.get(url);
        console.log(this.data);
        this.data.subscribe(data => {
            this.user = data;
            this.loading.dismiss();
            console.log('user', this.user);
        });
    }
    updateProfile() {
        this.router.navigate(['/edit-profile', this.user]);
    }
}
