// src/app/components/Departments/department-details/department-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../../../Services/department.service';
import { IDepartment } from '../../../Models/IDepartment';
import { LoadingService } from 'src/app/Services/shared/loading.service';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent implements OnInit {
  department: IDepartment | null = null;
  departmentId: number = 0;
  errorMessages : string[] = [] ; 


  constructor(
    private activatedRoute: ActivatedRoute,
    private departmentService: DepartmentService,
    public router: Router , 
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadDepartment();
  }
  
  loadDepartment(): void {
    this.loadingService.show() ;
    this.departmentId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.departmentService.getByDepartmentId(this.departmentId).subscribe({
      next: (data) => {
        this.loadingService.hide() ; 
        this.department = data;
      },  
      error : (error) =>{
        this.loadingService.hide() ; 
        console.log(error) ; 
        this.errorMessages.push("Failed to load Department") ; 
      }
    });
  }
}
