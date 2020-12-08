import { Component, OnInit } from '@angular/core';
import { HelperService } from '../common/utilities/helper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private helperService: HelperService) { }

  ngOnInit() {
    // this.http,push(dataToSend, {responseType: 'text'}).subscribe()
  }

  side_open() {

  }

}
