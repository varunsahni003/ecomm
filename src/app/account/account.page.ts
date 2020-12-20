import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from '../common/services/auth-service.service';
import { HttpCallsService } from '../common/services/http-calls.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  loggedInUserDetails: any;
  apiUrl: string = environment.apiUrl;

  constructor(private authService: AuthService, private http: HttpCallsService) { }

  ngOnInit() {
    // this.loggedInUserDetails = this.authService.currentUserValue;
    this.http.fetch(`${this.apiUrl}/user.json`).subscribe(res => {
      this.loggedInUserDetails = res;
      console.log('logged in user: ', this.loggedInUserDetails);
    })
  }

}
