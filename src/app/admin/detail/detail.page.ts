import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ListService} from '../../list.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoadingController, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

    constructor(private readonly loadingCtrl: LoadingController,
                private readonly toastCtrl: ToastController,
                private route: ActivatedRoute,
                private service: ListService,
                private http: HttpClient,
                private router: Router
    ) {
    }

    result: any = [];
    data: Observable<any>;
    user;

    loading;
    ngOnInit() {
        this.loadUser();
    }

    async loadUser() {
        this.loading = await this.loadingCtrl.create({
            message: 'Please wait...'
        });

        this.loading.present();
        this.route.paramMap.subscribe(paramMap => {
            const val = paramMap.get('id');
            const url = `${this.service.homeUrl}/donners/findById/${val}`;
            this.data = this.http.get(url);
            console.log(this.data);
            this.data.subscribe(data => {
                this.user = data;
                this.loading.dismiss();
                console.log(this.user);
            });
            console.log(this.user);
        });
    }

    contactDonner(contactNumber: any) {
        alert('You can contact with owner via ' + contactNumber + ' Number.');
    }

    loadReports(id: any) {
        const url = `reports/${id}`;
        this.router.navigateByUrl(url);
    }
}
