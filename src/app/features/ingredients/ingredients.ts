import { Component, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';
import { RecipeStateService, Ingredient } from '../../core/services/recipe-state.service';

export type { Ingredient };

const KNOWN_INGREDIENT_WORDS = new Set<string>([
  'bacon', 'beef', 'tenderloin', 'chicken', 'breast', 'wings', 'duck', 'pork', 'turkey', 'ham',
  'lamb', 'chops', 'shank', 'pancetta', 'pastrami', 'loin', 'prosciutto', 'salami', 'sausage',
  'steak', 'veal', 'cutlet', 'anchovies', 'calamari', 'cod', 'fish', 'meat', 'halibut', 'lobster',
  'mussels', 'salmon', 'fillet', 'sardines', 'scallops', 'bass', 'shrimp', 'prawns', 'prawn', 'trout', 'tuna',
  'artichoke', 'asparagus', 'avocado', 'pepper', 'peppers', 'broccoli', 'brussels', 'sprouts',
  'cabbage', 'carrot', 'carrots', 'cauliflower', 'celery', 'chili', 'corn', 'cucumber', 'eggplant',
  'garlic', 'beans', 'bean', 'kale', 'leek', 'lettuce', 'mushroom', 'mushrooms', 'champignon',
  'champignons', 'onion', 'onions', 'paprika', 'peas', 'pea', 'potato', 'potatoes', 'butternut',
  'radish', 'shallot', 'shallots', 'spinach', 'sweet', 'tomato', 'tomatoes', 'paste', 'zucchini',
  'salat', 'salad', 'pesto', 'cheddar', 'cheese', 'egg', 'eggs', 'feta', 'gorgonzola', 'gouda',
  'cream', 'milk', 'mozzarella', 'oat', 'parmesan', 'ricotta', 'sour', 'tofu', 'yogurt', 'yoghurt',
  'rice', 'bread', 'toast', 'breadcrumbs', 'couscous', 'flour', 'gnocchi', 'noodles', 'noodle',
  'oats', 'pasta', 'penne', 'spaghetti', 'quinoa', 'tortilla', 'tortillas', 'wrap', 'wraps',
  'basil', 'bay', 'leaf', 'leaves', 'cilantro', 'coriander', 'cinnamon', 'cumin', 'curry',
  'powder', 'dill', 'ginger', 'nutmeg', 'oregano', 'parsley', 'rosemary', 'salt', 'thyme',
  'vinegar', 'oil', 'butter', 'coconut', 'mustard', 'honey', 'mayonnaise', 'mayo', 'olive',
  'sesame', 'soy', 'sauce', 'sugar', 'broth', 'worcestershire',
  'apple', 'apples', 'banana', 'bananas', 'lemon', 'lemons', 'lime', 'limes', 'orange', 'oranges',
  'pear', 'pears', 'peach', 'peaches', 'plum', 'plums', 'strawberry', 'strawberries', 'blueberry',
  'blueberries', 'raspberry', 'raspberries', 'blackberry', 'blackberries', 'cherry', 'cherries',
  'grape', 'grapes', 'mango', 'mangoes', 'pineapple', 'pineapples', 'watermelon', 'melon',
  'fig', 'figs', 'date', 'dates', 'kiwi', 'kiwis', 'pomegranate', 'apricot', 'apricots',
  'cranberry', 'cranberries', 'grapefruit', 'almond', 'almonds', 'walnut', 'walnuts', 'peanut',
  'peanuts', 'cashew', 'cashews', 'pecan', 'pecans', 'pistachio', 'pistachios', 'hazelnut',
  'hazelnuts', 'chia', 'flax', 'sunflower', 'pumpkin', 'chickpea', 'chickpeas', 'lentil',
  'lentils', 'edamame', 'yeast', 'baking', 'soda', 'vanilla', 'extract', 'chocolate', 'cocoa',
  'cacao', 'syrup', 'maple', 'cornstarch', 'starch', 'water', 'stock', 'ketchup', 'passata',
  'sriracha', 'tabasco', 'apfel', 'aepfel', 'äpfel', 'banane', 'bananen', 'zitrone', 'zitronen',
  'limette', 'limetten', 'erdbeere', 'erdbeeren', 'blaubeere', 'blaubeeren', 'himbeere', 'himbeeren',
  'kirsche', 'kirschen', 'birne', 'birnen', 'pfirsich', 'kartoffel', 'kartoffeln', 'zwiebel',
  'zwiebeln', 'knoblauch', 'moehre', 'moehren', 'möhre', 'möhren', 'karotte', 'karotten', 'gurke',
  'gurken', 'brokkoli', 'blumenkohl', 'spinat', 'pilz', 'pilze', 'kuerbis', 'kürbis', 'lauch',
  'haehnchen', 'hähnchen', 'huehnchen', 'hühnchen', 'rind', 'rindfleisch', 'schwein',
  'schweinefleisch', 'hackfleisch', 'speck', 'schinken', 'wurst', 'lachs', 'thunfisch', 'garnele',
  'garnelen', 'ei', 'eier', 'milch', 'butter', 'sahne', 'schlagsahne', 'kaese', 'käse',
  'frischkaese', 'frischkäse', 'joghurt', 'quark', 'mehl', 'zucker', 'salz', 'pfeffer', 'hefe',
  'backpulver', 'reis', 'nudeln', 'haferflocken', 'brot', 'oel', 'öl', 'olivenoel', 'olivenöl',
  'rapsoel', 'rapsöl', 'essig', 'senf', 'sojasauce', 'tomatenmark', 'bruehe', 'brühe',
  'gemuesebruehe', 'gemüsebrühe', 'basilikum', 'petersilie', 'schnittlauch', 'rosmarin',
  'thymian', 'zimt', 'kurkuma', 'ingwer', 'fleisch', 'gemuese', 'gemüse', 'obst'
]);

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
  readonly ingredientError = signal<string | null>(null);

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
   * Checks whether a word is in the known ingredient dictionary (including singular/plural stems).
   */
  private isWordKnown(rawWord: string): boolean {
    const word = rawWord.toLowerCase();
    if (KNOWN_INGREDIENT_WORDS.has(word)) return true;
    if (word.endsWith('s') && KNOWN_INGREDIENT_WORDS.has(word.slice(0, -1))) return true;
    if (word.endsWith('es') && KNOWN_INGREDIENT_WORDS.has(word.slice(0, -2))) return true;
    if (word.endsWith('n') && KNOWN_INGREDIENT_WORDS.has(word.slice(0, -1))) return true;
    if (word.endsWith('en') && KNOWN_INGREDIENT_WORDS.has(word.slice(0, -2))) return true;
    return false;
  }

  /**
   * Validates whether an entered ingredient name represents a genuine food ingredient.
   *
   * @param name - The ingredient string entered by the user.
   * @returns True if valid, false if random gibberish or invalid characters.
   */
  isValidIngredient(name: string): boolean {
    const trimmed = name.trim();
    if (trimmed.length < 2 || trimmed.length > 50) return false;
    if (!/^[a-zA-ZäöüÄÖÜß\s\-\'\/()]+$/.test(trimmed)) return false;

    const lowerTrimmed = trimmed.toLowerCase();
    if (this.commonIngredients.some((item) => item.toLowerCase() === lowerTrimmed)) {
      return true;
    }

    const words = trimmed
      .replace(/[()\/,\-]/g, ' ')
      .split(/\s+/)
      .map((w) => w.trim().toLowerCase())
      .filter((w) => w.length >= 2);

    if (words.length === 0) return false;
    return words.some((word) => this.isWordKnown(word));
  }

  /**
   * Resets input fields for ingredient name and amount.
   */
  private resetIngredientInputs(): void {
    this.ingredientName.set('');
    this.ingredientError.set(null);
    this.ingredientAmount.set(this.ingredientUnit() === 'piece' ? 1 : 100);
  }

  /**
   * Adds the currently entered ingredient to the state list if valid.
   */
  addIngredient(): void {
    const name = this.ingredientName().trim();
    if (!name || !this.isValidIngredient(name)) {
      this.ingredientError.set('Please use the correct ingredients!');
      return;
    }

    let amount = this.ingredientAmount();
    const max = this.maxServingAmount();
    if (amount > max) amount = max;
    if (!Number.isFinite(amount) || amount <= 0) return;

    this.ingredientError.set(null);
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
   * Handles user typing in the ingredient name input, clearing any validation error.
   *
   * @param value - Current text in the input.
   */
  onIngredientChange(value: string): void {
    this.ingredientName.set(value);
    this.ingredientError.set(null);
    this.isSuggestionsOpen.set(true);
  }

  /**
   * Applies an autocomplete suggestion to the ingredient name input.
   *
   * @param name - The suggested ingredient name.
   */
  selectSuggestion(name: string): void {
    this.ingredientName.set(name);
    this.ingredientError.set(null);
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
