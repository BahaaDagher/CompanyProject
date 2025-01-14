import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from 'src/app/Models/IEmployee';
import { EmployeesService } from 'src/app/Services/employees.service';
import { LoadingService } from 'src/app/Services/shared/loading.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: IEmployee | null = null;
  employeeId: number = 0;
  errorMessage: string | null = null; // Add property to display error messages
  loading : boolean = true ; 


  constructor(
      private activatedRoute: ActivatedRoute, // To access the route parameters
      private employeesService: EmployeesService, // To fetch and update employee details
      public router: Router, // To navigate between routes
      public loadingService: LoadingService
  ) {}

  
  ngOnInit(): void {
    // Fetch the employee ID from the route parameter
    this.employeeId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadEmployee();
  }

  loadEmployee(): void {
    this.loadingService.show() ;
    // Fetch the employee details from the service
    this.employeesService.getByEmployeeId(this.employeeId).subscribe({
      next: (data) => {
        this.loadingService.hide() ;
        this.employee = data; // Populate employees array
        this.errorMessage = null; // Clear any previous error message
        this.loading = false ; 
      },
      error: (error) => {
        this.loadingService.hide() ;
        console.error("Error loading employees:", error);
        this.errorMessage = "Failed to load employees."; // Set error message
        this.loading = false ;
      }
    }
    );
  }
}
