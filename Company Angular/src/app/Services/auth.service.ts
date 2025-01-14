import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuth } from '../Models/IAuth';
import { Observable } from 'rxjs';
import { ILogin } from '../Models/ILogin';
import { environment } from 'src/environments/environment';
import { IRegister } from '../Models/IRegister';
import { IAddRole } from '../Models/IAddRole';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 
  private apiUrl = `${environment.APIURL}/Auth`;
  constructor(private httpClient : HttpClient) { }

  login(loginInfo : ILogin): Observable<IAuth> {
    return this.httpClient.post<IAuth>(`${this.apiUrl}/login` , loginInfo);
  }
  register(registerInfo : IRegister) : Observable<IAuth>{
    return this.httpClient.post<IAuth>(`${this.apiUrl}/register` , registerInfo)
  }
  addRole( addRoleInfo :IAddRole): Observable<IAddRole>{
    return this.httpClient.post<IAddRole>(`${this.apiUrl}/addrole` , addRoleInfo) ; 
  }
}
