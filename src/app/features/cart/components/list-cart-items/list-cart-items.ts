import { Component, inject } from '@angular/core';
import { EcommerceStore } from '../../../../ecommerce-store';
import { ShowCartItem } from "../../pages/show-cart-item/show-cart-item";
import { ViewPanel } from '../../../../shared/directives/view-panel';

@Component({
  selector: 'app-list-cart-items',
  imports: [ShowCartItem, ViewPanel],
  templateUrl: './list-cart-items.html',
  styleUrl: './list-cart-items.scss',
})
export class ListCartItems {

  store = inject(EcommerceStore)

}
