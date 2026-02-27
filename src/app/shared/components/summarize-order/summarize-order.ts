import { Component, computed, inject } from '@angular/core';
import { ViewPanel } from "../../directives/view-panel";
import { EcommerceStore } from '../../../ecommerce-store';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-summarize-order',
  imports: [ViewPanel, CurrencyPipe],
  templateUrl: './summarize-order.html',
  styleUrl: './summarize-order.scss',
})
export class SummarizeOrder {

  store = inject(EcommerceStore);

  subTotal = computed(() => {
    return Math.round(this.store.cartItems().reduce((total, item) => total + item.product.price * item.quantity, 0) * 100) / 100;
  });

  tax = computed(() => Math.round(this.subTotal() * 0.05 * 100) / 100);

  total = computed(() => this.subTotal() + this.tax());

}
