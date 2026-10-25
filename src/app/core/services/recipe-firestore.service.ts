/**
 * @fileoverview Recipe Firestore persistence service.
 * Manages storage, retrieval, and deletion of recipe documents using Firebase Firestore.
 */

// Angular core modules
import { Injectable } from '@angular/core';

// Firebase core and Firestore modules
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
  Firestore,
} from 'firebase/firestore';

// Environment and type imports
import { environment } from '../../../environments/environment';
import { RecipeDetails } from './recipe-state.service';

/**
 * Extended RecipeDetails interface containing Firestore-specific metadata.
 */
export interface StoredRecipe extends RecipeDetails {
  /** Firestore document identifier */
  firestoreId?: string;
  /** Server timestamp indicating when document was created */
  createdAt?: unknown;
}

/**
 * Service providing database operations against Google Cloud Firestore.
 */
@Injectable({ providedIn: 'root' })
export class RecipeFirestoreService {
  /** Internal cached Firestore database instance */
  private db: Firestore | null = null;
  /** Firestore collection name storing recipes */
  private readonly collectionName = 'recipes';

  /**
   * Initializes or returns the active Cloud Firestore database instance lazily.
   *
   * @returns The Firestore instance or null if unconfigured or initialization fails.
   */
  private getDb(): Firestore | null {
    if (this.db) return this.db;
    try {
      if (!environment.firebase?.apiKey) {
        console.warn('Firebase configuration missing in environment.ts');
        return null;
      }
      const app = getApps().length ? getApp() : initializeApp(environment.firebase);
      this.db = getFirestore(app);
      return this.db;
    } catch (err) {
      console.error('Error during Firebase initialization:', err);
      return null;
    }
  }

  /**
   * Generates a unique Firestore document ID synchronously.
   *
   * @returns A unique document identifier string.
   */
  generateRecipeId(): string {
    const db = this.getDb();
    if (!db) {
      return 'recipe_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
    }
    return doc(collection(db, this.collectionName)).id;
  }

  /**
   * Persists a single recipe to Firestore.
   *
   * @param recipe - The recipe details object to save.
   * @param cuisine - Optional cuisine override.
   * @returns The generated Firestore document ID or empty string on failure.
   */
  async saveRecipe(recipe: RecipeDetails, cuisine = ''): Promise<string> {
    const db = this.getDb();
    if (!db) {
      console.warn('Firestore is not ready - recipe will not be saved online.');
      return recipe.id || '';
    }
    const resolvedCuisine = (cuisine || recipe.cuisine || '').toLowerCase().trim();
    const docId = recipe.id && !recipe.id.startsWith('generated-')
      ? recipe.id
      : doc(collection(db, this.collectionName)).id;
    recipe.id = docId;

    const docRef = doc(db, this.collectionName, docId);
    await setDoc(docRef, {
      title: recipe.title ?? '',
      cookingTime: recipe.cookingTime ?? '',
      cookingPersons: recipe.cookingPersons ?? 1,
      tags: recipe.tags ?? [],
      likes: recipe.likes ?? 0,
      nutrition: recipe.nutrition ?? { calories: '', protein: '', fat: '', carbs: '' },
      yourIngredients: recipe.yourIngredients ?? [],
      extraIngredients: recipe.extraIngredients ?? [],
      steps: recipe.steps ?? [],
      cuisine: resolvedCuisine,
      createdAt: serverTimestamp(),
      source: 'ai_generated',
    }, { merge: true });

    return docId;
  }

  /**
   * Saves a list of generated recipes sequentially to Firestore.
   *
   * @param recipes - Array of recipe details to persist.
   * @param cuisine - Optional cuisine label.
   * @returns Array of created Firestore document IDs.
   */
  async saveGeneratedRecipes(recipes: RecipeDetails[], cuisine = ''): Promise<string[]> {
    const savedIds: string[] = [];
    for (const recipe of recipes) {
      try {
        const id = await this.saveRecipe(recipe, cuisine);
        if (id) {
          recipe.id = id;
          savedIds.push(id);
        }
      } catch (err) {
        console.error('Error saving recipe to Firestore:', recipe.title, err);
      }
    }
    return savedIds;
  }

