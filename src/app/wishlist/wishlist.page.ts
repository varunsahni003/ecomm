import { Component, OnInit } from '@angular/core';
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

  constructor(private cartService: CartService, private helperService: HelperService) { }

  ngOnInit() {
    this.cartService.getProducts().subscribe(res => {
      this.wishlist = res[0].wishlist;
      console.log('orders: ', this.wishlist);
    });
  }

}
