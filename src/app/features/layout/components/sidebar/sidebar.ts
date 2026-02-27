import { TitleCasePipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { MatListItem, MatListItemTitle, MatNavList } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { EcommerceStore } from '../../../../ecommerce-store';

@Component({
  selector: 'app-sidebar',
  imports: [MatNavList, MatListItem, MatListItemTitle, RouterLink, TitleCasePipe],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  store = inject(EcommerceStore);
  mobile = input(false);

  categories = signal<string[]>(['all', 'electronics', 'clothing', 'accessories', 'home']);

  onCategoryClick(): void {
    if (this.mobile()) {
      this.store.closeSidebar();
    }
  }
}
