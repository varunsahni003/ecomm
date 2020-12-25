import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms-and-policies',
  templateUrl: './terms-and-policies.page.html',
  styleUrls: ['./terms-and-policies.page.scss'],
})
export class TermsAndPoliciesPage implements OnInit {

  termsAndConditions = {
    name: 'Terms and Conditions',
    data: 'We at VRR Designers and developers respect the privacy of your personal information and, as such, make every effort to ensure your information is protected and remains private. As the owner and operator of VRR hereafter referred to in this Privacy Policy as we have provided this Privacy Policy to explain how we collect, use, share and protect information about the users of our App (hereafter referred to as user. For the purposes of this Agreement, any use of the terms includes VRR, without limitation. We will not use or share your personal information with anyone except as described in this Privacy Policy.'
  }

  constructor() { }

  ngOnInit() {
  }

}
