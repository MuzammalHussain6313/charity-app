import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadImagePage } from './upload-image.page';

const routes: Routes = [
  {
    path: '',
    component: UploadImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadImagePageRoutingModule {}
