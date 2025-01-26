import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  pizzaForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.pizzaForm = this.fb.group({
      id: [''], // Add ID field to the form
      name: ['', Validators.required],
      type: ['', Validators.required],
      description: [''],
      price: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['']
    });
  }

  onAddPizza(): void {
    if (this.pizzaForm.valid) {
      const newPizza = this.pizzaForm.value;
      this.http.post('http://localhost:8080/api/pizzas', newPizza).subscribe({
        next: (response) => {
          alert('Pizza added successfully!');
          this.pizzaForm.reset();
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error adding pizza:', error);
          alert('Failed to add pizza. Please try again.');
        }
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }

  onDeletePizza(pizzaId: string): void {
    if (pizzaId) {
      this.http.delete(`http://localhost:8080/api/pizzas/${pizzaId}`).subscribe({
        next: (response) => {
          alert('Pizza deleted successfully!');
        },
        error: (error) => {
          console.error('Error deleting pizza:', error);
          alert('Failed to delete pizza. Please try again.');
        }
      });
    } else {
      alert('Please enter a pizza ID to delete.');
    }
  }

  onFetchPizza(pizzaId: string): void {
    if (pizzaId) {
      this.http.get(`http://localhost:8080/api/pizzas/${pizzaId}`).subscribe({
        next: (pizza) => {
          this.pizzaForm.patchValue(pizza); // Populate form with pizza data
        },
        error: (error) => {
          console.error('Error fetching pizza:', error);
          alert('Failed to fetch pizza. Please try again.');
        }
      });
    } else {
      alert('Please enter a pizza ID to fetch.');
    }
  }

  onUpdatePizza(): void {
    if (this.pizzaForm.valid) {
      const updatedPizza = this.pizzaForm.value;
      const pizzaId = updatedPizza.id; // Use the ID from the form
      this.http.put(`http://localhost:8080/api/pizzas/${pizzaId}`, updatedPizza).subscribe({
        next: (response) => {
          alert('Pizza updated successfully!');
          this.pizzaForm.reset(); // Reset the form after updating
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error updating pizza:', error);
          alert('Failed to update pizza. Please try again.');
        }
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
