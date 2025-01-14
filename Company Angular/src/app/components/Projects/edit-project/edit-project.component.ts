import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProject } from 'src/app/Models/IProject';
import { IEmployee } from 'src/app/Models/IEmployee';
import { ProjectService } from 'src/app/Services/project.service';
import { EmployeesService } from 'src/app/Services/employees.service';
import { EmployeeProjectService } from 'src/app/Services/employee-project.service';
import { LoadingService } from 'src/app/Services/shared/loading.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  project: IProject | null = null;
  projectId: number = 0;
  employees: IEmployee[] = [];
  selectedEmployees: IEmployee[] = [];
  errorMessages: string[] = [];
  selectedEmployeeId: number | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private employeesService: EmployeesService,
    private employeeProjectService: EmployeeProjectService,
    public router: Router , 
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadProject();
    this.loadAllEmployees();
    this.loadProjectEmployees();
  }

  loadProject(): void {
    this.loadingService.show() ;
    this.projectService.getByProjectId(this.projectId).subscribe({
      next: (data) => {
        this.project = data;
        this.errorMessages = [];
      },
      error: (error) => {
        console.log(error);
        this.errorMessages.push('Failed to load project.');
      }
    });
  }

  loadAllEmployees(): void {
    this.loadingService.show() ;
    this.employeesService.getAllEmployees().subscribe({
      next: (data) => {
        this.loadingService.hide() ;
        this.employees = data;
        this.errorMessages = [];
      },
      error: (error) => {
        this.loadingService.hide() ;
        console.log(error);
        this.errorMessages.push('Failed to load employees.');
      }
    });
  }

  loadProjectEmployees(): void {
    this.loadingService.show() ;
    this.employeeProjectService.getEmployeesByProjectId(this.projectId).subscribe({
      next: (data) => {
        this.loadingService.hide() ;
        this.selectedEmployees = data  
        this.errorMessages = [];  
      },
      error: (error) => {
        this.loadingService.hide() ;
        console.error(error);
        this.errorMessages.push('Failed to load project employees.');
      }
    });
  }

  onAddEmployee(): void {
    if (this.selectedEmployeeId !== null) {
      const employee = this.employees.find(e => e.id === this.selectedEmployeeId);
      if (employee && !this.selectedEmployees.some(e => e.id === employee.id)) {
        const employeeProject = { employeeId: employee.id, projectId: this.projectId };
        this.loadingService.show() ;
        this.employeeProjectService.addEmployeeProject(employeeProject).subscribe({
          next: () => {
            this.loadingService.hide() ;
            this.selectedEmployees.push(employee);
            this.selectedEmployeeId = null; // Clear selection
          },
          error: (error) => {
            this.loadingService.hide() ;
            console.log(error);
            this.errorMessages.push('Failed to add employee to project.');
          }
        });
      }
    }
  }

  onRemoveEmployee(employeeId: number): void {
    this.employeeProjectService.deleteEmployeeProject(employeeId, this.projectId).subscribe({
      next: () => {
        this.selectedEmployees = this.selectedEmployees.filter(e => e.id !== employeeId);
      },
      error: (error) => {
        console.log(error);
        this.errorMessages.push('Failed to remove employee from project.');
      }
    });
  }

  onUpdateProject(): void {
    if (this.project) {
      this.projectService.updateProject(this.project.id, this.project).subscribe({
        next: () => {
          this.router.navigate(['/projects']);
          this.errorMessages = [];
        },
        error: (error) => {
          console.log(error);
          this.errorMessages.push('Failed to update project.');
        }
      });
    }
  }
}
