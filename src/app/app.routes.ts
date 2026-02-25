import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'products/all' },
    { path: "products/:category", loadComponent: () => import('./features/products/pages/products-grid/products-grid')},
    { path: "wishlist", loadComponent: () => import('./features/wishlist/pages/wishlist/wishlist')},
    { path: "cart", loadComponent: () => import('./features/cart/pages/view-cart/view-cart')},

];
