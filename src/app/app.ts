/**
 * @fileoverview Root application component for Code-à-Cuisine.
 */

// Angular core and router modules
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root component that serves as the entry container and renders router outlets.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  /** Application title signal */
  protected readonly title = signal('code-a-cuisine');
}
