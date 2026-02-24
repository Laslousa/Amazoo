import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'products' },
    { path: "products", loadComponent: () => import('./components/products-grid/products-grid')},
    { path: "wishlist", loadComponent: () => import('./components/wishlist/wishlist')},
];
