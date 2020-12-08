import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Product } from '../common/models/products.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  
  @Input() productDetails: Product;
  @Input() slider: IonSlides;
  @Output() notify: EventEmitter<Number> = new EventEmitter<Number>();

  slideOptions = {
    effect: 'flip'
  };
  constructor() { }

  ngOnInit() {}

}
