import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';

export interface TimeOption {
  id: string;
  label: string;
  subtitle: string;
}

@Component({
  selector: 'app-preferences',
  imports: [Navbar, RouterLink],
  templateUrl: './preferences.html',
  styleUrl: './preferences.scss',
})
export class Preferences {
  readonly portions = signal(2);
  readonly persons = signal(1);

  readonly cookingTimes: TimeOption[] = [
    { id: 'quick', label: 'Quick', subtitle: 'ab to 20min' },
    { id: 'medium', label: 'Medium', subtitle: '25-40min' },
    { id: 'complex', label: 'Complex', subtitle: 'over 45min' },
  ];
  readonly selectedTime = signal<string>('quick');

  readonly cuisines: string[] = [
    'German',
    'Italian',
    'Indian',
    'Japanese',
    'Gourmet',
    'Fusion',
  ];
  readonly selectedCuisine = signal<string>('German');

  readonly dietPreferences: string[] = [
    'Vegetarian',
    'Vegan',
    'Keto',
    'No preferences',
  ];
  readonly selectedDiet = signal<string>('No preferences');

  incrementPortions(): void {
    this.portions.update((v) => v + 1);
  }

  decrementPortions(): void {
    this.portions.update((v) => (v > 1 ? v - 1 : 1));
  }

  incrementPersons(): void {
    this.persons.update((v) => v + 1);
  }

  decrementPersons(): void {
    this.persons.update((v) => (v > 1 ? v - 1 : 1));
  }

  selectTime(id: string): void {
    this.selectedTime.set(id);
  }

  selectCuisine(cuisine: string): void {
    this.selectedCuisine.set(cuisine);
  }

  selectDiet(diet: string): void {
    this.selectedDiet.set(diet);
  }
}
