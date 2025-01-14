import { SweetAlertService } from 'src/app/Services/sweet-alert.service';
import { Component, OnInit } from '@angular/core';
import { IProject } from '../../../Models/IProject';
import { ProjectService } from '../../../Services/project.service';
import { LoadingService } from 'src/app/Services/shared/loading.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: IProject[] = [];
  newProject: IProject = { id: 0, name: '' };
  errorMessages : string[] = [] ; 
  loading : boolean  = true ;

  constructor(private projectService: ProjectService , public loadingService: LoadingService , private sweetAlertService : SweetAlertService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loadingService.show() ;
    this.projectService.getAllProjects().subscribe({
      next : (data) => {
        this.loadingService.hide() ;
        this.projects = data;
        this.errorMessages = [] ; 
        this.loading = false ; 
      } , 
      error : (error)=>{
        this.loadingService.hide() ;
        this.errorMessages.push("Failed to load project.") ;
        this.loading = false ;  
      } 
    });
  }

  onDeleteProject(projectId: number): void {
    this.sweetAlertService.confirm('Are you sure?', 'Do you really want to delete this project?').then((result) => {
      if (result) {
        this.loadingService.show() ;
        this.projectService.deleteProject(projectId).subscribe({
          next: () => {
            this.loadingService.hide() ;
            this.projects = this.projects.filter((proj) => proj.id !== projectId);
            this.errorMessages = []; // Clear any previous error message
          },
          error: (error) => {
            this.loadingService.hide() ;
            console.error("Error deleting project :", error);
            this.errorMessages.push ( "Failed to delete the project."); // Set error message
          }
        });
      } 
    });

  }
}
