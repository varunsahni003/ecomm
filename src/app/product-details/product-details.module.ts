import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailsPageRoutingModule } from './product-details-routing.module';

import { ProductDetailsPage } from './product-details.page';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { shortDescriptionPipe } from '../common/utilities/shortDescription.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailsPageRoutingModule
  ],
  declarations: [ProductDetailsPage , ProductDetailComponent, shortDescriptionPipe]
})
export class ProductDetailsPageModule {}
