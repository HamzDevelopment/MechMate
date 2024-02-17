import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandingPageRoutingModule } from './landing-routing.module';

import { LandingPage } from './landing.page';

import { FeatureListComponent } from 'src/app/components/feature-list/feature-list.component'; // Import the feature list component

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LandingPageRoutingModule
  ],
  declarations: [LandingPage,FeatureListComponent]
})
export class LandingPageModule {}
