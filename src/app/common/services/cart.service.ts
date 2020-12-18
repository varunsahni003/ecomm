import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HelperService } from '../utilities/helper.service';
import { HttpCallsService } from './http-calls.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

    apiUrl: string = environment.apiUrl;
 
    private cart: any;
    private cartItemCount = new BehaviorSubject(0);
    private totalCart = {
      totalPrice: 0,
      totalDiscount: 0,
      deliveryCharge: 0,
      finalAmount: 0
    };
 
  constructor(private http: HttpCallsService, private helperService: HelperService) {}
 
  getProducts() {
    return this.http.fetch(`${this.apiUrl}/user.json`).pipe(
        take(1),
        map(res => {
          console.log('res: ', res);
        this.cart = res;
        console.log('cart: ', this.cart);
        return this.cart;
    })
    )
  }
 
  getCart() {
    return this.cart;
  }

  getTotalCost() {
    this.cart[0].products.forEach(element => {
      this.totalCart.totalPrice += (element.cost * element.quantity);
      this.totalCart.totalDiscount += ((element.cost * element.quantity) - this.helperService.calculateDiscount((element.cost * element.quantity), element.discount));
      this.totalCart.deliveryCharge = (this.totalCart.deliveryCharge > element.deliveryCharge) ? this.totalCart.deliveryCharge : element.deliveryCharge;
    });
    this.totalCart.totalDiscount = Number(this.totalCart.totalDiscount.toFixed(2));
    this.totalCart.finalAmount = this.totalCart.totalPrice - this.totalCart.totalDiscount + this.totalCart.deliveryCharge;
    console.log('service totl cart: ', this.totalCart);
    return this.totalCart;
  }
 
  getCartItemCount() {
    return this.cartItemCount;
  }
 
  addProduct(product) {
    let added = false;
    for (let p of this.cart[0].products) {
      if (p.id == product.id) {
        p.quantity += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.quantity = 1;
      this.cart[0].products.push(product);
      this.cartItemCount.next(this.cartItemCount.value + 1);
    }

    this.totalCart.totalPrice += product.cost;
    this.totalCart.totalDiscount += (product.cost - this.helperService.calculateDiscount(product.cost, product.discount));
    this.totalCart.deliveryCharge = (this.totalCart.deliveryCharge > product.deliveryCharge) ? this.totalCart.deliveryCharge : product.deliveryCharge;
    this.totalCart.totalDiscount = Number(this.totalCart.totalDiscount.toFixed(2));
    this.totalCart.finalAmount = this.totalCart.totalPrice - this.totalCart.totalDiscount + this.totalCart.deliveryCharge;
  }
 
  decreaseProduct(product) {
    let productRemoved = false;
    for (let [index, p] of this.cart[0].products.entries()) {
      if (p.id == product.id) {
        p.quantity -= 1;
        if (p.quantity == 0) {
          this.cart[0].products.splice(index, 1);
          this.cartItemCount.next(this.cartItemCount.value - 1);
          productRemoved = true;
        }
      }
    }
    if (productRemoved) {
      this.totalCart.deliveryCharge = 0;
      this.cart[0].products.forEach(element => {
        this.totalCart.deliveryCharge = (this.totalCart.deliveryCharge > element.deliveryCharge) ? this.totalCart.deliveryCharge : product.deliveryCharge;
      });
    }
    this.totalCart.totalPrice -= product.cost;
    this.totalCart.totalDiscount -= (product.cost - this.helperService.calculateDiscount(product.cost, product.discount));
    this.totalCart.totalDiscount = Number(this.totalCart.totalDiscount.toFixed(2));
    this.totalCart.finalAmount = this.totalCart.totalPrice - this.totalCart.totalDiscount + this.totalCart.deliveryCharge;
  }
 
  removeProduct(product) {
    for (let [index, p] of this.cart[0].products.entries()) {
      if (p.id == product.id) {
        this.cartItemCount.next(this.cartItemCount.value - 1);
        this.cart[0].products.splice(index, 1);
      }
    }
    this.totalCart.deliveryCharge = 0;
    this.cart[0].products.forEach(element => {
      this.totalCart.deliveryCharge = (this.totalCart.deliveryCharge > element.deliveryCharge) ? this.totalCart.deliveryCharge : product.deliveryCharge;
    });
    this.totalCart.totalPrice -= product.cost;
    this.totalCart.totalDiscount -= (product.cost - this.helperService.calculateDiscount(product.cost, product.discount));
    this.totalCart.totalDiscount = Number(this.totalCart.totalDiscount.toFixed(2));
    this.totalCart.finalAmount = this.totalCart.totalPrice - this.totalCart.totalDiscount + this.totalCart.deliveryCharge;
  }
}