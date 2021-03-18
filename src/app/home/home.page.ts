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
    slidesPerView: 6,
    spaceBetween: 10,
    // effect: 'flip',
    // zoom: false
    // speed: 400,
    initialSlide: 0,
    loop: false
  };
  isSearch: boolean = false;
  categories: Array<any> = [
    "T-shirt",
    "Shirts",
    "Top",
    "Skirt",
    "Jeans",
    "Kurta",
    "Saree",
    "Dress"
  ];

  constructor(private helperService: HelperService, private _http: HttpCallsService) { }

  ngOnInit() {
    // this.http,push(dataToSend, {responseType: 'text'}).subscribe()
    this._http.fetch(`${this.apiUrl}/popular.json`).subscribe(res => {
      this.popular = res;
    });
  }

  ionSlidechange() {

  }

  preventDefault(event) {
    event.preventDefault();
  }

  cancelSearch() {
    this.isSearch = false;
  }

}
