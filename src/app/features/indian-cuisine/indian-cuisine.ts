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
  selector: 'app-indian-cuisine',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './indian-cuisine.html',
  styleUrl: './indian-cuisine.scss',
})
export class IndianCuisine {
  recipes: RecipeItem[] = [
    {
      id: '1',
      number: 1,
      title: 'Butter Chicken',
      cookingTime: '40min',
      tags: ['Classic'],
      likes: 95,
    },
    {
      id: '2',
      number: 2,
      title: 'Chicken Tikka Masala',
      cookingTime: '45min',
      tags: ['Classic'],
      likes: 92,
    },
    {
      id: '3',
      number: 3,
      title: 'Palak Paneer',
      cookingTime: '35min',
      tags: ['Vegetarian', 'Quick'],
      likes: 78,
    },
    {
      id: '4',
      number: 4,
      title: 'Chana Masala',
      cookingTime: '30min',
      tags: ['Vegetarian', 'Quick'],
      likes: 71,
    },
    {
      id: '5',
      number: 5,
      title: 'Biryani',
      cookingTime: '60min',
      tags: ['Traditional'],
      likes: 98,
    },
    {
      id: '6',
      number: 6,
      title: 'Dal Tadka',
      cookingTime: '25min',
      tags: ['Vegetarian', 'Quick'],
      likes: 69,
    },
    {
      id: '7',
      number: 7,
      title: 'Samosas',
      cookingTime: '45min',
      tags: ['Vegetarian'],
      likes: 83,
    },
    {
      id: '8',
      number: 8,
      title: 'Naan Bread with Garlic',
      cookingTime: '20min',
      tags: ['Vegetarian', 'Quick'],
      likes: 88,
    },
    {
      id: '9',
      number: 9,
      title: 'Aloo Gobi',
      cookingTime: '30min',
      tags: ['Vegetarian', 'Quick'],
      likes: 62,
    },
    {
      id: '10',
      number: 10,
      title: 'Rogan Josh',
      cookingTime: '75min',
      tags: ['Traditional'],
      likes: 76,
    },
    {
      id: '11',
      number: 11,
      title: 'Malai Kofta',
      cookingTime: '50min',
      tags: ['Vegetarian'],
      likes: 74,
    },
    {
      id: '12',
      number: 12,
      title: 'Vegetable Korma',
      cookingTime: '35min',
      tags: ['Vegetarian', 'Quick'],
      likes: 67,
    },
    {
      id: '13',
      number: 13,
      title: 'Paneer Butter Masala',
      cookingTime: '35min',
      tags: ['Vegetarian', 'Quick'],
      likes: 84,
    },
    {
      id: '14',
      number: 14,
      title: 'Chicken Vindaloo',
      cookingTime: '50min',
      tags: ['Spicy'],
      likes: 73,
    },
  ];
}
