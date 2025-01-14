import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from '../../../Services/employees.service';
import { IEmployee } from '../../../Models/IEmployee';
import { DepartmentService } from 'src/app/Services/department.service';
import { IDepartment } from 'src/app/Models/IDepartment';
import { error } from 'console';
import { LoadingService } from 'src/app/Services/shared/loading.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employee: IEmployee | null = null;
  employeeId: number = 0;
  departments: IDepartment[] = []; // array to store departments
  errorMessages: string[] = []; // Initialize as an empty array

  

  constructor(
    private activatedRoute: ActivatedRoute, // To access the route parameters
    private employeesService: EmployeesService, // To fetch and update employee details
    private DepartmentService : DepartmentService , 
    public router: Router , // To navigate between routes
    public loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.loadEmployee();
    this.loadDepartments() ; 
  }
  
  loadEmployee(): void {
    // Fetch the employee ID from the route parameter
    this.employeeId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadingService.show() ;
    // Fetch the employee details from the service
    this.employeesService.getByEmployeeId(this.employeeId).subscribe({
      next : (data) => {
        this.loadingService.hide() ;
        this.employee = data;
        this.errorMessages = [] ; 
      } , 
      error : (error) =>{
        this.loadingService.hide() ;
        console.log(error) ; 
        this.errorMessages.push("Failed to load employee.") ; 
      } 
    });
  }
  loadDepartments(): void {
    this.loadingService.show() ;
    this.DepartmentService.getAllDepartments().subscribe({
      next: (data) => {
        this.loadingService.hide() ;
        this.departments = data; // Populate the departments array with fetched data
        this.errorMessages = []; // Clear any previous error messages
      },
      error: (error) => {
        this.loadingService.hide() ;
        console.error(error);
        this.errorMessages.push("Failed to load departments."); // Add error message to the array
      }
    });
  }

  // Method to handle employee update
  onUpdateEmployee(): void {
    this.loadingService.show() ;
    if (this.employee) {
      this.employeesService.updateEmployee(this.employee.id, this.employee).subscribe({
        next: (data) => {
          this.router.navigate(['/employees']); // Navigate back to the employees list page
          this.errorMessages = []; // Clear any previous error messages
        },
        error: (error) => {
          console.error("editing error", error);
          this.errorMessages = [];
          if (error.error.errors) {
            const validationErrors = error.error.errors; // Extract validation errors
            for (const field in validationErrors) {
              this.errorMessages.push(`${field}: ${validationErrors[field].join(', ')}`);
            }
          } else if (error.error) {
            this.errorMessages.push(error.error) ; 
          }
           else {
            // General error message for other cases
            this.errorMessages.push("Failed to update employee.");
          }
        }
      });
    }
  }
}
