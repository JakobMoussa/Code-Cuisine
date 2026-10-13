import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';
import { RecipeStateService } from '../../core/services/recipe-state.service';

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
  private readonly state = inject(RecipeStateService);

  readonly portions = computed(() => this.state.preferences().portions);
  readonly persons = computed(() => this.state.preferences().cookingPersons);

  readonly cookingTimes: TimeOption[] = [
    { id: 'quick', label: 'Quick', subtitle: 'ab to 20min' },
    { id: 'medium', label: 'Medium', subtitle: '25-40min' },
    { id: 'complex', label: 'Complex', subtitle: 'over 45min' },
  ];
  readonly selectedTime = computed(() => this.state.preferences().cookingTime);

  readonly cuisines: string[] = [
    'German',
    'Italian',
    'Indian',
    'Japanese',
    'Gourmet',
    'Fusion',
  ];
  readonly selectedCuisine = computed(() => this.state.preferences().cuisine);

  readonly dietPreferences: string[] = [
    'Vegetarian',
    'Vegan',
    'Keto',
    'No preferences',
  ];
  readonly selectedDiet = computed(() => this.state.preferences().diet);

  incrementPortions(): void {
    this.state.setPreferences({ portions: this.portions() + 1 });
  }

  decrementPortions(): void {
    this.state.setPreferences({ portions: Math.max(1, this.portions() - 1) });
  }

  incrementPersons(): void {
    this.state.setPreferences({ cookingPersons: this.persons() + 1 });
  }

  decrementPersons(): void {
    this.state.setPreferences({ cookingPersons: Math.max(1, this.persons() - 1) });
  }

  selectTime(cookingTime: string): void {
    this.state.setPreferences({ cookingTime });
  }

  selectCuisine(cuisine: string): void {
    this.state.setPreferences({ cuisine });
  }

  selectDiet(diet: string): void {
    this.state.setPreferences({ diet });
  }
}
