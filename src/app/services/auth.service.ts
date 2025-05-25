import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {jwtDecode} from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  accessToken!: string ;
  isAuthenticated: boolean = false;
  roles: any;
  username: any;
  password: any;


  constructor(private http: HttpClient) {
  }

  public login(username: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.http.post("http://localhost:8085/auth/login", body.toString(), { headers });
  }


  public loadProfile(data: any) {
    this.isAuthenticated = true;
    this.accessToken = data["access-token"];
    let decodeJwt:any=jwtDecode(this.accessToken);
   this.roles = decodeJwt.scope;
   this.username = decodeJwt.sub;

  }
}
