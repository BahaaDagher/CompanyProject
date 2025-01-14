import { Component, OnInit } from '@angular/core';
import { IdentityService } from 'src/app/Services/identity.service';
import { IUser } from 'src/app/Models/IUser';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/Services/shared/loading.service';
import { SweetAlertService } from 'src/app/Services/sweet-alert.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: IUser[] = [];  // Array to hold users
  errorMessages: string[] = [];  // To show any error message if API fails


  constructor(
    private identityService: IdentityService , 
    private router : Router , 
    public loadingService: LoadingService , 
    private sweetAlertService: SweetAlertService , 
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  // Fetch users when the component initializes
  loadUsers(): void {
    this.loadingService.show() ;
    this.identityService.getUsers().subscribe({
      next: (data) => {
        this.loadingService.hide() ; 
        this.users = data;  // Assign response data to the users array
      },
      error: (error) => {
        this.loadingService.hide() ; 
        this.errorMessages.push( 'Failed to load users.');  
        console.error(error);
      }
    });
  }
  onDeleteUser(userId: string): void {
    this.sweetAlertService.confirm('Are you sure?', 'Do you really want to delete this user?').then((result) => {
      if (result) {
        // Proceed with the action
        this.loadingService.show() ;
        this.identityService.deleteUser(userId).subscribe({
          next: () => {
            this.loadingService.hide() ; 
            this.users = this.users.filter((user) => user.id !== userId);
            this.errorMessages = [];
          },
          error: (error) => {
            this.loadingService.hide() ; 
            console.error("Error deleting user:", error);
            this.errorMessages.push("Failed to delete the user.");
          }
        })
      }
    });
  }
  addRole(userId :string):void {
    this.router.navigate([`/users/${userId}/add-role`]);
  }
  
}
