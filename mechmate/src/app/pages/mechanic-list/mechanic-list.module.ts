import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MechanicListPageRoutingModule } from './mechanic-list-routing.module';

import { MechanicListPage } from './mechanic-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MechanicListPageRoutingModule
  ],
  declarations: [MechanicListPage]
})
export class MechanicListPageModule {}
