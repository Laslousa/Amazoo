import { Component, computed, inject, input, signal } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCard } from "../product-card/product-card";
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatNavList, MatListItemTitle } from '@angular/material/list';
import { MatListItem } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { EcommerceStore } from '../../ecommerce-store';
@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, MatSidenav, MatSidenavContainer, MatSidenavContent, MatNavList, MatListItem, MatListItemTitle, RouterLink, TitleCasePipe],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})
export default class ProductsGrid {

  category = input<string>("all");

  store = inject(EcommerceStore);

  categories = signal<string[]>(["all", "electronics", "clothing", "accessories", "home"]);

  constructor(){
    this.store.setCategory(this.category);
  }


}
