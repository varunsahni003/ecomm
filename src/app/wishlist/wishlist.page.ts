import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService } from '../common/services/cart.service';
import { HelperService } from '../common/utilities/helper.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {

  wishlist: any;
  descriptionLength: number = 70;

  constructor(
    private cartService: CartService,
    private helperService: HelperService,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.cartService.getProducts().subscribe(res => {
      this.wishlist = res[0].wishlist;
    });
  }

  toggleWishlist(product) {
    this.alertCtrl
      .create({
        header: 'Remove from wishlist',
        message: 'Are you sure you want to remove product from your wishlist?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
            }
          },
          {
            text: 'Okay',
            role: 'submit',
            handler: () => {
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
        return alertEl.onDidDismiss();
      }).then(dataReturnedFromModal => {
        if (dataReturnedFromModal.role == 'submit') {
          this.wishlist.forEach((element, index) => {
            if (element.id == product.id) {
              this.wishlist.splice(index, 1);
              return;
            }
          });
        }
      });
  }

}
