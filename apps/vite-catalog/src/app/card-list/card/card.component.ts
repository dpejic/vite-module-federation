import { Component, Input } from '@angular/core';
import { addItem } from '@dp-wk/store';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() item: any;

  addToCart(item: any) {
    console.log('added', item);
    addItem(item);
  }
}
