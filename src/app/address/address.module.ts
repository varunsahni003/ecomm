import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressPageRoutingModule } from './address-routing.module';

import { AddressPage } from './address.page';
import { AddAddressComponent } from './add-address/add-address.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddressPageRoutingModule
  ],
  declarations: [AddressPage, AddAddressComponent]
})
export class AddressPageModule {}
