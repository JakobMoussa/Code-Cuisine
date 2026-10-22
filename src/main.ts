/**
 * @fileoverview Main entry point of the Code-à-Cuisine Angular web application.
 * Bootstraps the root App component with central application configuration.
 */

// Angular platform browser bootstrap
import { bootstrapApplication } from '@angular/platform-browser';

// Root application configuration and component
import { appConfig } from './app/app.config';
import { App } from './app/app';

/**
 * Bootstraps the application and handles startup errors.
 */
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
