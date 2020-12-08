import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../common/models/products.model';
import { HelperService } from '../common/utilities/helper.service';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  @Input() products: Array<Product>;

  constructor(private helperService: HelperService) { }

  ngOnInit() {
    console.log('products: ', this.products);
  }

  productDetails(product) {
    this.helperService.updateCurrentProduct(product);
    let arr = [];
    arr.push(product);
    Plugins.Storage.set({ key: 'selectedProduct', value: JSON.stringify(arr)});
    this.helperService.navigateTo('product-details', true);
  }

}
