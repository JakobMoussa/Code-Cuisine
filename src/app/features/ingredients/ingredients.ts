import { Component, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';
import { RecipeStateService, Ingredient } from '../../core/services/recipe-state.service';

export type { Ingredient };

/**
 * Ingredients page component managing user input for available pantry ingredients.
 */
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

  readonly commonIngredients = [
    'Bacon',
    'Beef',
    'Beef tenderloin',
    'Chicken breast',
    'Chicken',
    'Chicken wings',
    'Duck breast',
    'Ground beef',
    'Pork',
    'Ground turkey',
    'Ham',
    'Lamb chops',
    'Lamb shank',
    'Pancetta',
    'Pastrami',
    'Pork chops',
    'Pork loin',
    'Prosciutto',
    'Salami',
    'Sausage',
    'Steak',
    'Turkey breast',
    'Veal cutlet',

    'Anchovies',
    'Calamari',
    'Cod fish',
    'Meat',
    'Halibut',
    'Lobster',
    'Mussels',
    'Salmon fillet',
    'Sardines',
    'Scallops',
    'Sea bass',
    'Shrimp',
    'Trout',
    'Tuna steak',

    'Artichoke',
    'Asparagus',
    'Avocado',
    'Bell pepper',
    'Broccoli',
    'Brussels sprouts',
    'Cabbage',
    'Carrots',
    'Cauliflower',
    'Celery',
    'Chili pepper',
    'Corn',
    'Cucumber',
    'Eggplant',
    'Garlic',
    'Green beans',
    'Kale',
    'Leek',
    'Lettuce',
    'Mushrooms (Champignon)',
    'Onion',
    'Paprika',
    'Peas',
    'Potatoes',
    'Butternut',
    'Radish',
    'Spring onion',
    'Shallots',
    'Spinach',
    'Sweet potatoes',
    'Tomatoes',
    'Tomato paste',
    'Zucchini',
    'Salat',
    'Pesto',

    'Cheddar',
    'Cheese',
    'Eggs',
    'Feta cheese',
    'Gorgonzola',
    'Gouda',
    'Heavy cream',
    'Milk',
    'Mozzarella',
    'Oat milk',
    'Parmesan',
    'Ricotta',
    'Sour cream',
    'Tofu',
    'Yogurt (Greek)',

    'Basmati rice',
    'Bread / Toast',
    'Breadcrumbs',
    'Brown rice',
    'Couscous',
    'Flour',
    'Gnocchi',
    'Jasmine rice',
    'Noodles',
    'Oats',
    'Pasta',
    'Pasta (Penne)',
    'Pasta (Spaghetti)',
    'Quinoa',
    'Rice',
    'Tortilla wraps',

    'Basil (Fresh)',
    'Bay leaves',
    'Chili flakes',
    'Cilantro / Fresh coriander',
    'Cinnamon',
    'Cumin',
    'Curry powder',
    'Dill',
    'Ginger (Fresh)',
    'Nutmeg',
    'Oregano',
    'Parsley',
    'Pepper (Black)',
    'Rosemary',
    'Salt',
    'Thyme',

    'Balsamic vinegar',
    'Oil',
    'Butter',
    'Coconut milk',
    'Dijon mustard',
    'Honey',
    'Mayonnaise',
    'Olive oil',
    'Pesto (Green)',
    'Pesto (Red)',
    'Sesame oil',
    'Soy sauce',
    'Sugar',
    'Vegetable broth',
    'Worcestershire sauce',
  ];

  readonly editingIndex = signal<number | null>(null);
  readonly editAmount = signal(100);
  readonly editUnit = signal('gram');
  readonly editDropdownOpen = signal(false);

  /**
   * Converts a unit identifier into a user-friendly display string.
   *
   * @param unit - Unit identifier ('gram', 'g', etc.).
   * @returns Formatted unit text.
   */
  unitDisplay(unit: string): string {
    if (unit === 'gram' || unit === 'g') return 'g';
    return ' ' + unit;
  }

  /**
   * Toggles visibility of the new ingredient unit dropdown menu.
   */
  toggleDropdown(): void {
    this.isOpen.update((v) => !v);
  }

  readonly maxServingAmount = computed(() => (this.ingredientUnit() === 'piece' ? 15 : 1000));
  readonly maxEditAmount = computed(() => (this.editUnit() === 'piece' ? 15 : 1000));

  /**
   * Selects a unit for the new ingredient and adjusts amounts accordingly.
   *
   * @param unit - The selected unit ('ml', 'piece', 'gram').
   */
  selectUnit(unit: string): void {
    this.ingredientUnit.set(unit);
    this.isOpen.set(false);
    const max = unit === 'piece' ? 15 : 1000;
    if (this.ingredientAmount() > max) {
      this.ingredientAmount.set(unit === 'piece' ? 1 : max);
    } else if (unit === 'piece' && this.ingredientAmount() === 100) {
      this.ingredientAmount.set(1);
    }
  }

  /**
   * Handles user typing in the amount input field, enforcing min and max bounds.
   *
   * @param event - The input DOM event.
   */
  onAmountInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input) return;
    const max = this.maxServingAmount();
    if (input.value === '') return;
    const val = Number(input.value);
    if (val > max) {
      input.value = String(max);
      this.ingredientAmount.set(max);
    } else if (val < 1) {
      input.value = '1';
      this.ingredientAmount.set(1);
    } else {
      this.ingredientAmount.set(val);
    }
  }

  /**
   * Handles blur on the amount input, resetting invalid values to sensible defaults.
   *
   * @param event - The focus/blur DOM event.
   */
  onAmountBlur(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input || input.value === '' || Number(input.value) < 1) {
      const fallback = this.ingredientUnit() === 'piece' ? 1 : 100;
      input.value = String(fallback);
      this.ingredientAmount.set(fallback);
    }
  }

  readonly hasIngredients = computed(() => this.ingredients().length > 0);

  /**
   * Resets input fields for ingredient name and amount.
   */
  private resetIngredientInputs(): void {
    this.ingredientName.set('');
    this.ingredientAmount.set(this.ingredientUnit() === 'piece' ? 1 : 100);
  }

  /**
   * Adds the currently entered ingredient to the state list if valid.
   */
  addIngredient(): void {
    const name = this.ingredientName().trim();
    let amount = this.ingredientAmount();
    const max = this.maxServingAmount();
    if (amount > max) amount = max;
    if (!name || !Number.isFinite(amount) || amount <= 0) return;

    this.ingredients.update((list) => [...list, { name, amount, unit: this.ingredientUnit() }]);
    this.resetIngredientInputs();
  }

  /**
   * Removes an ingredient from the list by its index.
   *
   * @param index - Index of the item to remove.
   */
  removeIngredient(index: number): void {
    this.ingredients.update((list) => list.filter((_, i) => i !== index));
    this.editingIndex.update((editing) =>
      editing === null || editing < index ? editing : editing === index ? null : editing - 1,
    );
  }

  /**
   * Starts editing mode for an ingredient item.
   *
   * @param index - Index of the ingredient to edit.
   */
  startEdit(index: number): void {
    const item = this.ingredients()[index];
    if (!item) return;
    this.editingIndex.set(index);
    this.editAmount.set(item.amount);
    this.editUnit.set(item.unit);
    this.editDropdownOpen.set(false);
  }

  /**
   * Persists the edited amount and unit for an ingredient item.
   *
   * @param index - Index of the ingredient being edited.
   */
  saveEdit(index: number): void {
    let amount = this.editAmount();
    const max = this.maxEditAmount();
    if (amount > max) amount = max;
    if (!Number.isFinite(amount) || amount <= 0) return;
    this.ingredients.update((list) =>
      list.map((item, i) =>
        i === index
          ? { ...item, amount, unit: this.editUnit() }
          : item
      )
    );
    this.editingIndex.set(null);
  }

  /**
   * Cancels editing mode without saving changes.
   */
  cancelEdit(): void {
    this.editingIndex.set(null);
  }

  /**
   * Toggles the unit dropdown inside edit mode.
   */
  toggleEditDropdown(): void {
    this.editDropdownOpen.update((v) => !v);
  }

  /**
   * Selects a unit inside edit mode.
   *
   * @param unit - The chosen unit.
   */
  selectEditUnit(unit: string): void {
    this.editUnit.set(unit);
    this.editDropdownOpen.set(false);
    const max = unit === 'piece' ? 15 : 1000;
    if (this.editAmount() > max) {
      this.editAmount.set(unit === 'piece' ? 1 : max);
    }
  }

  /**
   * Handles user input on the amount input in edit mode.
   *
   * @param event - The input DOM event.
   */
  onEditAmountInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input) return;
    const max = this.maxEditAmount();
    if (input.value === '') return;
    const val = Number(input.value);
    if (val > max) {
      input.value = String(max);
      this.editAmount.set(max);
    } else if (val < 1) {
      input.value = '1';
      this.editAmount.set(1);
    } else {
      this.editAmount.set(val);
    }
  }

  /**
   * Handles blur event on the amount input in edit mode.
   *
   * @param event - The blur DOM event.
   */
  onEditAmountBlur(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input || input.value === '' || Number(input.value) < 1) {
      input.value = '1';
      this.editAmount.set(1);
    }
  }

  readonly isSuggestionsOpen = signal(false);

  readonly filteredSuggestions = computed(() => {
    const query = this.ingredientName().trim().toLowerCase();
    if (query.length < 1) return [];
    return this.commonIngredients
      .filter((item) => item.toLowerCase().includes(query))
      .slice(0, 5);
  });

  /**
   * Applies an autocomplete suggestion to the ingredient name input.
   *
   * @param name - The suggested ingredient name.
   */
  selectSuggestion(name: string): void {
    this.ingredientName.set(name);
    this.isSuggestionsOpen.set(false);
  }

  /**
   * Keyboard handler for ingredient input (Enter adds, Escape closes suggestions).
   *
   * @param event - The keyboard event.
   */
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.isSuggestionsOpen.set(false);
      this.addIngredient();
    } else if (event.key === 'Escape') {
      this.isSuggestionsOpen.set(false);
    }
  }

  /**
   * Keyboard handler for edit mode (Enter saves, Escape cancels).
   *
   * @param event - The keyboard event.
   * @param index - Index of the item being edited.
   */
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
