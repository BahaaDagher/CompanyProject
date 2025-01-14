import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from 'src/app/Services/department.service';
import { IDepartment } from 'src/app/Models/IDepartment';
import { LoadingService } from 'src/app/Services/shared/loading.service';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {
  department: IDepartment | null = null;
  departmentId: number = 0;
  errorMessages : string[] = [] ; 


  constructor(
    private activatedRoute: ActivatedRoute, // To access the route parameters
    private departmentService: DepartmentService, // To fetch and update department details
    public router: Router  , // To navigate between routes
    public loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    // Fetch the department ID from the route parameter
    this.departmentId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadDepartment();
  }

  loadDepartment(): void {
    // Fetch the department details from the service
    this.departmentService.getByDepartmentId(this.departmentId).subscribe({
      next : (data) => {
        this.department = data;
        this.errorMessages = [] ; 
      } , 
      error : (error) =>{
        console.log(error) ; 
        this.errorMessages.push("Failed to load department.") ; 
      } 
    });
  }

  // Method to handle department update
  onUpdateDepartment(): void {
    if (this.department) {
      this.loadingService.show() ;
      this.departmentService.updateDepartment(this.department.id, this.department).subscribe({
        next: (data) => {
          this.loadingService.hide() ;
          this.router.navigate(['/departments']); // Navigate back to the dep list page
          this.errorMessages = []; // Clear any previous error messages
        },
        error: (error) => {
          this.loadingService.hide() ;
          console.error("editing error", error);
          this.errorMessages = [];
          if (error.error.errors) {
            const validationErrors = error.error.errors; // Extract validation errors
            for (const field in validationErrors) {
              this.errorMessages.push(`${field}: ${validationErrors[field].join(', ')}`);
            }
          } else {
            // General error message for other cases
            this.errorMessages.push("Failed to update department.");
          }
        }
      });
    }
  }
}
