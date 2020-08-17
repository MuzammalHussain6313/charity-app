import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ListService} from '../../list.service';

@Component({
    selector: 'app-admin-profile',
    templateUrl: './admin-profile.page.html',
    styleUrls: ['./admin-profile.page.scss'],
})
export class AdminProfilePage implements OnInit {

    constructor(private route: ActivatedRoute,
                private router: Router,
                private http: HttpClient,
                private service: ListService) {
    }

    user;
    data;
    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            const val = paramMap.get('id');
            console.log('parm', paramMap.get('id'));
            const url = `${this.service.homeUrl}/users/getUser/${val}`;
            this.data = this.http.get(url);
            console.log(this.data);
            this.data.subscribe(data => {
                this.user = data;
                console.log('user', this.user);
            });
            console.log('user', this.user);
        });
    }

    updateProfile() {
        this.router.navigate(['/edit-profile', this.user]);
    }
}
