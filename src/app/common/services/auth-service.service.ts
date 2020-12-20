import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { Storage } from  '@ionic/storage';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  nodeApiUrl: string = environment.nodeApi;
  // headersFromService: any = {};
  
  constructor(
    private router: Router,
    private http: HttpClient,
    private  storage:  Storage) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(userId: string, password: string) {
    const options = { observe: 'response' as 'body' };
    return this.http.post<any>(`${this.nodeApiUrl}/api/auth/login`, {userId, password}, options)
      .pipe(map(response => {
        response.headers.lazyInit();
        console.log('res: ', response);
        // this.headersFromService = Array.from(response.headers.headers.entries());
        // sessionStorage.headersFromService = JSON.stringify(this.headersFromService);
        // sessionStorage.setItem('currentUser', JSON.stringify(response.body.user));
        this.storage.set("ACCESS_TOKEN", response.user.access_token);
        this.storage.set("EXPIRES_IN", response.user.expires_in);
        this.currentUserSubject.next(response.user);
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

  // logout() {
  //   sessionStorage.removeItem('currentUser');
  //   // sessionStorage.removeItem('headersFromService');
  //   this.currentUserSubject.next(null);
  //   this.router.navigate(['login']);
  // }

  async logout() {
    await this.storage.remove("ACCESS_TOKEN");
    await this.storage.remove("EXPIRES_IN");
    this.currentUserSubject.next(null);
    this.router.navigate(['login']);
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.nodeApiUrl}/api/auth/register`, user).pipe(
      tap(async (res:  any ) => {

        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.currentUserSubject.next(res.user);
          return res.user;
        }
      })

    );
  }

  isLoggedIn() {
    return this.currentUserSubject.asObservable();
  }
}
