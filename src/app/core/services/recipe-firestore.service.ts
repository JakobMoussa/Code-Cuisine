import { Injectable } from '@angular/core';
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  Firestore,
} from 'firebase/firestore';
import { environment } from '../../../environments/environment';
import { RecipeDetails } from './recipe-state.service';

export interface StoredRecipe extends RecipeDetails {
  firestoreId?: string;
  createdAt?: unknown;
}

@Injectable({ providedIn: 'root' })
export class RecipeFirestoreService {
  private db: Firestore | null = null;
  private readonly collectionName = 'recipes';

  private getDb(): Firestore | null {
    if (this.db) return this.db;
    try {
      if (!environment.firebase?.apiKey) {
        console.warn('Firebase-Konfiguration fehlt in environment.ts');
        return null;
      }
      const app = getApps().length ? getApp() : initializeApp(environment.firebase);
      this.db = getFirestore(app);
      return this.db;
    } catch (err) {
      console.error('Fehler bei der Firebase-Initialisierung:', err);
      return null;
    }
  }

  async saveRecipe(recipe: RecipeDetails): Promise<string> {
    const db = this.getDb();
    if (!db) {
      console.warn('Firestore nicht bereit – Rezept wird nicht online gespeichert.');
      return '';
    }
    const docRef = await addDoc(collection(db, this.collectionName), {
      title: recipe.title ?? '',
      cookingTime: recipe.cookingTime ?? '',
      cookingPersons: recipe.cookingPersons ?? 1,
      tags: recipe.tags ?? [],
      likes: recipe.likes ?? 0,
      nutrition: recipe.nutrition ?? { calories: '', protein: '', fat: '', carbs: '' },
      yourIngredients: recipe.yourIngredients ?? [],
      extraIngredients: recipe.extraIngredients ?? [],
      steps: recipe.steps ?? [],
      createdAt: serverTimestamp(),
      source: 'ai_generated',
    });
    return docRef.id;
  }

  async saveGeneratedRecipes(recipes: RecipeDetails[]): Promise<string[]> {
    const savedIds: string[] = [];
    for (const recipe of recipes) {
      try {
        const id = await this.saveRecipe(recipe);
        if (id) savedIds.push(id);
      } catch (err) {
        console.error('Fehler beim Speichern des Rezepts in Firestore:', recipe.title, err);
      }
    }
    return savedIds;
  }

  async getSavedRecipes(): Promise<RecipeDetails[]> {
    const db = this.getDb();
    if (!db) return [];
    try {
      const q = query(
        collection(db, this.collectionName),
        orderBy('createdAt', 'desc'),
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          label: 'Saved Recipe',
          title: data['title'] || 'Untitled',
          cookingTime: data['cookingTime'] || '',
          cookingPersons: data['cookingPersons'] || 1,
          tags: Array.isArray(data['tags']) ? data['tags'] : [],
          likes: typeof data['likes'] === 'number' ? data['likes'] : 0,
          nutrition: data['nutrition'] || { calories: '', protein: '', fat: '', carbs: '' },
          yourIngredients: Array.isArray(data['yourIngredients']) ? data['yourIngredients'] : [],
          extraIngredients: Array.isArray(data['extraIngredients']) ? data['extraIngredients'] : [],
          steps: Array.isArray(data['steps']) ? data['steps'] : [],
        };
      });
    } catch (err) {
      console.error('Fehler beim Laden der Rezepte aus Firestore:', err);
      return [];
    }
  }

  async getRecipeById(id: string): Promise<RecipeDetails | null> {
    const db = this.getDb();
    if (!db) return null;
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return null;
      const data = docSnap.data();
      return {
        id: docSnap.id,
        label: 'Saved Recipe',
        title: data['title'] || 'Untitled',
        cookingTime: data['cookingTime'] || '',
        cookingPersons: data['cookingPersons'] || 1,
        tags: Array.isArray(data['tags']) ? data['tags'] : [],
        likes: typeof data['likes'] === 'number' ? data['likes'] : 0,
        nutrition: data['nutrition'] || { calories: '', protein: '', fat: '', carbs: '' },
        yourIngredients: Array.isArray(data['yourIngredients']) ? data['yourIngredients'] : [],
        extraIngredients: Array.isArray(data['extraIngredients']) ? data['extraIngredients'] : [],
        steps: Array.isArray(data['steps']) ? data['steps'] : [],
      };
    } catch (err) {
      console.error('Fehler beim Laden des Rezepts aus Firestore:', err);
      return null;
    }
  }

  async deleteRecipe(id: string): Promise<void> {
    const db = this.getDb();
    if (!db) return;
    const docRef = doc(db, this.collectionName, id);
    await deleteDoc(docRef);
  }
}
