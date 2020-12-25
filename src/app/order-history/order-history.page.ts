import { Component, OnInit } from '@angular/core';
import { CartService } from '../common/services/cart.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {

  orderDetails: any;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getProducts().subscribe(res => {
      this.orderDetails = res[0].orders;
      console.log('orders: ', this.orderDetails);
    });
  }

}
