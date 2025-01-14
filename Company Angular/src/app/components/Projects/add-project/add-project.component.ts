import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IProject } from 'src/app/Models/IProject';
import { ProjectService } from 'src/app/Services/project.service';
import { LoadingService } from 'src/app/Services/shared/loading.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {
  newProject: IProject = { id: 0, name: '' };
  errorMessages : string[] = [] ; 

  constructor(private projectService: ProjectService, public router: Router , public loadingService: LoadingService  ) { }

  onAddProject(): void {
    this.loadingService.show() ;
    this.projectService.addProject(this.newProject).subscribe({
      next: (data) => {
        this.loadingService.hide() ; 
        this.router.navigate(['/projects']); // Navigate back to the projects list page
        this.errorMessages = []; // Clear any previous error messages
      },
      error: (error) => {
        this.loadingService.hide() ; 
        console.error("Adding error", error);
        this.errorMessages = [];
        if (error.error.errors) {
          const validationErrors = error.error.errors; // Extract validation errors
          for (const field in validationErrors) {
            this.errorMessages.push(`${field}: ${validationErrors[field].join(', ')}`);
          }
        } else {
          // General error message for other cases
          this.errorMessages.push("Failed to add a new project.");
        }
      }
    });
  }
}
