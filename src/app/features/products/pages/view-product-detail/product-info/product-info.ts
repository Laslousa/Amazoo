import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../../../../models/product';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { StockStatus } from '../stock-status/stock-status';
import { ToggleWishlistButton } from '../../../../../shared/components/toggle-wishlist-button/toggle-wishlist-button';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { QuantitySelector } from '../../../../../shared/components/quantity-selector/quantity-selector';
import { EcommerceStore } from '../../../../../ecommerce-store';
import { StarRating } from "../../../../../shared/components/star-rating/star-rating";

@Component({
  selector: 'app-product-info',
  imports: [
    TitleCasePipe,
    StockStatus,
    QuantitySelector,
    MatIcon,
    ToggleWishlistButton,
    MatButton,
    MatIconButton,
    CurrencyPipe,
    StarRating
],
  templateUrl: './product-info.html',
  styleUrl: './product-info.scss',
  host: {
    class: 'block'
  },
})
export class ProductInfo {

  product = input.required<Product>();
  quantity = signal(1);
  store = inject(EcommerceStore);

}
