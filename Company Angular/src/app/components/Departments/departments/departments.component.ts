import { SweetAlertService } from 'src/app/Services/sweet-alert.service';
import { Component, OnInit } from '@angular/core';
import { IDepartment } from '../../../Models/IDepartment';
import { DepartmentService } from '../../../Services/department.service';
import { LoadingService } from 'src/app/Services/shared/loading.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
})
export class DepartmentsComponent implements OnInit {
  departments: IDepartment[] = [];
  newDepartment: IDepartment = { id: 0, name: '' ,employees:[]};
  errorMessages : string[] = [] ; 


  constructor(
    private departmentService: DepartmentService , 
    public loadingService: LoadingService ,
    private sweetAlertService :SweetAlertService
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.loadingService.show() ;
    this.departmentService.getAllDepartments().subscribe({
      next : (data) => {
        this.loadingService.hide() ;
        this.departments = data;
      } , 
      error : (error)=>{
        this.loadingService.hide() ;
        this.errorMessages.push("Failed to load Departments") ;  
      } 
    });
  }



  onDeleteDepartment(departmentId: number): void {
    this.sweetAlertService.confirm('Are you sure?', 'Do you really want to delete this Department?').then((result) => {
      if (result) {
        this.loadingService.show() ;
        this.departmentService.deleteDepartment(departmentId).subscribe({
          next: () => {
            this.loadingService.hide() ;
            this.departments = this.departments.filter((dep) => dep.id !== departmentId);
            this.errorMessages = []; // Clear any previous error message
          },
          error: (error) => {
            this.loadingService.hide() ;
            console.error("Error deleting employee:", error);
            this.errorMessages.push ( "Failed to delete the employee."); // Set error message
          }
        });
      }
    });
  }
}
