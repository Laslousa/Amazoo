import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'products/all' },
    { path: "products/:category", loadComponent: () => import('./features/products/pages/products-grid/products-grid')},
    { path: "product/:productId", loadComponent: () => import('./features/products/pages/view-product-detail/view-product-detail')},
    { path: "wishlist", loadComponent: () => import('./features/wishlist/pages/wishlist/wishlist')},
    { path: "cart", loadComponent: () => import('./features/cart/pages/view-cart/view-cart')},
    { path: "checkout", loadComponent: () => import('./features/cart/pages/checkout/checkout')},
    { path: "order-success", loadComponent: () => import('./features/cart/pages/order-success/order-success')}
];
