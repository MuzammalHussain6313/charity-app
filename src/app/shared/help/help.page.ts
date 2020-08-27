import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-help',
    templateUrl: './help.page.html',
    styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
    user;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    sendSmsToAdmin() {
        this.router.navigate(['/open-admin-chat']);
    }
}
