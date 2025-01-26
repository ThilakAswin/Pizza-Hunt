import { Routes } from '@angular/router';
import { HomeComponent } from './components/Home/home.component';
import { LoginComponent } from './components/Login/login.component';
import { CartComponent } from './components/Cart/cart.component';
import { SignupComponent } from './components/Signup/signup.component';
import { AdminComponent } from './components/Admin/admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'cart', component: CartComponent },
  { path: 'admin', component: AdminComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' } // Wildcard route for unknown paths
];
