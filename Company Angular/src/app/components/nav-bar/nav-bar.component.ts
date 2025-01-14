import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/Services/sweet-alert.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isAuthenticated = true;
  userName: string | null = null;
  isAdmin = false; 

  constructor(private router: Router, private sweetAlertService: SweetAlertService) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName'); 
    const roles = JSON.parse(localStorage.getItem('roles') || '[]'); 
    this.isAdmin = roles.includes('Admin'); 
  }

  onLogout(): void {
    this.sweetAlertService.confirm('Are you sure?', 'You will be logged out!!').then((result) => {
      if (result) {
        localStorage.removeItem('authToken'); // Remove the token
        localStorage.removeItem('roles'); // Optionally remove roles as well
        this.isAuthenticated = false; // Update the auth state
        this.router.navigate(['/login']); // Redirect to login page
      }
    });
  }
}
