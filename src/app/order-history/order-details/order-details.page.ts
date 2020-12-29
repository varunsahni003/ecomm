import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpCallsService } from 'src/app/common/services/http-calls.service';
import { HelperService } from 'src/app/common/utilities/helper.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  apiUrl: string = environment.apiUrl;
  orderDetails: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpCallsService,
    private helperService: HelperService) { }

  ngOnInit() {
    this.route.params.subscribe(parameters => {
      this.http.fetch(`${this.apiUrl}/orderDetails${parameters.id}.json`).subscribe(res => {
        this.orderDetails = res;
        console.log('order details: ', this.orderDetails);
      });
    })
  }

}
