import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { HttpCallsService } from '../common/services/http-calls.service';
import { AddAddressComponent } from './add-address/add-address.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  apiUrl: string = environment.apiUrl;
  addresses: any;

  constructor(
    private http: HttpCallsService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
    this.http.fetch(`${this.apiUrl}/addresses.json`).subscribe(res => {
      console.log('res: ', res);
      this.addresses = res;
    });
  }

  addAddress() {
    const data = {
      name: 'Edit Address',
      data: {
        firstname: '',
        lastname: '',
        contact: '',
        house: '',
        address: '',
        address1: '',
        street: '',
        city: '',
        state: '',
        pincode: ''
      }
    }
    this.modalCtrl
      .create({
        component: AddAddressComponent,
        componentProps: { modalData: data }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(modalResult => {
        console.log('modal result: ', modalResult)
      });
  }

  edit(address, i) {
    address.isEditable = true;
    const data = {
      name: 'Edit Address',
      data: address
    }
    this.modalCtrl
      .create({
        component: AddAddressComponent,
        componentProps: { modalData: data }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(modalResult => {
        console.log('modal result: ', modalResult)
      });
    console.log(this.addresses);
  }

  delete(address, i) {
    this.alertCtrl
      .create({
        header: 'Choose address',
        message: 'Are you sure you want to delete this address?',
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
          this.addresses[0].addressList.forEach((element, index) => {
            if (element == address) {
              this.addresses[0].addressList.splice(index, 1);
              return;
            }
          });
        }
      });
  }

  changeDefaultAddress() {
    let createInputs = [];
    this.addresses[0].addressList.forEach((element, i) => {
      let obj = {
        name: 'name'+i,
        type: 'radio',
        label: `${element.firstname} ${element.lastname}, #${element.house}, ${element.address}${element?.address1}`,
        value: element,
        checked: false
      };
      if (element == this.addresses[1].defaultAddress) {
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
          this.addresses[1].defaultAddress = dataReturnedFromModal.data.values;
        }
      });
  }

}
