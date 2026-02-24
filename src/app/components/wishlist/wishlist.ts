import { Component, inject } from '@angular/core';
import { BackButton } from "../back-button/back-button";
import { EcommerceStore } from '../../ecommerce-store';
import { ProductCard } from "../product-card/product-card";

@Component({
  selector: 'app-wishlist',
  imports: [BackButton, ProductCard],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss',
})
export default class Wishlist {

  store = inject(EcommerceStore);

}
