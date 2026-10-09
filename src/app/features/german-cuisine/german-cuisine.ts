import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface RecipeItem {
  id: string;
  number: number;
  title: string;
  cookingTime: string;
  tags: string[];
  likes: number;
}

@Component({
  selector: 'app-german-cuisine',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './german-cuisine.html',
  styleUrl: './german-cuisine.scss',
})
export class GermanCuisine {
  recipes: RecipeItem[] = [
    {
      id: '1',
      number: 1,
      title: 'Bratkartoffeln mit Spiegelei',
      cookingTime: '30min',
      tags: ['Vegetarian', 'Quick'],
      likes: 48,
    },
    {
      id: '2',
      number: 2,
      title: 'Kartoffelpuffer mit Apfelmus',
      cookingTime: '35min',
      tags: ['Vegetarian', 'Quick'],
      likes: 52,
    },
    {
      id: '3',
      number: 3,
      title: 'Käsespätzle',
      cookingTime: '35min',
      tags: ['Vegetarian', 'Quick'],
      likes: 74,
    },
    {
      id: '4',
      number: 4,
      title: 'Flammkuchen nach Elsässer Art',
      cookingTime: '30min',
      tags: ['Quick'],
      likes: 63,
    },
    {
      id: '5',
      number: 5,
      title: 'Currywurst mit Pommes',
      cookingTime: '40min',
      tags: ['Classic'],
      likes: 81,
    },
    {
      id: '6',
      number: 6,
      title: 'Bauernfrühstück',
      cookingTime: '30min',
      tags: ['Quick'],
      likes: 39,
    },
    {
      id: '7',
      number: 7,
      title: 'Linsensuppe mit Würstchen',
      cookingTime: '55min',
      tags: ['Hearty'],
      likes: 45,
    },
    {
      id: '8',
      number: 8,
      title: 'Kartoffelsuppe',
      cookingTime: '45min',
      tags: ['Vegetarian'],
      likes: 56,
    },
    {
      id: '9',
      number: 9,
      title: 'Frikadellen mit Kartoffelpüree',
      cookingTime: '50min',
      tags: ['Classic'],
      likes: 67,
    },
    {
      id: '10',
      number: 10,
      title: 'Schnitzel mit Kartoffelsalat',
      cookingTime: '60min',
      tags: ['Classic'],
      likes: 92,
    },
    {
      id: '11',
      number: 11,
      title: 'Königsberger Klopse',
      cookingTime: '60min',
      tags: ['Traditional'],
      likes: 41,
    },
    {
      id: '12',
      number: 12,
      title: 'Rinderrouladen mit Rotkohl',
      cookingTime: '150min',
      tags: ['Traditional'],
      likes: 88,
    },
    {
      id: '13',
      number: 13,
      title: 'Sauerbraten mit Kartoffelklößen',
      cookingTime: '180min',
      tags: ['Traditional'],
      likes: 79,
    },
    {
      id: '14',
      number: 14,
      title: 'Erbseneintopf',
      cookingTime: '90min',
      tags: ['Hearty'],
      likes: 50,
    },
  ];
}
