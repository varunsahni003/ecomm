import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsAndPoliciesPageRoutingModule } from './terms-and-policies-routing.module';

import { TermsAndPoliciesPage } from './terms-and-policies.page';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermsAndPoliciesPageRoutingModule
  ],
  declarations: [TermsAndPoliciesPage, PrivacyPolicyComponent]
})
export class TermsAndPoliciesPageModule {}
