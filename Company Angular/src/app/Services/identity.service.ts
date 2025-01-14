import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../Models/IUser';
import { IRole } from '../Models/IRole';

@Injectable({
  providedIn: 'root'
})

export class IdentityService {

  private apiUrl = `${environment.APIURL}`;
  constructor(private httpClient : HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`${this.apiUrl}/Users`);
  }
  deleteUser(userID : string): Observable<IUser> {
    return this.httpClient.delete<IUser>(`${this.apiUrl}/Users/${userID}`);
  }
  getRoles() : Observable<IRole[]>{
    return this.httpClient.get<IRole[]>(`${this.apiUrl}/Roles`)
  }
}
