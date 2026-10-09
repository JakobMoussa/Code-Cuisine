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
  selector: 'app-japanese-cuisine',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './japanese-cuisine.html',
  styleUrl: './japanese-cuisine.scss',
})
export class JapaneseCuisine {
  recipes: RecipeItem[] = [
    {
      id: '1',
      number: 1,
      title: 'Onigiri',
      cookingTime: '25min',
      tags: ['Quick', 'Vegetarian'],
      likes: 64,
    },
    {
      id: '2',
      number: 2,
      title: 'Tamagoyaki',
      cookingTime: '20min',
      tags: ['Vegetarian', 'Quick'],
      likes: 58,
    },
    {
      id: '3',
      number: 3,
      title: 'Miso-Suppe',
      cookingTime: '15min',
      tags: ['Vegetarian', 'Quick'],
      likes: 72,
    },
    {
      id: '4',
      number: 4,
      title: 'Yakisoba',
      cookingTime: '25min',
      tags: ['Quick'],
      likes: 81,
    },
    {
      id: '5',
      number: 5,
      title: 'Oyakodon',
      cookingTime: '30min',
      tags: ['Quick'],
      likes: 65,
    },
    {
      id: '6',
      number: 6,
      title: 'Gyudon',
      cookingTime: '30min',
      tags: ['Quick'],
      likes: 77,
    },
    {
      id: '7',
      number: 7,
      title: 'Okonomiyaki',
      cookingTime: '35min',
      tags: ['Medium'],
      likes: 89,
    },
    {
      id: '8',
      number: 8,
      title: 'Teriyaki-Hähnchen',
      cookingTime: '35min',
      tags: ['Medium'],
      likes: 93,
    },
    {
      id: '9',
      number: 9,
      title: 'Yaki Udon',
      cookingTime: '25min',
      tags: ['Quick'],
      likes: 61,
    },
    {
      id: '10',
      number: 10,
      title: 'Katsudon',
      cookingTime: '45min',
      tags: ['Medium'],
      likes: 85,
    },
    {
      id: '11',
      number: 11,
      title: 'Japanisches Curry (Kare Raisu)',
      cookingTime: '50min',
      tags: ['Complex'],
      likes: 90,
    },
    {
      id: '12',
      number: 12,
      title: 'Gyoza',
      cookingTime: '50min',
      tags: ['Complex'],
      likes: 96,
    },
    {
      id: '13',
      number: 13,
      title: 'Shoyu Ramen',
      cookingTime: '90min',
      tags: ['Complex'],
      likes: 99,
    },
    {
      id: '14',
      number: 14,
      title: 'Sushi-Maki',
      cookingTime: '60min',
      tags: ['Complex'],
      likes: 94,
    },
  ];
}
