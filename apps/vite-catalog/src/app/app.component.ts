import { Component } from '@angular/core';
import { HeadingComponent } from './heading/heading.component';
import { CardListComponent } from './card-list/card-list.component';

@Component({
  selector: 'catalog-element',
  standalone: true,
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
  imports: [HeadingComponent, CardListComponent],
})
export class AppComponent {}
