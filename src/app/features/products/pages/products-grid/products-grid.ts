import { Component, inject, input } from '@angular/core';
import { ProductCard } from '../../../../shared/components/product-card/product-card';
import { TitleCasePipe } from '@angular/common';
import { EcommerceStore } from '../../../../ecommerce-store';
import { ToggleWishlistButton } from '../../../../shared/components/toggle-wishlist-button/toggle-wishlist-button';

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, TitleCasePipe, ToggleWishlistButton],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})
export default class ProductsGrid {
  category = input<string>('all');

  store = inject(EcommerceStore);

  constructor() {
    this.store.setCategory(this.category);
  }
}
