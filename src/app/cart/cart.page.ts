import { Component, OnInit } from '@angular/core';
import { HelperService } from '../common/utilities/helper.service';
import { CartService } from '../common/services/cart.service';
import { environment } from '../../environments/environment';
import { HttpCallsService } from '../common/services/http-calls.service';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
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
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController) { }

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

  checkout() {
    this.http.fetch(`${this.nodeApiUrl}/api/payment/buyNow/${this.totalCart.finalAmount}`).subscribe(res => {
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

  presentPrivacyModal() {
    const data = {
      name: 'Privacy Policy',
      data: 'We at VRR Designers and developers respect the privacy of your personal information and, as such, make every effort to ensure your information is protected and remains private. As the owner and operator of VRR hereafter referred to in this Privacy Policy as we have provided this Privacy Policy to explain how we collect, use, share and protect information about the users of our App (hereafter referred to as user. For the purposes of this Agreement, any use of the terms includes VRR, without limitation. We will not use or share your personal information with anyone except as described in this Privacy Policy.'
    }
    this.modalCtrl
      .create({
        component: PrivacyPolicyComponent,
        componentProps: { modalData: data }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      });
  }

  presentTermsModal() {
    const data = {
      name: 'Terms and Conditions',
      data: 'We at VRR Designers and developers respect the privacy of your personal information and, as such, make every effort to ensure your information is protected and remains private. As the owner and operator of VRR hereafter referred to in this Privacy Policy as we have provided this Privacy Policy to explain how we collect, use, share and protect information about the users of our App (hereafter referred to as user. For the purposes of this Agreement, any use of the terms includes VRR, without limitation. We will not use or share your personal information with anyone except as described in this Privacy Policy.'
    }
    this.modalCtrl
      .create({
        component: PrivacyPolicyComponent,
        componentProps: { modalData: data }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      });
  }

  changeAddress() {
    let createInputs = [];
    this.loggedInUserDetails[0].addressList.forEach((element, i) => {
      let obj = {
        name: 'name'+i,
        type: 'radio',
        label: element,
        value: element,
        checked: false
      };
      if (element == this.loggedInUserDetails[0].defaultAddress) {
        obj.checked = true;
      }
      createInputs.push(obj);
    });
    this.alertCtrl
      .create({
        header: 'Choose address',
        inputs: createInputs,
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
          this.loggedInUserDetails[0].defaultAddress = dataReturnedFromModal.data.values;
        }
      });
  }

}
