import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ListService {
    charityHouse: any[];

    user: number;
    private messageSource = new BehaviorSubject(false);
    currentMessage = this.messageSource.asObservable();
    constructor() {
    }
    role: any;
    // homeUrl = 'http://localhost:8095';
    homeUrl = 'https://food-distribution-app.herokuapp.com';
    addUser(item: number) {
        this.user = item;
    }

    changeMessage(message) {
        this.messageSource.next(message);
    }
    setRole(item: string) {
        this.role = item;
    }

    getRole() {
        return this.role;
    }
    getUser() {
        return this.user;
    }
}
