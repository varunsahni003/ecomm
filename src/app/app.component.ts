import { Component } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService } from './common/services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public eComm = [
    {
      title: 'Home',
      icon: 'business',
      url: 'home'
    },
    {
      title: 'My Account',
      icon: 'business',
      url: 'account'
      // subPage: false,
      // subPages: [
      //   { title: 'Profile', url: 'home', icon: 'walk' },
      //   { title: 'Saved address', url: 'address', icon: 'business' },
      //   { title: 'Order History', url: 'history', icon: 'walk' },
      //   { title: 'Settings', url: 'setting', icon: 'walk' }
      // ]
    },
    {
      title: 'Order History',
      icon: 'walk',
      url: 'order-history'
    },
    {
      title: 'My Wishlist',
      icon: 'walk',
      url: 'wishlist'
    },
    {
      title: 'My Cart',
      icon: 'walk',
      url: 'cart'
    },
    {
      title: 'Contact',
      icon: 'walk',
      url: 'contact'
    },
    {
      title: 'Terms and Conditions',
      icon: 'walk',
      url: 'terms-and-policies'
    }
    // {
    //   title: 'FAQs',
    //   icon: 'business',
    //   url: ''
    // },
    // {
    //   title: 'Rewards',
    //   icon: 'business',
    //   url: ''
    // },
    // {
    //   title: 'Settings',
    //   icon: 'business',
    //   url: ''
    // }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private menu: MenuController,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  itemClicked(item) {
    if (item.url) {
      this.menu.close('main');
      this.router.navigate([item.url]);
    } else {
      item.subPage = !item.subPage;
    }
  }

  logout() {
    this.authService.logout();
  }
}
