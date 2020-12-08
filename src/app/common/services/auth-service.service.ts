import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  // headersFromService: any = {};
  
  constructor(private _http: HttpClient, private router: Router, private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(userId: string, password: string) {
    const options = { observe: 'response' as 'body' };
    return this.http.post<any>(`${environment.loginApiUrl}`, {userId, password}, options)
      .pipe(map(response => {
        response.headers.lazyInit();
        console.log('res: ', response);
        // this.headersFromService = Array.from(response.headers.headers.entries());
        // sessionStorage.headersFromService = JSON.stringify(this.headersFromService);
        sessionStorage.setItem('currentUser', JSON.stringify(response.body.user));
        this.currentUserSubject.next(response.body.user);
        return response.body.user;
      }));
  }

  parse_link_header(header) {
    if(header.length == 0) {
      return;
    }
    let parts = header.split(';');
    var links = {};
    parts.forEach(p => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;
    });
    return links;
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    // sessionStorage.removeItem('headersFromService');
    this.currentUserSubject.next(null);
    this.router.navigate(['login']);
  }
}
