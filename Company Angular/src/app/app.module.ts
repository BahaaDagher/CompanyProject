import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { EmployeesComponent } from './components/Employees/employees/employees.component';
import { DepartmentsComponent } from './components/Departments/departments/departments.component';
import { ProjectsComponent } from './components/Projects/projects/projects.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { EditEmployeeComponent } from './components/Employees/edit-employee/edit-employee.component';
import { AddEmployeeComponent } from './components/Employees/add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './components/Employees/employee-details/employee-details.component';
import { AddDepartmentComponent } from './components/Departments/add-department/add-department.component';
import { EditDepartmentComponent } from './components/Departments/edit-department/edit-department.component';
import { DepartmentDetailsComponent } from './components/Departments/department-details/department-details.component';
import { AddProjectComponent } from './components/Projects/add-project/add-project.component';
import { EditProjectComponent } from './components/Projects/edit-project/edit-project.component';
import { ProjectDetailsComponent } from './components/Projects/project-details/project-details.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { TokenInterceptor } from './Interceptors/token.service';
import { UserComponent } from './components/Identity/User/users/user.component';
import { UserAddingRoleComponent } from './components/Identity/User/user-adding-role/user-adding-role.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    EmployeesComponent,
    DepartmentsComponent,
    ProjectsComponent,
    NotFoundComponent,
    MainLayoutComponent,
    LoginComponent,
    EditEmployeeComponent,
    AddEmployeeComponent,
    EmployeeDetailsComponent,
    AddDepartmentComponent,
    EditDepartmentComponent,
    DepartmentDetailsComponent,
    AddProjectComponent,
    EditProjectComponent,
    ProjectDetailsComponent,
    RegisterComponent,
    UserComponent,
    UserAddingRoleComponent,
    LoadingComponent,
    ForbiddenComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
