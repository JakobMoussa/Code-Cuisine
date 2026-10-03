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
  readonly ingredientUnit = signal('gram');

  readonly ingredients = signal<Ingredient[]>([]);

  readonly units = ['gram', 'kg', 'ml', 'liter', 'piece', 'tbsp', 'tsp', 'cup'];

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
