import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDepartment } from '../Models/IDepartment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private httpClient : HttpClient) { }

  getAllDepartments(): Observable<IDepartment[]> {
    return this.httpClient.get<IDepartment[]>(`${environment.APIURL}/Departments`);
  }
  getByDepartmentId(DepartmentId :number) : Observable<IDepartment>{
    return this.httpClient.get<IDepartment>(`${environment.APIURL}/Departments/${DepartmentId}`)
  }
  addDepartment( Department :IDepartment): Observable<IDepartment>{
    return this.httpClient.post<IDepartment>(`${environment.APIURL}/Departments` , Department) ; 
  }
  updateDepartment(DepartmentId : number , updatedDepartment : IDepartment) :  Observable<IDepartment> {
    return this.httpClient.put<IDepartment>(`${environment.APIURL}/Departments/${DepartmentId}` , updatedDepartment) ; 
  }
  deleteDepartment(DepartmentId :number):  Observable<IDepartment> {
    return this.httpClient.delete<IDepartment>(`${environment.APIURL}/Departments/${DepartmentId}` ) ; 
  }
}
