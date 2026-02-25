import { Component, inject } from '@angular/core';
import { BackButton } from '../../../../shared/components/back-button/back-button';
import { EcommerceStore } from '../../../../ecommerce-store';
import { ProductCard } from '../../../../shared/components/product-card/product-card';
import { MatIcon } from "@angular/material/icon";
import { MatButton, MatIconButton } from '@angular/material/button';
import { EmptyWishlist } from '../../components/empty-wishlist/empty-wishlist';

@Component({
  selector: 'app-wishlist',
  imports: [BackButton, ProductCard, MatIcon, MatIconButton, MatButton, EmptyWishlist],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss',
})
export default class Wishlist {

  store = inject(EcommerceStore);

}
