import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsAndPoliciesPage } from './terms-and-policies.page';

const routes: Routes = [
  {
    path: '',
    component: TermsAndPoliciesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsAndPoliciesPageRoutingModule {}
