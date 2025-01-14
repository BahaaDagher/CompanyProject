import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEmployeeProject } from '../Models/IEmployeeProject';
import { IEmployee } from '../Models/IEmployee';
import { IProject } from '../Models/IProject';

@Injectable({
  providedIn: 'root'
})
export class EmployeeProjectService {
  private apiUrl = `${environment.APIURL}/EmpolyeesProjects`;

  constructor(private httpClient: HttpClient) {}

  // Get all employee-project associations
  getAllEmployeeProjects(): Observable<IEmployeeProject[]> {
    return this.httpClient.get<IEmployeeProject[]>(this.apiUrl);
  }

  // Get projects by employee ID
  getProjectsByEmployeeId(employeeId: number): Observable<IProject[]> {
    return this.httpClient.get<IProject[]>(`${this.apiUrl}/employee/${employeeId}`);
  }

  // Get employees by project ID
  getEmployeesByProjectId(projectId: number): Observable<IEmployee[]> {
    return this.httpClient.get<IEmployee[]>(`${this.apiUrl}/project/${projectId}`);
  }

  // Add a new employee-project association
  addEmployeeProject(employeeProject: IEmployeeProject): Observable<IEmployeeProject> {
    return this.httpClient.post<IEmployeeProject>(this.apiUrl, employeeProject);
  }

  // Update an employee-project association
  updateEmployeeProject(
    employeeId: number,
    projectId: number,
    updatedAssociation: IEmployeeProject
  ): Observable<IEmployeeProject> {
    return this.httpClient.put<IEmployeeProject>(`${this.apiUrl}/${employeeId}/${projectId}`, updatedAssociation);
  }

  // Delete an employee-project association
  deleteEmployeeProject(employeeId: number, projectId: number): Observable<IEmployeeProject> {
    return this.httpClient.delete<IEmployeeProject>(`${this.apiUrl}/${employeeId}/${projectId}`);
  }
}
