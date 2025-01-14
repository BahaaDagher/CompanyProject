import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAddRole } from 'src/app/Models/IAddRole';
import { IRole } from 'src/app/Models/IRole';
import { AuthService } from 'src/app/Services/auth.service';
import { IdentityService } from 'src/app/Services/identity.service';
import { LoadingService } from 'src/app/Services/shared/loading.service';


@Component({
  selector: 'app-user-adding-role',
  templateUrl: './user-adding-role.component.html',
  styleUrls: ['./user-adding-role.component.css']
})
export class UserAddingRoleComponent implements OnInit {

  userId: string = '';
  roles: IRole[] = [];  // List of roles
  selectedRoleId: string = '';  // To hold the selected role ID
  errorMessages : string[] = [] ; 

  constructor(
    private activatedRoute: ActivatedRoute,
    public router : Router , 
    private identityService: IdentityService,
    private authService: AuthService   , 
    public loadingService: LoadingService , 

  ) { }

  ngOnInit(): void {
    // Get the userId from route parameters
    this.userId = String(this.activatedRoute.snapshot.paramMap.get('id'));

    // Fetch roles
    this.fetchRoles();
  }

  // Fetch roles from the service
  fetchRoles(): void {
    this.loadingService.show() ;
    this.identityService.getRoles().subscribe({
      next: (roles) => {
        this.loadingService.hide() ;
        console.log("roles" , roles)
        this.roles = roles;  // Store the fetched roles in the array
      },
      error: (error) => {
        this.loadingService.hide() ;
        this.errorMessages = [] 
        console.error('Error fetching roles:', error);
        this.errorMessages.push("loading Roles failed...") ; 
      }
      
    });
  }

  // Handle adding role to the user
  addRole(): void {
    const addRoleInfo: IAddRole = {
      userId: this.userId,
      roleId: this.selectedRoleId
    };
    this.loadingService.show() ;
    this.authService.addRole(addRoleInfo).subscribe({
      next: (data) => {
        this.loadingService.hide() ;
        this.router.navigate(['/users']);
        this.errorMessages = [];
        alert('Role added successfully');

      },
      error: (error) => {
        this.loadingService.hide() ;
        console.error("add Role", error);
        this.errorMessages = [];
        // Check for status code to display specific error messages
        if (error.status === 403) {
          this.errorMessages.push("You must be an admin to add a role.");
        } else if(error.error) {
          this.errorMessages.push(error.error) ;
        } else if (error.error.errors) {
          // Extract validation errors if present
          const validationErrors = error.error.errors;
          for (const field in validationErrors) {
            this.errorMessages.push(`${field}: ${validationErrors[field].join(', ')}`);
          }
        } else {
          // General error message for other cases
          this.errorMessages.push("Failed to update role.");
        }
      }
    });
  }
  
}
