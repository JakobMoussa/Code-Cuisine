import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../shared/navbar/navbar';

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

@Component({
  selector: 'app-ingredients',
  imports: [FormsModule, Navbar],
  templateUrl: './ingredients.html',
  styleUrl: './ingredients.scss',
})
export class Ingredients {
  readonly ingredientName = signal('');
  readonly ingredientAmount = signal(100);
  readonly isOpen = signal(false);
  readonly ingredientUnit = signal('gram');

  readonly ingredients = signal<Ingredient[]>([]);

  readonly units = ['ml', 'piece', 'gram'];

  unitDisplay(unit: string): string {
    if (unit === 'gram') return 'g';
    return unit;
  }

  toggleDropdown(): void {
    this.isOpen.update((v) => !v);
  }

  selectUnit(unit: string): void {
    this.ingredientUnit.set(unit);
    this.isOpen.set(false);
  }

  readonly hasIngredients = computed(() => this.ingredients().length > 0);

  addIngredient(): void {
    const name = this.ingredientName().trim();
    if (!name) return;

    this.ingredients.update((list) => [
      ...list,
      {
        name,
        amount: this.ingredientAmount(),
        unit: this.ingredientUnit(),
      },
    ]);

    this.ingredientName.set('');
    this.ingredientAmount.set(100);
  }

  removeIngredient(index: number): void {
    this.ingredients.update((list) => list.filter((_, i) => i !== index));
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addIngredient();
    }
  }
}
