import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MechanicProfilePageRoutingModule } from './mechanic-profile-routing.module';
import { MechanicProfilePage } from './mechanic-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MechanicProfilePageRoutingModule
  ],
  declarations: [MechanicProfilePage]
})
export class MechanicProfilePageModule {}
