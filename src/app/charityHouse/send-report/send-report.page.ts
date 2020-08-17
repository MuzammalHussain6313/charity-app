import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ListService} from '../../list.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-send-report',
  templateUrl: './send-report.page.html',
  styleUrls: ['./send-report.page.scss'],
})
export class SendReportPage implements OnInit {
  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private formBuilder: FormBuilder,
              private service: ListService,
              private router: Router) { }
  reportForm: FormGroup;
  finalReportObject;
  reportID;
  types = [ 'Spam', 'Harassment', 'nudity', 'violence', 'other'];

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.reportID = paramMap.get('id');
      console.log('data coming from donner list.', paramMap.get('id'));
    });
    this.formInitializer();
  }
  formInitializer() {
    this.reportForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      type: [null, [Validators.required]],
      reportMessage: [null, [Validators.required]]
    });
  }
  sendReport() {
    const test = this.reportForm.value;
    const charityHouse = JSON.parse(localStorage.getItem('user'));
    console.log('ch', charityHouse);
    const charityID = charityHouse.id;
    console.log('charity id ', charityID);
    this.finalReportObject = '{"email": "' + test.email + '",' +
        ' "type": "' + test.type + '",' +
        ' "message": "' + test.reportMessage + '",' +
        ' "donner": { "id": ' + this.reportID + '},' +
        ' "charityHouse": { "id": ' + charityID + '}' + '}';
    console.log('full object', this.finalReportObject);
    const feedback = JSON.parse(this.finalReportObject);
    this.saveFeedback(feedback).subscribe(
        data => {
          console.log('I got this response -> ', data);
          this.router.navigate(['donner-list']);
        },
        error => {
          console.log('error', error);
        }
    );
  }
  saveFeedback(dataObj): Observable<any> {
    console.log('data recieved for put. ', dataObj);
    const url = `${this.service.homeUrl}/reports/add`;
    return this.http.post(url, dataObj);
    alert('Thanks for reporting a donner. Admin will send you an email in short.');
  }
}
