import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoadingController, ToastController} from '@ionic/angular';
import {Observable, throwError} from 'rxjs';
import {ListService} from '../list.service';

@Component({
    selector: 'app-upload-image',
    templateUrl: './upload-image.page.html',
    styleUrls: ['./upload-image.page.scss'],
})
export class UploadImagePage implements OnInit {

    public myPhoto: any;
    public error: string;
    private loading: any;
    labels;
    test: any;
    constructor(private readonly http: HttpClient,
                private readonly loadingCtrl: LoadingController,
                private readonly toastCtrl: ToastController,
                private readonly service: ListService,
                private readonly changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
    }

    takePhoto() {
        // @ts-ignore
        const camera: any = navigator.camera;
        camera.getPicture(imageData => {
            this.myPhoto = this.convertFileSrc(imageData);
            this.changeDetectorRef.detectChanges();
            this.changeDetectorRef.markForCheck();
            this.uploadPhoto(imageData);
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
        // @ts-ignore
        const camera: any = navigator.camera;
        camera.getPicture(imageData => {
            this.myPhoto = this.convertFileSrc(imageData);
            this.uploadPhoto(imageData);
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
        this.changeDetectorRef.detectChanges();
        this.changeDetectorRef.markForCheck();
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
    addToField(label: string) {
        alert(label);
    }
}
