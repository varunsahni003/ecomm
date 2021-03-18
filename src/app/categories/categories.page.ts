import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpCallsService } from '../common/services/http-calls.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  apiUrl: string = environment.apiUrl;
  products: any;
  category: string;

  constructor(private route: ActivatedRoute, private http: HttpCallsService) { }

  ngOnInit() {
    this.route.params.subscribe(parameters => {
      console.log('params: ', parameters);
      this.category = parameters.id;
      this.http.fetch(`${this.apiUrl}/categories/${parameters.id}.json`).subscribe(res => {
        console.log('res: ', res);
        this.products = res;
      })
    });
  }

}
