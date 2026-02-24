import { computed, inject } from '@angular/core';
import { Product } from './models/product';
import {
  signalStore,
  withState,
  withComputed,
  patchState,
  withMethods,
  signalMethod,
} from '@ngrx/signals';
import { produce } from 'immer';
import { Toaster } from './services/toaster';
export type EcommerceState = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
};

const initialState: EcommerceState = {
  products: [
    {
      id: '1',
      name: 'Wireless Noise-Cancelling Headphones',
      description:
        'Premium wireless headphones with active noise cancellation and 30-hour battery life',
      price: 299.99,
      imageUrl:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&w=400&q=80',
      rating: 4.8,
      reviewCount: 6,
      inStock: true,
      category: 'electronics',
    },
    {
      id: '2',
      name: 'Smart 4K TV',
      description: '65-inch OLED Smart TV with HDR and built-in streaming apps',
      price: 1299.99,
      imageUrl:
        'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&w=400&q=80',
      rating: 4.6,
      reviewCount: 6,
      inStock: true,
      category: 'electronics',
    },
    {
      id: '3',
      name: 'Professional Camera',
      description: 'Mirrorless digital camera with 4K video capabilities',
      price: 899.99,
      imageUrl:
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&w=400&q=80',
      rating: 4.7,
      reviewCount: 6,
      inStock: true,
      category: 'electronics',
    },
    {
      id: '4',
      name: 'Classic Denim Jacket',
      description: 'Vintage-style denim jacket with modern fit',
      price: 79.99,
      imageUrl:
        'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&w=400&q=80',
      rating: 4.5,
      reviewCount: 5,
      inStock: true,
      category: 'clothing',
    },
    {
      id: '5',
      name: 'Cotton T-Shirt Pack',
      description: 'Set of 3 premium cotton t-shirts in essential colors',
      price: 34.99,
      imageUrl:
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&w=400&q=80',
      rating: 4.3,
      reviewCount: 6,
      inStock: true,
      category: 'clothing',
    },
    {
      id: '6',
      name: 'Wool Winter Coat',
      description: 'Elegant wool-blend coat perfect for cold weather',
      price: 199.99,
      imageUrl:
        'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&w=400&q=80',
      rating: 4.6,
      reviewCount: 6,
      inStock: true,
      category: 'clothing',
    },
    {
      id: '7',
      name: 'Leather Watch',
      description: 'Classic analog watch with genuine leather strap',
      price: 149.99,
      imageUrl:
        'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&w=400&q=80',
      rating: 4.7,
      reviewCount: 5,
      inStock: true,
      category: 'accessories',
    },
    {
      id: '8',
      name: 'Designer Sunglasses',
      description: 'UV-protected polarized sunglasses with premium frame',
      price: 129.99,
      imageUrl:
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&w=400&q=80',
      rating: 4.4,
      reviewCount: 6,
      inStock: true,
      category: 'accessories',
    },
    {
      id: '9',
      name: 'Leather Wallet',
      description: 'Handcrafted leather wallet with RFID protection',
      price: 49.99,
      imageUrl:
        'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&w=400&q=80',
      rating: 4.5,
      reviewCount: 6,
      inStock: true,
      category: 'accessories',
    },
    {
      id: '10',
      name: 'Smart Coffee Maker',
      description: 'WiFi-enabled coffee maker with programmable brewing',
      price: 199.99,
      imageUrl:
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&w=400&q=80',
      rating: 4.7,
      reviewCount: 5,
      inStock: true,
      category: 'home',
    },
    {
      id: '11',
      name: 'Air Purifier',
      description: 'HEPA air purifier with air quality monitoring',
      price: 249.99,
      imageUrl:
        'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&w=400&q=80',
      rating: 4.8,
      reviewCount: 5,
      inStock: true,
      category: 'home',
    },
    {
      id: '12',
      name: 'Robot Vacuum',
      description: 'Smart robot vacuum with mapping and scheduling',
      price: 399.99,
      imageUrl:
        'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&w=400&q=80',
      rating: 4.6,
      reviewCount: 6,
      inStock: false,
      category: 'home',
    },
  ],
  category: 'all',
  wishlistItems: [],
};

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),
  withComputed(({ category, products, wishlistItems }) => ({
    filteredProducts: computed(() => {
      const currentCategory = category();
      if (currentCategory === 'all') return products();
      return products().filter(
        (product) => product.category.toLowerCase() === currentCategory.toLowerCase(),
      );
    }),
    wishlistCount: computed(() => wishlistItems().length ),
  })),
  withMethods((store, toaster = inject(Toaster)) => ({
    setCategory: signalMethod<string>((category: string) => {
      patchState(store, { category });
    }),
    addToWishList: (product: Product) => {
      const updatedWishListItems = produce(store.wishlistItems(), (draft) => {
        if (!draft.find((p) => p.id === product.id)) {
          draft.push(product);
        }
      });

      patchState(store, { wishlistItems: updatedWishListItems });
      toaster.success(`Product added to wishlist`);
    },

    removeFromWishlist: (product: Product) => {
      patchState(store, {
        wishlistItems: store.wishlistItems().filter((p) => p.id !== product.id),
      });
      toaster.success(`Product removed from wishlist`);
      }
  })),
);

