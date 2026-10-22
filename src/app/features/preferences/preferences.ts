import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';
import { RecipeStateService } from '../../core/services/recipe-state.service';

/**
 * Option item for cooking duration selection.
 */
export interface TimeOption {
  id: string;
  label: string;
  subtitle: string;
}

/**
 * Component for configuring recipe filtering criteria and cooking preferences.
 */
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

  /**
   * Increments the portion count by 1 up to a maximum of 6.
   */
  incrementPortions(): void {
    if (this.portions() < 6) {
      this.state.setPreferences({ portions: this.portions() + 1 });
    }
  }

  /**
   * Decrements the portion count by 1 down to a minimum of 1.
   */
  decrementPortions(): void {
    this.state.setPreferences({ portions: Math.max(1, this.portions() - 1) });
  }

  /**
   * Increments the cooking persons count up to a maximum of 3.
   */
  incrementPersons(): void {
    if (this.persons() < 3) {
      this.state.setPreferences({ cookingPersons: this.persons() + 1 });
    }
  }

  /**
   * Decrements the cooking persons count down to a minimum of 1.
   */
  decrementPersons(): void {
    this.state.setPreferences({ cookingPersons: Math.max(1, this.persons() - 1) });
  }

  /**
   * Updates the selected cooking time preference.
   *
   * @param cookingTime - Time key ('quick', 'medium', 'complex').
   */
  selectTime(cookingTime: string): void {
    this.state.setPreferences({ cookingTime });
  }

  /**
   * Updates the selected cuisine preference.
   *
   * @param cuisine - Chosen cuisine name (e.g. 'German', 'Italian').
   */
  selectCuisine(cuisine: string): void {
    this.state.setPreferences({ cuisine });
  }

  /**
   * Updates the selected dietary preference.
   *
   * @param diet - Dietary preference (e.g. 'Vegetarian', 'Vegan').
   */
  selectDiet(diet: string): void {
    this.state.setPreferences({ diet });
  }
}
