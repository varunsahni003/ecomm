import { Component } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public eComm = [
    {
      title: 'Account',
      icon: 'business',
      subPage: false,
      subPages: [
        { title: 'Romantic Ideas', url: 'romantic/romantic-ideas', icon: 'walk' },
        { title: 'Romantic Movies', url: 'romantic/romantic-movies', icon: 'business' },
        { title: 'Romantic Places', url: 'romantic/place', icon: 'walk' },
        { title: 'Romantic Gifts', url: 'gifts', icon: 'walk' }
      ]
    },
    {
      title: 'Order History',
      icon: 'walk',
      url: 'couple-games'
    },
    {
      title: 'FAQs',
      icon: 'business',
      url: ''
    },
    {
      title: 'Rewards',
      icon: 'business',
      url: ''
    },
    {
      title: 'Settings',
      icon: 'business',
      url: ''
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private menu: MenuController
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
}
