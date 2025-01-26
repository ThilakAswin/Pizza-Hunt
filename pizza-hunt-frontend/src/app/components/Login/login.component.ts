import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password
    };
  
    const customerApiUrl = 'http://localhost:8080/api/customers/login'; 
    const adminApiUrl = 'http://localhost:8080/api/admins/login'; 
  
    // First, try logging in as a customer
    this.http.post(customerApiUrl, loginData).subscribe(
      (response: any) => {
        if (response) {
          // Customer login successful
          sessionStorage.setItem('user', JSON.stringify(response)); // Store the user object
          this.router.navigate(['/home']).then(() => window.location.reload());
        }
      },
      (error) => {
        if (error.status === 401) {
          // Customer login failed, try logging in as an admin
          this.http.post(adminApiUrl, loginData).subscribe(
            (adminResponse: any) => {
              if (adminResponse) {
                // Admin login successful
                sessionStorage.setItem('admin', JSON.stringify(adminResponse)); // Store the admin object
                this.router.navigate(['/admin']).then(() => window.location.reload());
              }
            },
            (adminError) => {
              console.error('Admin login failed:', adminError);
              alert('Invalid credentials for both customer and admin. Please try again.');
            }
          );
        } else {
          console.error('Customer login error:', error);
          alert('An error occurred during customer login. Please try again.');
        }
      }
    );
  }
  

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
