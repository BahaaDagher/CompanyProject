import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IDepartment } from 'src/app/Models/IDepartment';
import { DepartmentService } from 'src/app/Services/department.service';
import { LoadingService } from 'src/app/Services/shared/loading.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent {
  newDepartment: IDepartment = { id: 0, name: '' ,employees:[] };
  errorMessages : string[] = [] ; 

  constructor(private departmentService: DepartmentService, public router: Router , public loadingService: LoadingService) { }

  onAddDepartment(): void {
    this.loadingService.show() ;
    this.departmentService.addDepartment(this.newDepartment).subscribe({
      next: (data) => {
        this.loadingService.hide() ;
        this.router.navigate(['/departments']); // Navigate to departments list page
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
        }else {
          // General error message for other cases
          this.errorMessages.push("Failed to add a new department.");
        }
      }
    });
  }
}
