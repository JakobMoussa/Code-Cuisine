import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';

/**
 * Dashboard page component providing quick actions and promotional banners for recipe generation.
 */
@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, Navbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
