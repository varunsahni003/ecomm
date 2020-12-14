import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonSlides, ToastController } from '@ionic/angular';
import { Product } from '../../common/models/products.model';
import { HttpCallsService } from '../../common/services/http-calls.service';
import { HelperService } from '../../common/utilities/helper.service';
import { environment } from '../../../environments/environment';
declare var Razorpay: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {

  @Input() productDetails: Product;
  @Output() notify: EventEmitter<Number> = new EventEmitter<Number>();
  @ViewChild('slides', {static: true}) slides: IonSlides;

  slideOptions = {
    effect: 'flip',
    zoom: false
  };
  descriptionLength: number = 90;
  description: boolean = false;
  nodeApiUrl: string = environment.nodeApi;
  theme = ["#8F46EE", "#3FBD78", "#FA5777"];

  constructor(
    private helperService: HelperService,
    private http: HttpCallsService,
    public toastCtrl: ToastController) { }

  ngOnInit() {
    console.log('product details: ', this.productDetails);
  }

  slideChanged() {
    this.slides.getActiveIndex().then((index: number) => {
        console.log('index', index);
    });
  }

  // ionViewWillEnter() {
  //   console.log('will enter');
  //   console.log('product details: ', this.productDetails);
  // }
  ionViewDidEnter() {
    console.log('did enter');
    console.log('product details: ', this.productDetails);
    this.slideChanged();
  }

  shareViaInstagram(shareLink) {
    // this.socialSharing.canShareVia('instagram').then(() => {
    //   // Sharing via email is possible
    //   this.socialSharing.shareViaInstagram('Hey ! Look at the new dress I just bought from Ecommerce app. Find more such apps at ', 'www/' + shareLink).then(() => {
    //     // Shared successfully
    //   }).catch(() => {
    //     this.createAlert('Error sharing product via Instagram. Please check if you have Instagram app on the device')
    //   });
    // }).catch(() => {
    //   this.createAlert('Could not find Instagram app on the device. Please install Instagram and try again.')
    // });
  }

  shareCommon(shareLink) {
    // console.log(shareLink);
    // this.socialSharing.share('Hey ! Look at the new dress I just bought from Ecommerce app. Find more such products at ', 'Ecommerce app', 'www/' + shareLink, 'ecommerce.com').then(() => {
    //   // Success!
    // }).catch(() => {
    //   // Error!
    // });
  }

  moreDetails() {
    this.descriptionLength = 99999999999999;
    this.description = !this.description;
  }

  lessDetails() {
    this.descriptionLength = 90;
    this.description = !this.description;
  }

  buyNow() {
    const discountedPrice = this.helperService.calculateDiscount(this.productDetails.cost, this.productDetails.discount) * 100;
    this.http.fetch(`${this.nodeApiUrl}/api/payment/buyNow/${discountedPrice}`).subscribe(res => {
      console.log(res);
      var options = {
      "key": 'rzp_test_2gEgPJl4OjDmwz',
      "name": 'Buy Now',
      "description": "VRR designers server",
      "amount": discountedPrice,
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
      duration: 3000
    });
    toast.present();
  }

  initPay(options) {
    var rzp1 = new Razorpay(options);
    rzp1.open();
  }
}
