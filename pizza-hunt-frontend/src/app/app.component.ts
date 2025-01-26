import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav class="navbar">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Pizza Hunt</a>
        <div class="navbar-toggle" (click)="toggleNavbar()">
          <span class="toggle-icon"></span>
        </div>
        <div class="navbar-collapse" [ngClass]="{'active': isNavbarActive}">
          <ul class="navbar-nav">
            <li class="nav-item" *ngIf="userName">
              <span class="nav-link welcome">Welcome, {{ userName }}!</span>
            </li>
            <li class="nav-item logout" *ngIf="userName">
              <a class="nav-link" href="#" (click)="logout()">Logout</a>
            </li>
          </ul>
          <div class="user-actions">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" routerLink="/cart">
                  <i class="fas fa-shopping-cart"></i> 
                </a>
              </li>
              <li class="nav-item" *ngIf="!userName">
                <a class="nav-link" routerLink="/login">Login</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        color: #ffffff; /* White text */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .navbar-brand {
        font-size: 1.8rem;
        font-weight: bold;
        color: #ffcc00; /* Brand color */
        text-decoration: none;
      }

      .navbar-toggle {
        display: none;
        cursor: pointer;
      }

      .toggle-icon {
        width: 30px;
        height: 3px;
        background: #ffffff;
        margin: 6px 0;
        transition: all 0.3s ease;
      }

      .navbar-collapse {
        display: flex;
        align-items: center;
        justify-content: space-between; /* Space between left and right items */
        width: 100%;
      }

      .navbar-nav {
        list-style: none;
        display: flex;
        margin: 0;
        padding: 0;
      }

      .nav-item {
        margin-left: 2rem; /* Adjust spacing */
      }

      .nav-link {
        font-size: 1.2rem; /* Increased size */
        color: #ffffff; /* White text */
        text-decoration: none;
        padding: 0.5rem 1rem; /* Padding for better touch targets */
        border-radius: 5px;
        transition: background-color 0.3s, color 0.3s;
      }

      .nav-link:hover {
        background-color: #495057; /* Darker background on hover */
        color: #ffcc00; /* Change text color on hover */
      }

      .welcome {
        font-weight: bold;
        color: #28a745; /* Green color for welcome message */
      }

      .user-actions {
        display: flex;
        align-items: center;
      }

      @media (max-width: 768px) {
        .navbar-collapse {
          display: none;
          flex-direction: column;
          width: 100%;
          position: absolute;
          top: 60px;
          left: 0;
          background-color: #343a40; /* Match navbar color */
          border-top: 1px solid #dee2e6;
        }

        .navbar-collapse.active {
          display: flex;
        }

        .navbar-toggle {
          display: block;
        }

        .navbar-nav {
          flex-direction: column;
          align-items: flex-start;
        }

        .nav-item {
          margin: 0.5rem 0;
        }
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'Pizza Hunt';
  userName: string | null = null;
  isNavbarActive: boolean = false;

  ngOnInit() {
    const user = sessionStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userName = parsedUser.name; // Adjust according to the property you want to display
    }
  }

  toggleNavbar() {
    this.isNavbarActive = !this.isNavbarActive; // Toggle the navbar visibility
  }

  logout() {
    sessionStorage.removeItem('user');
    this.userName = null;
  }
}
