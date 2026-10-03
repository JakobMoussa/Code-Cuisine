import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  /** 'light' for dark backgrounds, 'dark' for light backgrounds */
  readonly variant = input<'light' | 'dark'>('dark');
}
