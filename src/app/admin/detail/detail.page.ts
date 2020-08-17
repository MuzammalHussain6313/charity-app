import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {ListService} from '../../list.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

    constructor(private route: ActivatedRoute,
                private service: ListService,
                private http: HttpClient,
                private router: Router
    ) {
    }

    result: any = [];
    data: Observable<any>;
    user;

    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            const val = paramMap.get('id');
            const url  = `${this.service.homeUrl}/donners/findById/${val}`;
            this.data =  this.http.get(url);
            console.log(this.data);
            this.data.subscribe(data => {
                this.user = data;
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