  /**
   * Atomically updates a recipe's like count in Firestore.
   * If the recipe does not exist in Firestore yet (e.g. default seed recipe), it is initialized.
   *
   * @param recipe - The target recipe details.
   * @param delta - Amount to increment (+1) or decrement (-1).
   * @returns The updated like count or null on error.
   */
  async updateRecipeLikes(recipe: RecipeDetails, delta: number): Promise<number | null> {
    const db = this.getDb();
    if (!db) {
      console.warn('Firestore is not ready - likes cannot be saved online.');
      return null;
    }
    try {
      const docRef = doc(db, this.collectionName, recipe.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const currentLikes = typeof docSnap.data()?.['likes'] === 'number'
          ? (docSnap.data()?.['likes'] as number)
          : (recipe.likes ?? 0);
        const newLikes = Math.max(0, currentLikes + delta);

        await updateDoc(docRef, {
          likes: newLikes,
          updatedAt: serverTimestamp(),
        });
        return newLikes;
      } else {
        const initialLikes = Math.max(0, (recipe.likes ?? 0) + delta);
        await setDoc(docRef, {
          title: recipe.title ?? '',
          cookingTime: recipe.cookingTime ?? '',
          cookingPersons: recipe.cookingPersons ?? 1,
          tags: recipe.tags ?? [],
          likes: initialLikes,
          nutrition: recipe.nutrition ?? { calories: '', protein: '', fat: '', carbs: '' },
          yourIngredients: recipe.yourIngredients ?? [],
          extraIngredients: recipe.extraIngredients ?? [],
          steps: recipe.steps ?? [],
          cuisine: (recipe.cuisine || '').toLowerCase().trim(),
          createdAt: serverTimestamp(),
          source: 'user_liked',
        });
        return initialLikes;
      }
    } catch (err) {
      console.error('Error updating likes in Firestore:', err);
      return null;
    }
  }

  /**
   * Retrieves all stored recipes from Firestore ordered by creation timestamp descending.
   *
   * @returns A promise resolving to an array of saved recipes.
   */
  async getSavedRecipes(): Promise<RecipeDetails[]> {
    const db = this.getDb();
    if (!db) return [];
    try {
      const q = query(
        collection(db, this.collectionName),
        orderBy('createdAt', 'desc'),
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((docSnap) => this.mapDocToRecipe(docSnap));
    } catch (err) {
      console.error('Error loading recipes from Firestore:', err);
      return [];
    }
  }

  /**
   * Retrieves stored recipes sorted descending by their like count.
   *
   * @param limitCount - Maximum number of recipes to return.
   * @returns A promise resolving to the most-liked recipes.
   */
  async getMostLikedRecipes(limitCount = 10): Promise<RecipeDetails[]> {
    const db = this.getDb();
    if (!db) return [];
    try {
      const all = await this.getSavedRecipes();
      if (!all.length) return [];
      return [...all].sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0)).slice(0, limitCount);
    } catch (err) {
      console.error('Error loading most liked recipes from Firestore:', err);
      return [];
    }
  }

  /**
   * Retrieves all recipes matching a specific cuisine type.
   *
   * @param cuisine - Target cuisine name (e.g. 'japanese', 'italian').
   * @returns A promise resolving to matching recipes.
   */
  async getRecipesByCuisine(cuisine: string): Promise<RecipeDetails[]> {
    const db = this.getDb();
    if (!db) return [];
    try {
      const targetCuisine = cuisine.toLowerCase().trim();
      const all = await this.getSavedRecipes();
      return all.filter((r) => (r.cuisine || '').toLowerCase().trim() === targetCuisine);
    } catch (err) {
      console.error('Error loading recipes for cuisine:', cuisine, err);
      return [];
    }
  }

  /**
   * Fetches a single recipe by its unique Firestore document ID.
   *
   * @param id - Document ID in the recipes collection.
   * @returns The recipe details or null if not found.
   */
  async getRecipeById(id: string): Promise<RecipeDetails | null> {
    const db = this.getDb();
    if (!db) return null;
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return null;
      return this.mapDocToRecipe(docSnap);
    } catch (err) {
      console.error('Error loading recipe from Firestore:', err);
      return null;
    }
  }

  /**
   * Deletes a recipe document from Firestore.
   *
   * @param id - Document ID to delete.
   */
  async deleteRecipe(id: string): Promise<void> {
    const db = this.getDb();
    if (!db) return;
    const docRef = doc(db, this.collectionName, id);
    await deleteDoc(docRef);
  }

  /**
   * Maps a raw Firestore snapshot document to the typed RecipeDetails object.
   *
   * @param docSnap - Firestore document snapshot.
   * @returns Formatted RecipeDetails object.
   */
  private mapDocToRecipe(docSnap: { id: string; data: () => Record<string, unknown> }): RecipeDetails {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      label: 'Generated Recipe',
      title: (data['title'] as string) || 'Untitled',
      cuisine: (data['cuisine'] as string) || '',
      cookingTime: (data['cookingTime'] as string) || '',
      cookingPersons: typeof data['cookingPersons'] === 'number' ? data['cookingPersons'] : 1,
      tags: Array.isArray(data['tags']) ? (data['tags'] as string[]) : [],
      likes: typeof data['likes'] === 'number' ? data['likes'] : 0,
      nutrition: (data['nutrition'] as RecipeDetails['nutrition']) || { calories: '', protein: '', fat: '', carbs: '' },
      yourIngredients: Array.isArray(data['yourIngredients']) ? (data['yourIngredients'] as RecipeDetails['yourIngredients']) : [],
      extraIngredients: Array.isArray(data['extraIngredients']) ? (data['extraIngredients'] as RecipeDetails['extraIngredients']) : [],
      steps: Array.isArray(data['steps']) ? (data['steps'] as RecipeDetails['steps']) : [],
    };
  }
}
