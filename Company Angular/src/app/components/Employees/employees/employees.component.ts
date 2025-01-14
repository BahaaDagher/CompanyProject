import { SweetAlertService } from 'src/app/Services/sweet-alert.service';
import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../../../Models/IEmployee';
import { EmployeesService } from '../../../Services/employees.service';
import { LoadingService } from 'src/app/Services/shared/loading.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: IEmployee[] = [];
  newEmployee: IEmployee = { id: 0, name: '', ssn: '', salary: 0, departmentId: 0 };
  selectedEmployee: IEmployee | null = null;
  errorMessage: string | null = null; // Add property to display error messages
  constructor(private employeesService: EmployeesService , public loadingService: LoadingService , private sweetAlertService :SweetAlertService) {  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  // Method to load employees with error handling
  loadEmployees(): void {
    this.loadingService.show() ;
    this.employeesService.getAllEmployees().subscribe({
      next: (data) => {
        this.loadingService.hide() ; 
        this.employees = data; // Populate employees array
        this.errorMessage = null; // Clear any previous error message
      },
      error: (error) => {
        this.loadingService.hide() ; 
        console.error("Error loading employees:", error);
        this.errorMessage = "Failed to load employees."; // Set error message
      }
    });
  }

  // Method to select an employee
  onSelectEmployee(employee: IEmployee): void {
    this.selectedEmployee = { ...employee }; // Create a copy to edit
  }

  // Method to delete an employee with error handling
  onDeleteEmployee(employeeId: number): void {
    this.sweetAlertService.confirm('Are you sure?', 'Do you really want to delete this employee?').then((result) => {
      if (result) {
        this.loadingService.show() ;
        this.employeesService.deleteEmployee(employeeId).subscribe({
          next: () => {
            this.loadingService.hide() ; 
            this.employees = this.employees.filter((emp) => emp.id !== employeeId); // Remove deleted employee
            this.errorMessage = null; // Clear any previous error message
          },
          error: (error) => {
            this.loadingService.hide() ; 
            console.error("Error deleting employee:", error);
            this.errorMessage = "Failed to delete the employee."; // Set error message
          }
        });
      } 
    });
  }
}
