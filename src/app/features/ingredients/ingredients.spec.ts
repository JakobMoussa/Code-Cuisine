import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Ingredients } from './ingredients';

describe('Ingredients', () => {
  let component: Ingredients;
  let fixture: ComponentFixture<Ingredients>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ingredients],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Ingredients);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('does not add or save blank, zero, or negative amounts', () => {
    const input = fixture.nativeElement.querySelector('#serving-size') as HTMLInputElement;
    component.ingredientName.set('Tomatoes');
    input.value = '';
    input.dispatchEvent(new Event('input'));
    component.addIngredient();
    expect(component.ingredients()).toEqual([]);
    component.ingredientAmount.set(-1);
    component.addIngredient();
    expect(component.ingredients()).toEqual([]);
    component.ingredientAmount.set(300);
    component.addIngredient();
    component.startEdit(0);
    component.editAmount.set(0);
    component.saveEdit(0);
    expect(component.ingredients()[0].amount).toBe(300);
    expect(component.editingIndex()).toBe(0);
  });

  it('keeps edits attached to the right ingredient after removing an earlier entry', () => {
    component.ingredients.set([
      { name: 'Rice', amount: 100, unit: 'gram' },
      { name: 'Tofu', amount: 200, unit: 'gram' },
      { name: 'Broccoli', amount: 300, unit: 'gram' },
    ]);
    component.startEdit(1);
    component.removeIngredient(0);
    expect(component.editingIndex()).toBe(0);
    component.editAmount.set(400);
    component.saveEdit(component.editingIndex()!);
    expect(component.ingredients()[0]).toEqual({ name: 'Tofu', amount: 400, unit: 'gram' });
    expect(component.ingredients()[1].amount).toBe(300);
  });

});
