import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProject } from '../Models/IProject';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient : HttpClient) { }
  
  getAllProjects(): Observable<IProject[]> {
    return this.httpClient.get<IProject[]>(`${environment.APIURL}/Projects`);
  }
  getByProjectId(ProjectId :number) : Observable<IProject>{
    return this.httpClient.get<IProject>(`${environment.APIURL}/Projects/${ProjectId}`)
  }
  addProject( Project :IProject): Observable<IProject>{
    return this.httpClient.post<IProject>(`${environment.APIURL}/Projects` , Project) ; 
  }
  updateProject(ProjectId : number , updatedProject : IProject) :  Observable<IProject> {
    return this.httpClient.put<IProject>(`${environment.APIURL}/Projects/${ProjectId}` , updatedProject) ; 
  }
  deleteProject(ProjectId :number):  Observable<IProject> {
    return this.httpClient.delete<IProject>(`${environment.APIURL}/Projects/${ProjectId}` ) ; 
  }
}
