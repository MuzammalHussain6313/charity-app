import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DonnerListPage } from './donner-list.page';
// import {ReviewComponent} from './review/review.component';
import {ReviewComponent} from './review/review.component';
const routes: Routes = [
  {
    path: '',
    component: DonnerListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  entryComponents: [ReviewComponent],
  declarations: [DonnerListPage, ReviewComponent]
})
export class DonnerListPageModule {}
