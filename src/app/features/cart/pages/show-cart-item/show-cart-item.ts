import { Component, computed, inject, input } from '@angular/core';
import { CartItem } from '../../../../models/cartItem';
import { CurrencyPipe } from '@angular/common';
import { QuantitySelector } from "../../../../shared/components/quantity-selector/quantity-selector";
import { EcommerceStore } from '../../../../ecommerce-store';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-show-cart-item',
  imports: [CurrencyPipe, QuantitySelector, MatIconButton, MatIcon],
  templateUrl: './show-cart-item.html',
  styleUrl: './show-cart-item.scss',
})
export class ShowCartItem {

  item = input.required<CartItem>();

  store = inject(EcommerceStore) ; 

  total = computed(() => (this.item().product.price * this.item().quantity).toFixed(2));
  

}
