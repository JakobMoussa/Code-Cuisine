/**
 * @fileoverview Reusable navigation bar component.
 */

// Angular core and router modules
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Global navigation bar component supporting dark and light visual themes.
 */
@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  /** Color theme variant for the navbar ('light' or 'dark') */
  readonly variant = input<'light' | 'dark'>('dark');
}
