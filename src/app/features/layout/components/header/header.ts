import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { EcommerceStore } from '../../../../ecommerce-store';
import { HeaderActions } from '../header-actions/header-actions';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    RouterLink,
    HeaderActions,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  store = inject(EcommerceStore);
  private readonly router = inject(Router);

  onSearchInput(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.store.setSearchTerm(searchTerm);

    if (!this.router.url.startsWith('/products')) {
      this.router.navigate(['/products/all']);
    }
  }

  clearSearch(): void {
    this.store.setSearchTerm('');
  }

  toggleSidebar(): void {
    this.store.toggleSidebar();
  }
}
