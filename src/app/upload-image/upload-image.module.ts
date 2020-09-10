import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadImagePageRoutingModule } from './upload-image-routing.module';

import { UploadImagePage } from './upload-image.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadImagePageRoutingModule
  ],
  declarations: [UploadImagePage]
})
export class UploadImagePageModule {}
