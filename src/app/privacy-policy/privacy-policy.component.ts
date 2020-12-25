import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent implements OnInit {

  @Input() modalData: any;
  @Input() renderPage: boolean = false;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.modalData);
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
