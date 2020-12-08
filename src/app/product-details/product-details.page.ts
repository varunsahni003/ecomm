import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../common/models/products.model';
import { DataService } from '../common/utilities/data.service';
import { HelperService } from '../common/utilities/helper.service';
import { Plugins } from '@capacitor/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  productDetails: Product;
  slideOptions = {
    effect: 'flip',
    zoom: false
  };
  @ViewChild('slider') slider: IonSlides;

  constructor(private helperService: HelperService, private dataService: DataService) { }

  ngOnInit() {
    this.getProduct();
  }

  async getProduct() {
    if (this.dataService.selectedProduct) {
      this.productDetails = this.dataService.selectedProduct;
      console.log('product: ', this.productDetails);
    } else {
      const { value } = await Plugins.Storage.get({ key: 'selectedProduct' });
      const parsedArr = JSON.parse(value);
      this.productDetails = parsedArr[0];
      console.log('product: ', this.productDetails);
    }
  }

  change() {

  }

  onReviewClick(event) {

  }

}
