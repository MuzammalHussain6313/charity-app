import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, throwError} from 'rxjs';
import {ListService} from '../../list.service';
import {LoadingController, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-donate-food',
    templateUrl: './donate-food.page.html',
    styleUrls: ['./donate-food.page.scss'],
})
export class DonateFoodPage implements OnInit {
    foodName;
    currentDate;
    type;
    quantity;
    unit;
    private charityID;
    donateFoodForm: FormGroup;
    data: Observable<any>;
    units: string [] = ['grams', 'kilo grams', 'dozen', 'pieces'];
    charityHouse: any;
    today = new Date();
    date;
    finalDonationObject;
    dateTill;
    public myPhoto: any;
    public error: string;
    private loading: any;
    labels;
    test: any;
    clicked = false;

    constructor(private route: ActivatedRoute,
                private http: HttpClient,
                private formBuilder: FormBuilder,
                private service: ListService,
                private router: Router,
                private readonly loadingCtrl: LoadingController,
                private readonly toastCtrl: ToastController,
                private readonly changeDetectorRef: ChangeDetectorRef) {
        this.sendNotification();
    }

    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            console.log('charity-house', paramMap);
            this.charityID = paramMap.get('id');
            console.log('id', this.charityID);
        });
        this.formInitializer();
        this.dateTill = this.today.toISOString().substr(0, 10);
    }

    formInitializer() {
        this.currentDate = new Date().getDate();
        this.donateFoodForm = this.formBuilder.group({
            name: [this.foodName, Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            expiry_date: [this.currentDate, [Validators.required]],
            type: [this.type, [Validators.required]],
            quantity: [this.quantity, Validators.compose([Validators.pattern('[0-9 ]*'), Validators.required])],
            unit: [this.unit, Validators.required]
        });
    }

    async donateFood() {
        console.log('unit', this.donateFoodForm.value.unit);
        this.date = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate();
        console.log('current date', this.date);
        const test = this.donateFoodForm.value;
        const dateFormat = test.expiry_date.split('T')[0];
        console.log('date after conversion', dateFormat);
        console.log('form data', test);
        const donner = JSON.parse(localStorage.getItem('user'));
        const donnerID = donner.id;
        console.log('donner id ', donnerID);
        this.finalDonationObject = '{"quantityValue" : "' + test.quantity + '",' +
            '"quantityUnit" : "' + test.unit + '",' +
            '"foodItem": {' +
            '"name": "' + test.name + '",' +
            '"expiry_date": "' + dateFormat + '",' +
            '"type": "' + test.type + '" },' +
            '"donation": {' + '"date": "' + this.date + '",' +
            '"donner": {' + '"id": ' + donnerID + ' },' +
            '"charityHouse": {' + '"id": ' + this.charityID + ' }}}';
        console.log('full object', this.finalDonationObject);
        const foodDonation = JSON.parse(this.finalDonationObject);
        this.loading = await this.loadingCtrl.create({
            message: 'Donating Food...'
        });
        this.loading.present();
        this.saveFoodDonation(foodDonation).subscribe(
            data => {
                console.log('I got this response -> ', data);
                this.router.navigate(['charity-list']);
            },
            error => {
                console.log('error', error);
            }
        );
    }

    sendNotification() {
        const url = `${this.service.homeUrl}/charityHouses/getCharityHouse/${15}`;
        let email;
        this.http.get(url, {observe: 'response'}).subscribe(res => {
            console.log('data', res);
            const data: any = res.body;
            console.log(data);
            email = data.content.email;
        });
        this.http.get(`${this.service.homeUrl}/send-notification/${email}`);
    }
    saveFoodDonation(dataObj): Observable<any> {
        console.log('data received for put. ', dataObj);
        const url = `${this.service.homeUrl}/foodDonationDetails/newFoodDonationDetails`;
        return this.http.post(url, dataObj);
    }

    loadData() {
        this.foodName = 'Food name';
        this.currentDate = new Date();
        this.currentDate.setDate(this.currentDate.getDate() + 1);
        this.currentDate.setMonth(this.currentDate.getMonth());
        this.currentDate.setYear(this.currentDate.getYear());
        console.log(this.currentDate);
        this.type = 'food';
        this.quantity = 1;
        this.unit = 'Kg';
    }

    takePhoto() {
        this.clicked = true;
        // @ts-ignore
        const camera: any = navigator.camera;
        camera.getPicture(imageData => {
            this.myPhoto = this.convertFileSrc(imageData);
            this.changeDetectorRef.detectChanges();
            this.changeDetectorRef.markForCheck();
            this.uploadPhoto(imageData);
            this.loadData();
            this.changeDetectorRef.detectChanges();
            this.changeDetectorRef.markForCheck();
        }, error => this.error = JSON.stringify(error), {
            quality: 100,
            destinationType: camera.DestinationType.FILE_URI,
            sourceType: camera.PictureSourceType.CAMERA,
            encodingType: camera.EncodingType.JPEG
        });
    }

    selectPhoto(): void {
        this.clicked = true;
        // @ts-ignore
        const camera: any = navigator.camera;
        camera.getPicture(imageData => {
            this.myPhoto = this.convertFileSrc(imageData);
            this.uploadPhoto(imageData);
            this.loadData();
            alert('this.labels[0].name : ' + this.labels[0].name);
            alert(('this.labels[0] : ' + this.labels[0]));
            // this.foodName = this.labels[0].name;
            this.changeDetectorRef.detectChanges();
            this.changeDetectorRef.markForCheck();
        }, error => this.error = JSON.stringify(error), {
            sourceType: camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: camera.DestinationType.FILE_URI,
            quality: 100,
            encodingType: camera.EncodingType.JPEG,
        });
    }

    private convertFileSrc(url: string): string {
        if (!url) {
            return url;
        }
        if (url.startsWith('/')) {
            // @ts-ignore
            return window.WEBVIEW_SERVER_URL + '/_app_file_' + url;
        }
        if (url.startsWith('file://')) {
            // @ts-ignore
            return window.WEBVIEW_SERVER_URL + url.replace('file://', '/_app_file_');
        }
        if (url.startsWith('content://')) {
            // @ts-ignore
            return window.WEBVIEW_SERVER_URL + url.replace('content:/', '/_app_content_');
        }
        return url;
    }

    private async uploadPhoto(imageFileUri: any) {
        this.error = null;
        this.loading = await this.loadingCtrl.create({
            message: 'Uploading...'
        });

        this.loading.present();
        // @ts-ignore
        window.resolveLocalFileSystemURL(imageFileUri,
            entry => {
                entry.file(file => this.readFile(file));
            });
    }

    private readFile(file: any) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const formData = new FormData();
            const imgBlob = new Blob([reader.result], {type: file.type});
            formData.append('file', imgBlob, file.name);
            this.postData(formData).subscribe(data => {
                this.loading.dismiss();
                this.labels = data;
                alert(this.labels);
                this.changeDetectorRef.detectChanges();
                this.changeDetectorRef.markForCheck();
            });
        };
        reader.readAsArrayBuffer(file);
    }

    private postData(formData: FormData): Observable<any> {
        const d = this.http.post(`${this.service.homeUrl}/upload`, formData);
        return d;
    }

    private async showToast(ok: boolean | {}) {
        if (ok === true) {
            const toast = await this.toastCtrl.create({
                message: 'Upload successful',
                duration: 3000,
                position: 'top'
            });
            toast.present();
        } else {
            const toast = await this.toastCtrl.create({
                message: 'Upload failed',
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
    }

    private handleError(error: any) {
        const errMsg = error.message ? error.message : error.toString();
        this.error = errMsg;
        return throwError(errMsg);
    }

    addToField(label) {
        alert(label);
    }
}
