import { Component, OnInit } from '@angular/core';
import { HttpCallsService } from '../common/services/http-calls.service';
import { HelperService } from '../common/utilities/helper.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  apiUrl: string = environment.apiUrl;
  popular: any;
  slideOptions = {
    effect: 'flip',
    zoom: false
  };

  constructor(private helperService: HelperService, private _http: HttpCallsService) { }

  ngOnInit() {
    // this.http,push(dataToSend, {responseType: 'text'}).subscribe()
    this._http.fetch(`${this.apiUrl}/popular.json`).subscribe(res => {
      this.popular = res;
      console.log('products: ', this.popular);
    });
  }

  side_open() {

  }

  ionSlidechange() {

  }

  preventDefault(event) {
    event.preventDefault();
  }

}
