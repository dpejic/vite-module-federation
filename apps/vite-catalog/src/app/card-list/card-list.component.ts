import { Component } from '@angular/core';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css',
})
export class CardListComponent {
  items = [
    {
      id: 1,
      name: 'AK-47 | Fuel Injector',
      url: 'https://cdnsteam.cdnhell.com/730/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhnwMzJemkV08-jhIWZlP_1IbzUklRd4cJ5nqeX9t2ljQHk_UNkMjjzd4CSIAY8ZFDSqVLtk-u6gce6787KwHdn7CR3-z-DyOy2uCmM/360fx360f.png',
      price: 300,
    },
    {
      id: 2,
      name: '★ Bowie Knife | Lore',
      url: 'https://cdnsteam.cdnhell.com/730/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMK7ulGRG4cBOhubT8LP5gVO8v11oMWGnI9XAdQ48Z13Xqwe8lO7ugZ-4tJjNz3QyvChz7CmJm0e11EtMcKUx0gITEIcA/360fx360f.png',
      price: 350,
    },
  ];
}
