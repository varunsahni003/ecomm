import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';
declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  nodeApiUrl: string = environment.nodeApi;

  constructor(public http: HttpClient, public toastCtrl: ToastController) { }

 ngOnInit() {

  }

 initPay(options) {
 var rzp1 = new Razorpay(options);
    rzp1.open();
  }

 buy(plan) {
  let name, price, theme, param;

  if (plan == "basic") {
    name = "Basic Plan";
    price = "500";
    theme = "#8F46EE";
    param = "createOrderBasic";
  } else if (plan == "premium") {
    name = "Premium Plan";
    price = "2000";
    theme = "#3FBD78";
    param = "createOrderPremium";
  } else {
    name = "Ultimate Plan";
    price = "5000";
    theme = "#FA5777";
    param = "createOrderUltimate";
  }

 this.http.get(`${this.nodeApiUrl}/api/payment/${param}/`).subscribe(res => {
      console.log(res);
      var options = {
      "key": 'rzp_test_2gEgPJl4OjDmwz',
      "name": name,
      "description": "VRR designers server",
      "amount": price,
      "currency": "INR",
      "accept_partial": false,
      "image": "/assets/icon/favicon.png",
      "order_id": res["id"],
      "handler": (response) => {
        console.log(response);
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
        "color": theme
      }
    };

    this.initPay(options);
  });
}

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: "Payment Succesful",
      duration: 3000
    });
    toast.present();
  }

}
