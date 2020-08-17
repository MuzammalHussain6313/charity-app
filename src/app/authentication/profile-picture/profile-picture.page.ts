import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoadingController, ToastController} from '@ionic/angular';
import {catchError, finalize} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {ListService} from '../../list.service';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.page.html',
  styleUrls: ['./profile-picture.page.scss']
})
export class ProfilePicturePage implements OnInit {

  public myPhoto: any;
  public error: string;
  private loading: any;

  constructor(private readonly http: HttpClient,
              private readonly loadingCtrl: LoadingController,
              private readonly toastCtrl: ToastController,
              private service: ListService,
              private readonly changeDetectorRef: ChangeDetectorRef) {
  }

  takePhoto() {
    const camera: any = navigator['camera'];
    camera.getPicture(imageData => {
      this.myPhoto = this.convertFileSrc(imageData);
      this.changeDetectorRef.detectChanges();
      this.changeDetectorRef.markForCheck();
      this.uploadPhoto(imageData);
    }, error => this.error = JSON.stringify(error), {
      quality: 100,
      destinationType: camera.DestinationType.FILE_URI,
      sourceType: camera.PictureSourceType.CAMERA,
      encodingType: camera.EncodingType.JPEG
    });
  }

  selectPhoto(): void {
    const camera: any = navigator['camera'];
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
      return window['WEBVIEW_SERVER_URL'] + '/_app_file_' + url;
    }
    if (url.startsWith('file://')) {
      return window['WEBVIEW_SERVER_URL'] + url.replace('file://', '/_app_file_');
    }
    if (url.startsWith('content://')) {
      return window['WEBVIEW_SERVER_URL'] + url.replace('content:/', '/_app_content_');
    }
    return url;
  }

  private async uploadPhoto(imageFileUri: any) {
    this.error = null;
    this.loading = await this.loadingCtrl.create({
      message: 'Uploading...'
    });

    this.loading.present();

    window['resolveLocalFileSystemURL'](imageFileUri,
        entry => {
          entry['file'](file => this.readFile(file));
        });
  }

  private readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {type: file.type});
      formData.append('file', imgBlob, file.name);
      this.postData(formData);
    };
    reader.readAsArrayBuffer(file);
  }

  private postData(formData: FormData) {
    this.http.post<boolean>(`${this.service.homeUrl}/upload`, formData)
        .pipe(
            catchError(e => this.handleError(e)),
            finalize(() => this.loading.dismiss())
        )
        .subscribe(ok => this.showToast(ok));
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
    this.changeDetectorRef.detectChanges();
    return throwError(errMsg);
  }

  ngOnInit(): void {
  }
}
