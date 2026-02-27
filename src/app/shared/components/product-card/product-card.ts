import { Component, inject, input, output } from '@angular/core';
import { Product } from '../../../models/product';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EcommerceStore } from '../../../ecommerce-store';
import { RouterLink } from "@angular/router";
import { StarRating } from "../star-rating/star-rating";

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, MatIconModule, MatButtonModule, RouterLink, StarRating],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {

  product = input.required<Product>();

  store = inject(EcommerceStore);


}
