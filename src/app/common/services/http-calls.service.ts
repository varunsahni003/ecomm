import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {

  constructor(private _http: HttpClient) {}

  fetch(url) {
    return this._http.get(url).pipe(map(data => data), catchError((e: any) => Observable.throw(this.handleError(e))));
  }

  postReq(url, value) {
    return this._http.post(url ,value).pipe(map(data => data), catchError((e: any) => Observable.throw(this.handleError(e))));
  }

  private handleError(error: any): void {
    // this._showGlobalLoader.setData(false);
  }
}
