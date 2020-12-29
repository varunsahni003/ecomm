import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss'],
})
export class AddAddressComponent implements OnInit {

  submitted: boolean = false;
  stateList = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu & Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Puducherry",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ];
  @Input() modalData: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    if (!this.modalData.lastname) {
      this.modalData.lastname = ''
    } else if (!this.modalData.address1) {
      this.modalData.address1 = ''
    } else if (!this.modalData.street) {
      this.modalData.street = ''
    }
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  addNewAddress(form) {
    console.log(form);
    this.submitted = true;
    if (!form.valid) {
      return;
    }
    this.modalCtrl.dismiss(form.value, 'submit');
  }

}
