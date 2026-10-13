import { Component, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';
import { RecipeStateService, Ingredient } from '../../core/services/recipe-state.service';

export type { Ingredient };

@Component({
  selector: 'app-ingredients',
  imports: [FormsModule, Navbar, RouterLink],
  templateUrl: './ingredients.html',
  styleUrl: './ingredients.scss',
})
export class Ingredients {
  private readonly state = inject(RecipeStateService);

  readonly ingredientName = signal('');
  readonly ingredientAmount = signal(100);
  readonly isOpen = signal(false);
  readonly ingredientUnit = signal('gram');

  readonly ingredients = this.state.ingredients;

  readonly units = ['ml', 'piece', 'gram'];

  readonly editingIndex = signal<number | null>(null);
  readonly editAmount = signal(100);
  readonly editUnit = signal('gram');
  readonly editDropdownOpen = signal(false);

  unitDisplay(unit: string): string {
    if (unit === 'gram' || unit === 'g') return 'g';
    return ' ' + unit;
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
    if (!name || !Number.isFinite(this.ingredientAmount()) || this.ingredientAmount() <= 0) return;

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
    this.editingIndex.update((editing) =>
      editing === null || editing < index ? editing : editing === index ? null : editing - 1,
    );
  }

  startEdit(index: number): void {
    const item = this.ingredients()[index];
    if (!item) return;
    this.editingIndex.set(index);
    this.editAmount.set(item.amount);
    this.editUnit.set(item.unit);
    this.editDropdownOpen.set(false);
  }

  saveEdit(index: number): void {
    if (!Number.isFinite(this.editAmount()) || this.editAmount() <= 0) return;
    this.ingredients.update((list) =>
      list.map((item, i) =>
        i === index
          ? { ...item, amount: this.editAmount(), unit: this.editUnit() }
          : item
      )
    );
    this.editingIndex.set(null);
  }

  cancelEdit(): void {
    this.editingIndex.set(null);
  }

  toggleEditDropdown(): void {
    this.editDropdownOpen.update((v) => !v);
  }

  selectEditUnit(unit: string): void {
    this.editUnit.set(unit);
    this.editDropdownOpen.set(false);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addIngredient();
    }
  }

  onEditKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.saveEdit(index);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.cancelEdit();
    }
  }
}
