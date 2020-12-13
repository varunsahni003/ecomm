import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Product } from 'src/app/common/models/products.model';
import { HelperService } from 'src/app/common/utilities/helper.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {

  @Input() productDetails: Product;
  // @Input() slider: IonSlides;
  @Output() notify: EventEmitter<Number> = new EventEmitter<Number>();
  @ViewChild('slides', {static: true}) slides: IonSlides;

  slideOptions = {
    effect: 'flip',
    zoom: false
  };
  descriptionLength: number = 90;
  description: boolean = false;

  constructor(private helperService: HelperService) { }

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
}
