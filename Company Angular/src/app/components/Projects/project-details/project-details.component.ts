import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProject } from 'src/app/Models/IProject';
import { IEmployee } from 'src/app/Models/IEmployee';
import { ProjectService } from 'src/app/Services/project.service';
import { EmployeeProjectService } from 'src/app/Services/employee-project.service';
import { LoadingService } from 'src/app/Services/shared/loading.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project: IProject | null = null;
  projectId: number = 0;
  errorMessages : string[] = [] ; 
  employees: IEmployee[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private employeeProjectService : EmployeeProjectService , 
    public router: Router , 
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadProject();
    this.loadProjectEmployees() ; 
  }
  
  loadProject(): void {
    this.projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadingService.show() ;
    this.projectService.getByProjectId(this.projectId).subscribe({
      next: (data) => {
        this.loadingService.hide() ;
        this.project = data;
      },  
      error : (error) =>{
        this.loadingService.hide() ;
        console.log(error) ; 
        this.errorMessages.push("Failed to load project") ; 
      }
    });
  }
  loadProjectEmployees(): void {
    this.loadingService.show() ;
    this.employeeProjectService.getEmployeesByProjectId(this.projectId).subscribe({
      next: (data) => {
        this.loadingService.hide() ;
        console.log(data)
        this.employees = data  
        this.errorMessages = [];  
      },
      error: (error) => {
        this.loadingService.hide() ;
        console.error(error);
        this.errorMessages.push('Failed to load project employees.');
      }
    });
  }
}
