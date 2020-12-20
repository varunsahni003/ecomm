import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsAndPoliciesPageRoutingModule } from './terms-and-policies-routing.module';

import { TermsAndPoliciesPage } from './terms-and-policies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermsAndPoliciesPageRoutingModule
  ],
  declarations: [TermsAndPoliciesPage]
})
export class TermsAndPoliciesPageModule {}
