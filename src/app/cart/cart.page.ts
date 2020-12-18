import { Component, OnInit } from '@angular/core';
import { HelperService } from '../common/utilities/helper.service';
import { CartService } from '../common/services/cart.service';
import { environment } from '../../environments/environment';
import { HttpCallsService } from '../common/services/http-calls.service';
import { ToastController } from '@ionic/angular';
declare var Razorpay: any;

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
  nodeApiUrl: string = environment.nodeApi;
  theme = ["#8F46EE", "#3FBD78", "#FA5777"];

  constructor(
    private cartService: CartService,
    private helperService: HelperService,
    private http: HttpCallsService,
    public toastCtrl: ToastController) { }

  ngOnInit() {
    this.cartService.getProducts().subscribe(res => {
      this.loggedInUserDetails = res;
      this.totalCart = this.cartService.getTotalCost();
    });
    this.cart = this.cartService.getCart();
    this.cartService.getCartItemCount().subscribe(res => {
      this.cartItemCount = res;
    });
  }

  addToCart(product) {
    this.cartService.addProduct(product);
  }

  descreseItem(product) {
    this.cartService.decreaseProduct(product);
  }

  addItem(product) {
    this.cartService.addProduct(product);
  }

  order() {
    this.http.fetch(`${this.nodeApiUrl}/api/payment/buyNow/${this.totalCart.finalAmount}`).subscribe(res => {
      console.log(res);
      var options = {
      "key": 'rzp_test_2gEgPJl4OjDmwz',
      "name": 'Order',
      "description": "VRR designers server",
      "amount": this.totalCart.finalAmount,
      "currency": "INR",
      "accept_partial": false,
      "image": "/assets/icon/favicon.png",
      "order_id": res["id"],
      "handler": (response) => {
        console.log('On successful payment: ', response);
        this.presentToast();
      },
      "error": (err) => {
        console.log("-------------------");
      },
      "customer": {
        "name": "Gaurav Kumar",
        "contact": "+919999999999",
        "email": "gaurav.kumar@example.com"
      },
      "notify": {
        "sms": true,
        "email": false
      },
      "options": {
        "checkout": {
          "method": {
            "netbanking": "1",
            "card": "1",
            "upi": "1",
            "wallet": "0"
          }
        }
      },
      "theme": {
        "color": this.theme[0]
      }
    };

    this.initPay(options);
  });
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: "Payment Succesful",
      duration: 5000
    });
    toast.present();
  }

  initPay(options) {
    var rzp1 = new Razorpay(options);
    rzp1.open();
  }

}
