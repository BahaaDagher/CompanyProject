import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from '../Models/IEmployee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private httpClient : HttpClient) { }

  getAllEmployees(): Observable<IEmployee[]> {
    return this.httpClient.get<IEmployee[]>(`${environment.APIURL}/Employees`);
  }
  getByEmployeeId(employeeId :number) : Observable<IEmployee>{
    return this.httpClient.get<IEmployee>(`${environment.APIURL}/Employees/${employeeId}`)
  }
  getByDepartmentId(departmentId : number ) : Observable<IEmployee[]>{
    return this.httpClient.get<IEmployee[]>(`${environment.APIURL}/Employees/getByDepartmentId?departmentId=${departmentId}`)
  }
  addEmployee( employee :IEmployee): Observable<IEmployee>{
    return this.httpClient.post<IEmployee>(`${environment.APIURL}/Employees` , employee) ; 
  }
  updateEmployee(employeeId : number , updatedEmployee : IEmployee) :  Observable<IEmployee> {
    return this.httpClient.put<IEmployee>(`${environment.APIURL}/Employees/${employeeId}` , updatedEmployee) ; 
  }
  deleteEmployee(employeeId :number):  Observable<IEmployee> {
    return this.httpClient.delete<IEmployee>(`${environment.APIURL}/Employees/${employeeId}` ) ; 
  }
}
