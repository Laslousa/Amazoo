import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../models/product';
import { EcommerceStore } from '../../ecommerce-store';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [MatIconButton, MatIcon],
  templateUrl: './toggle-wishlist-button.html',
  styleUrl: './toggle-wishlist-button.scss',
})
export class ToggleWishlistButton {

  product = input.required<Product>();

  store = inject(EcommerceStore);

  isInWishList = computed(() => this.store.wishlistItems().find((p) => p.id === this.product().id));

  toggleWishlist(product: Product) {
    if (this.isInWishList()) {
      this.store.removeFromWishlist(product);
    } else {
      this.store.addToWishList(product);
    }
  }

}
