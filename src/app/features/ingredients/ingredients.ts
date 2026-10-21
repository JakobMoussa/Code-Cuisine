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

  unitDisplay(unit: string): string {
    if (unit === 'gram' || unit === 'g') return 'g';
    return ' ' + unit;
  }

  toggleDropdown(): void {
    this.isOpen.update((v) => !v);
  }

  readonly maxServingAmount = computed(() => (this.ingredientUnit() === 'piece' ? 15 : 1000));
  readonly maxEditAmount = computed(() => (this.editUnit() === 'piece' ? 15 : 1000));

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

  onAmountInput(value: number | null): void {
    if (value === null) return;
    const max = this.maxServingAmount();
    if (value > max) {
      this.ingredientAmount.set(max);
    } else if (value < 1) {
      this.ingredientAmount.set(1);
    } else {
      this.ingredientAmount.set(value);
    }
  }

  readonly hasIngredients = computed(() => this.ingredients().length > 0);

  private resetIngredientInputs(): void {
    this.ingredientName.set('');
    this.ingredientAmount.set(this.ingredientUnit() === 'piece' ? 1 : 100);
  }

  addIngredient(): void {
    const name = this.ingredientName().trim();
    const amount = this.ingredientAmount();
    if (!name || !Number.isFinite(amount) || amount <= 0) return;

    this.ingredients.update((list) => [...list, { name, amount, unit: this.ingredientUnit() }]);
    this.resetIngredientInputs();
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
    const max = unit === 'piece' ? 15 : 1000;
    if (this.editAmount() > max) {
      this.editAmount.set(unit === 'piece' ? 1 : max);
    }
  }

  onEditAmountInput(value: number | null): void {
    if (value === null) return;
    const max = this.maxEditAmount();
    if (value > max) {
      this.editAmount.set(max);
    } else if (value < 1) {
      this.editAmount.set(1);
    } else {
      this.editAmount.set(value);
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

  selectSuggestion(name: string): void {
    this.ingredientName.set(name);
    this.isSuggestionsOpen.set(false);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.isSuggestionsOpen.set(false);
      this.addIngredient();
    } else if (event.key === 'Escape') {
      this.isSuggestionsOpen.set(false);
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
