import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../common/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit() {
  }

  register(form) {
    this.authService.register(form.value).subscribe((res) => {
      this.route.navigateByUrl('home');
    });
  }

}
