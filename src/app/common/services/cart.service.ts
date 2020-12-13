import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpCallsService } from './http-calls.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

    apiUrl: string = environment.apiUrl;
    loggedInUserDetails: any;
 
    private cart = [];
    private cartItemCount = new BehaviorSubject(0);
 
  constructor(private http: HttpCallsService) {}
 
  getProducts() {
    return this.http.fetch(`${this.apiUrl}/user.json`).pipe(
        take(1),
        map(res => {
        this.loggedInUserDetails = res;
        return this.loggedInUserDetails;
    })
    )
  }
 
  getCart() {
    return this.cart;
  }
 
  getCartItemCount() {
    return this.cartItemCount;
  }
 
  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.amount = 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
 
  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }
 
  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }
}