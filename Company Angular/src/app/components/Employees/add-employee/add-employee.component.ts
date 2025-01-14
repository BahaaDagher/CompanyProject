import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from 'src/app/Models/IEmployee';
import { EmployeesService } from 'src/app/Services/employees.service';
import { DepartmentService } from 'src/app/Services/department.service'; // import department service
import { IDepartment } from 'src/app/Models/IDepartment'; // import department model
import { LoadingService } from 'src/app/Services/shared/loading.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  newEmployee: IEmployee = { id: 0, name: '', ssn: '', salary: 0, departmentId: 0 };
  departments: IDepartment[] = []; // array to store departments
  errorMessages: string[] = []; // Initialize as an empty array

  constructor(
    private employeesService: EmployeesService,
    private departmentService: DepartmentService, // inject department service
    public router: Router , 
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadDepartments(); // Load departments when the component initializes
  }

  // Method to load departments
  loadDepartments(): void {
    this.loadingService.show() 
    this.departmentService.getAllDepartments().subscribe({
      next: (data) => {
        this.loadingService.hide() ;
        this.departments = data; // Populate the departments array with fetched data
        this.errorMessages = []; // Clear any previous error messages
      },
      error: (error) => {
        this.loadingService.hide() ;
        console.error(error);
        this.errorMessages.push("Failed to load departments. Please try again later."); // Add error message to the array
      }
    });
  }

  onAddEmployee(): void {
    this.loadingService.show() 
    this.employeesService.addEmployee(this.newEmployee).subscribe({
      next: (data) => {
        this.loadingService.hide() ;
        this.router.navigate(['/employees']); // Navigate back to the employees list page
        this.errorMessages = []; // Clear any previous error messages
      },
      error: (error) => {
        this.loadingService.hide() ;
        console.error("Adding error", error);
        this.errorMessages = [];
        if (error.error.errors) {
          const validationErrors = error.error.errors; // Extract validation errors
          for (const field in validationErrors) {
            if (validationErrors.hasOwnProperty(field)) {
              this.errorMessages.push(`${field}: ${validationErrors[field].join(', ')}`);
            }
          }
        } else if (error.error) {
          this.errorMessages.push(error.error) ; 
        }
         else {
          // General error message for other cases
          this.errorMessages.push("Failed to add a new employee.");
        }
      }
    });
  }
}
