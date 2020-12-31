import { Component, OnInit } from '@angular/core';
import { HttpCallsService } from '../../common/services/http-calls.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  apiUrl: string = environment.apiUrl;
  profileData: any = [];
  isDetailsEditable: boolean = false;
  isContactEditable: boolean = false;
  isPasswordEditable: boolean = false;

  constructor(private http: HttpCallsService) { }

  ngOnInit() {
    this.http.fetch(`${this.apiUrl}/user.json`).subscribe(res => {
      console.log('res: ', res);
      this.profileData = res;
    });
  }

  saveProfile(profileForm) {
    this.isDetailsEditable = false;
  }

  cancelBasicDetails(form) {
    this.isDetailsEditable = false;
    form.reset({
      firstname: this.profileData[0].firstname,
      lastname: this.profileData[0].lastname
    });
  }

  saveContact(contactForm) {
    this.isContactEditable = false;
  }

  cancelContactDetails(form) {
    this.isContactEditable = false;
    form.reset({
      email: this.profileData[0].email,
      mobile: this.profileData[0].mobile
    });
  }

  savePassword(passwordForm) {
    this.isPasswordEditable = false;
  }

  cancelPasswordDetails(passwordForm) {
    this.isPasswordEditable = false;
    passwordForm.reset({
      oldpassword: '*******'
    });
  }
}
