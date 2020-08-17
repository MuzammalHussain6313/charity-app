import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminChatPage } from './admin-chat.page';
import {AutosizeModule} from 'ngx-autosize';

const routes: Routes = [
  {
    path: '',
    component: AdminChatPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        AutosizeModule
    ],
  declarations: [AdminChatPage]
})
export class AdminChatPageModule {}
