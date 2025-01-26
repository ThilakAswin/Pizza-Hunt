import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  birthdate: string = '';
  mobileNumber: string = '';
  currentPlace: string = '';
  address: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    // Check if the email contains '@admin'
    if (this.email.includes('@admin')) {
      alert('Email cannot contain "@admin". Please use a different email address.'); // Alert the user
      return; // Stop further execution
    }

    const signupData = {
      name: this.name,
      email: this.email,
      birthdate: this.birthdate,
      mobileNumber: this.mobileNumber,
      currentPlace: this.currentPlace,
      address: this.address,
      password: this.password,
    };

    const apiUrl = 'http://localhost:8080/api/customers/signup'; // Adjust the URL as needed

    this.http.post(apiUrl, signupData).subscribe(
      response => {
        console.log('Signup successful:', response);
        this.router.navigate(['/login']); // Navigate to login page after successful signup
      },
      error => {
        console.error('Signup error:', error);
      }
    );
  }

  navigateToLogin() {
    this.router.navigate(['/login']); // Navigate to the login page
  }
}
