import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowSingleCharityHousePage } from './show-single-charity-house.page';

const routes: Routes = [
  {
    path: '',
    component: ShowSingleCharityHousePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShowSingleCharityHousePage]
})
export class ShowSingleCharityHousePageModule {}
