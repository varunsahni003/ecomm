import { Component, OnInit } from '@angular/core';
import { HelperService } from '../common/utilities/helper.service';
import { CartService } from '../common/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  loggedInUserDetails: any;
  cart = [];
  cartItemCount: any;
  totalCart: any = {
    totalPrice: 0,
    totalDiscount: 0,
    finalAmount: 0,
    deliveryCharge: 0
  };

  constructor(
    private cartService: CartService,
    private helperService: HelperService) { }

  ngOnInit() {
    this.cartService.getProducts().subscribe(res => {
      this.loggedInUserDetails = res;
      this.loggedInUserDetails[0].products.forEach(element => {
        this.totalCart.totalPrice += element.price;
        this.totalCart.totalDiscount += (element.price - this.helperService.calculateDiscount(element.price, element.discount));
        this.totalCart.deliveryCharge = (this.totalCart.deliveryCharge > element.deliveryCharge) ? this.totalCart.deliveryCharge : element.deliveryCharge;
      });
      console.log('delivery charge: ', this.totalCart.deliveryCharge);
      this.totalCart.finalAmount = this.totalCart.totalPrice - this.totalCart.totalDiscount + this.totalCart.deliveryCharge;
    });
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount().value;
  }

  addToCart(product) {
    this.cartService.addProduct(product);
  }

}
