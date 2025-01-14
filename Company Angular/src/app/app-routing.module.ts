import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './components/Employees/employees/employees.component';
import { DepartmentsComponent } from './components/Departments/departments/departments.component';
import { ProjectsComponent } from './components/Projects/projects/projects.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddEmployeeComponent } from './components/Employees/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/Employees/edit-employee/edit-employee.component';
import { EmployeeDetailsComponent } from './components/Employees/employee-details/employee-details.component';
import { AddDepartmentComponent } from './components/Departments/add-department/add-department.component';
import { DepartmentDetailsComponent } from './components/Departments/department-details/department-details.component';
import { EditDepartmentComponent } from './components/Departments/edit-department/edit-department.component';
import { AddProjectComponent } from './components/Projects/add-project/add-project.component';
import { ProjectDetailsComponent } from './components/Projects/project-details/project-details.component';
import { EditProjectComponent } from './components/Projects/edit-project/edit-project.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { AuthGuard } from './Guards/auth.guard';
import { UserComponent } from './components/Identity/User/users/user.component';
import { UserAddingRoleComponent } from './components/Identity/User/user-adding-role/user-adding-role.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { UsersAuthGuard } from './Guards/users-auth.guard';


const routes: Routes = [
  {path :'', component: MainLayoutComponent , children:[
    { path: '',  redirectTo:'/employees' , pathMatch:"full" }, // Default route
    // employees routs
    { path: 'employees', component: EmployeesComponent   , canActivate: [AuthGuard]}, 
    { path: 'employees/add', component: AddEmployeeComponent , canActivate: [AuthGuard]}, 
    { path: 'employees/edit/:id', component: EditEmployeeComponent  , canActivate: [AuthGuard]}, 
    { path: 'employees/details/:id', component: EmployeeDetailsComponent , canActivate: [AuthGuard] }, 
    // departments routs
    { path: 'departments', component: DepartmentsComponent , canActivate: [AuthGuard]}, 
    { path: 'departments/add', component: AddDepartmentComponent , canActivate: [AuthGuard]},
    { path: 'departments/details/:id', component: DepartmentDetailsComponent , canActivate: [AuthGuard]},
    { path: 'departments/edit/:id', component: EditDepartmentComponent , canActivate: [AuthGuard]},
    // projects routes
    { path: 'projects', component: ProjectsComponent , canActivate: [AuthGuard]}, 
    { path: 'projects/add', component: AddProjectComponent , canActivate: [AuthGuard]},
    { path: 'projects/details/:id', component: ProjectDetailsComponent , canActivate: [AuthGuard]},
    { path: 'projects/edit/:id', component: EditProjectComponent , canActivate: [AuthGuard] },
    {path: "users" , component:UserComponent  , canActivate: [UsersAuthGuard]} , 
    {path: "users/:id/add-role" , component:UserAddingRoleComponent  , canActivate: [UsersAuthGuard]} , 
  ]} , 
  {path: "login" , component:LoginComponent } , 
  {path: "register" , component:RegisterComponent} , 
  { path: 'forbidden', component: ForbiddenComponent }, 
  {path: "**" , component:NotFoundComponent} , 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
