import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private router: Router,
    private nav: NavController,
    private dataService: DataService) { }

  navigateTo(link, forward?) {
    if (forward) {
      this.nav.navigateForward('/' + link);
    } else {
      this.router.navigateByUrl('/' + link);
    }
  }

  calculateDiscount(price: number, discount: number) {
    price = price - (price * discount / 100);
    return +(price.toFixed(2));
  }

  updateCurrentProduct(product) {
    this.dataService.selectedProduct = product;
  }

  createArray(num: number) {
    let i = [];
    for(let k=0; k<num; k++) {
      i.push(5);
    }
    return i;
  }
}
