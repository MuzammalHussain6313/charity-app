import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ListService} from '../../list.service';
import {Observable} from 'rxjs';
import {AlertController} from '@ionic/angular';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  feedbackForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router,
              private service: ListService,
              private alertController: AlertController,
              private formBuilder: FormBuilder) {
  }
  donnerID; finalFeedbackObject;
  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.donnerID = paramMap.get('id');
      console.log('data coming from donner list.', paramMap.get('id'));
    });
    this.formInitializer();
  }

  formInitializer() {
    this.feedbackForm = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required])],
      subject: [null, [Validators.required]],
      feedback_message: [null, [Validators.required]]
    });
  }
    sendFeedback() {
      const test = this.feedbackForm.value;
      const charityHouse = JSON.parse(localStorage.getItem('user'));
      const charityID = charityHouse.id;
      console.log('charity id ', charityID);
      this.finalFeedbackObject = '{"email": "' + test.email + '",' +
          ' "subject": "' + test.subject + '",' +
          ' "feedbackMessage": "' + test.feedback_message + '",' +
          ' "donner": { "id": ' + this.donnerID + '},' +
          ' "charityHouse": { "id": ' + charityID + '}' + '}';
      console.log('full object', this.finalFeedbackObject);
      const feedback = JSON.parse(this.finalFeedbackObject);
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
    const url = `${this.service.homeUrl}/feedbacks/newFeedback`;
    // this.presentAlertConfirm();
    return this.http.post(url, dataObj);
    alert('Feedback is recorded. Thanks you for sending feedback.');
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

}
