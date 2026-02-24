import { Component, computed, inject, input, output } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, MatIconModule, MatButtonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {

  product = input.required<Product>();

  addToCartClicked = output<Product>();

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
