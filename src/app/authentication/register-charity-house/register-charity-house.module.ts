import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterCharityHousePage } from './register-charity-house.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterCharityHousePage
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
  declarations: [RegisterCharityHousePage]
})
export class RegisterCharityHousePageModule {}
