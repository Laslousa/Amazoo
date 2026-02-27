import { computed, inject } from '@angular/core';
import { Product } from './models/product';
import {
  signalStore,
  withState,
  withComputed,
  patchState,
  withMethods,
  signalMethod,
  withHooks,
} from '@ngrx/signals';
import { produce } from 'immer';
import { Toaster } from './services/toaster';
import { CartItem } from './models/cartItem';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from './shared/components/sign-in-dialog/sign-in-dialog';
import { SignInParams, SignUpParams, User } from './models/user';
import { Router } from '@angular/router';
import { Order } from './models/order';
import { withLocalStorage, withStorageSync } from '@angular-architects/ngrx-toolkit';
import { AddReviewParams, UserReview } from './models/user-review';

export type EcommerceState = {
  products: Product[];
  category: string;
  searchTerm: string;
  wishlistItems: Product[];
  cartItems: CartItem[];
  user: User | undefined;
  loading: boolean;
  sidebarOpen: boolean;
  selectedProductId: string | undefined;
  writeReview: boolean;
};

type ProductReviewFromJson = Omit<UserReview, 'reviewDate'> & {
  reviewDate: string;
};

type ProductFromJson = Omit<Product, 'reviews'> & {
  reviews: ProductReviewFromJson[];
};

const PRODUCTS_DATA_PATH = 'data/products.json';

const shuffleProducts = (products: Product[]): Product[] => {
  const shuffledProducts = [...products];

  for (let i = shuffledProducts.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledProducts[i], shuffledProducts[randomIndex]] = [
      shuffledProducts[randomIndex],
      shuffledProducts[i],
    ];
  }

  return shuffledProducts;
};

const mapProductsFromJson = (products: ProductFromJson[]): Product[] =>
  products.map((product) => ({
    ...product,
    reviews: product.reviews.map((review) => ({
      ...review,
      reviewDate: new Date(review.reviewDate),
    })),
  }));

const initialState: EcommerceState = {
  products: [],
  category: 'all',
  searchTerm: '',
  wishlistItems: [],
  cartItems: [],
  user: undefined,
  loading: false,
  sidebarOpen: true,
  selectedProductId: undefined,
  writeReview: false,
};

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),
  withStorageSync(
    {
      key: 'amazoo',
      select: ({ wishlistItems, cartItems, user }) => ({ wishlistItems, cartItems, user }),
    },
    withLocalStorage(),
  ),
  withComputed(({ category, products, wishlistItems, cartItems, selectedProductId, searchTerm }) => ({
    filteredProducts: computed(() => {
      const currentCategory = category();
      const normalizedSearchTerm = searchTerm().trim().toLowerCase();

      const productsByCategory =
        currentCategory === 'all'
          ? products()
          : products().filter(
              (product) => product.category.toLowerCase() === currentCategory.toLowerCase(),
            );

      if (!normalizedSearchTerm) {
        return productsByCategory;
      }

      return productsByCategory.filter((product) =>
        `${product.name} ${product.description}`.toLowerCase().includes(normalizedSearchTerm),
      );
    }),
    wishlistCount: computed(() => wishlistItems().length),
    cartCount: computed(() => cartItems().reduce((total, item) => total + item.quantity, 0)),
    selectedProduct: computed(() => products().find((p) => p.id === selectedProductId())),
  })),
  withMethods(
    (store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
      loadProducts: async () => {
        if (store.products().length > 0 || typeof window === 'undefined') {
          return;
        }

        patchState(store, { loading: true });

        try {
          const response = await fetch(PRODUCTS_DATA_PATH);

          if (!response.ok) {
            throw new Error(`Unable to fetch products: ${response.status}`);
          }

          const productsFromJson = (await response.json()) as ProductFromJson[];
          const mappedProducts = mapProductsFromJson(productsFromJson);
          patchState(store, { products: shuffleProducts(mappedProducts) });
        } catch (error) {
          console.error('Failed to load products', error);
          toaster.error('Unable to load products');
          patchState(store, { products: [] });
        } finally {
          patchState(store, { loading: false });
        }
      },

      setCategory: signalMethod<string>((category: string) => {
        patchState(store, { category });
      }),

      setSearchTerm: signalMethod<string>((searchTerm: string) => {
        patchState(store, { searchTerm });
      }),

      toggleSidebar: () => {
        patchState(store, { sidebarOpen: !store.sidebarOpen() });
      },

      openSidebar: () => {
        patchState(store, { sidebarOpen: true });
      },

      closeSidebar: () => {
        patchState(store, { sidebarOpen: false });
      },

      setProductId: signalMethod<string>((productId: string) => {
        patchState(store, { selectedProductId: productId });
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
      },

      clearWishlist: () => {
        patchState(store, { wishlistItems: [] });
      },

      addToCart: (product: Product, quantity: number) => {
        const existingItemIndex = store
          .cartItems()
          .findIndex((item) => item.product.id === product.id);
        const updatedCartItems = produce(store.cartItems(), (draft) => {
          if (existingItemIndex >= 0) {
            draft[existingItemIndex].quantity += quantity;
          } else {
            draft.push({ product, quantity });
          }
        });
        patchState(store, { cartItems: updatedCartItems });
        toaster.success(
          existingItemIndex >= 0 ? 'Product quantity updated in cart' : 'Product added to cart',
        );
      },

      setItemQuantity(productId: string, quantity: number) {
        const index = store.cartItems().findIndex((item) => item.product.id === productId);
        const updatedCartItems = produce(store.cartItems(), (draft) => {
          draft[index].quantity = quantity;
        });
        patchState(store, { cartItems: updatedCartItems });
      },

      addAllWishlistToCart: () => {
        const updatedCartItems = produce(store.cartItems(), (draft) => {
          store.wishlistItems().forEach((product) => {
            if (!draft.find((item) => item.product.id === product.id)) {
              draft.push({ product, quantity: 1 });
            }
          });
        });
        patchState(store, { cartItems: updatedCartItems, wishlistItems: [] });
        toaster.success('All wishlist items added to cart');
      },

      moveToWishList: (product: Product) => {
        const updatedCartItems = store.cartItems().filter((item) => item.product.id !== product.id);
        const updatedWishListItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });
        patchState(store, { cartItems: updatedCartItems, wishlistItems: updatedWishListItems });
        toaster.success('Product moved to wishlist');
      },

      removeFromCart: (productId: string) => {
        patchState(store, {
          cartItems: store.cartItems().filter((item) => item.product.id !== productId),
        });
        toaster.success('Product removed from cart');
      },

      proceedToCheckout: () => {
        if (!store.user()) {
          matDialog.open(SignInDialog, {
            disableClose: true,
            data: {
              checkout: true,
            },
          });
        } else {
          router.navigate(['/checkout']);
        }
      },

      placeOrder: async () => {
        patchState(store, { loading: true });
        const user = store.user();
        if (!user) {
          toaster.error('Please login before placing order');
          patchState(store, { loading: false });
          return;
        }

        const order: Order = {
          id: crypto.randomUUID(),
          userId: user.id,
          total: Math.round(
            store.cartItems().reduce((acc, item) => acc + item.quantity * item.product.price, 0),
          ),
          items: store.cartItems(),
          paymentStatus: 'success',
        };

        await new Promise((resolve) => setTimeout(resolve, 1000));
        patchState(store, { cartItems: [], loading: false });
        router.navigate(['order-success']);
      },

      signIn: ({ email, password, checkout, dialogId }: SignInParams) => {
        patchState(store, {
          user: {
            id: '1',
            name: 'Laslousa',
            email,
            imageUrl: 'photo de profil.jpg',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },

      signOut: () => {
        patchState(store, { user: undefined });
        router.navigate(['/products/all']);
        toaster.success('You have been signed out');
      },

      signUp: ({ email, password, name, checkout, dialogId }: SignUpParams) => {
        patchState(store, {
          user: {
            id: '1',
            name: 'Laslousa',
            email,
            imageUrl: 'photo de profil.jpg',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },

      showWriteReview: () => {
        patchState(store, { writeReview: true });
      },

      hideWriteReview: () => {
        patchState(store, { writeReview: false });
      },

      addReview: async ({ title, comment, rating }: AddReviewParams) => {
        patchState(store, { loading: true });

        const product = store.products().find((p) => p.id === store.selectedProductId());

        if (!product) {
          patchState(store, { loading: false });
          return;
        }

        const review: UserReview = {
          id: crypto.randomUUID(),
          title,
          comment,
          rating,
          productId: product.id,
          userName: store.user()?.name || '',
          userImageUrl: store.user()?.imageUrl || '',
          reviewDate: new Date(),
        };

        const updatedProducts = produce(store.products(), (draft) => {
          const index = draft.findIndex((p) => p.id === product.id);
          draft[index].reviews.push(review);

          draft[index].rating =
            Math.round(
              (draft[index].reviews.reduce((acc, r) => acc + r.rating, 0) /
                draft[index].reviews.length) *
                10,
            ) / 10;

          draft[index].reviewCount = draft[index].reviews.length;
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));

        patchState(store, { loading: false, products: updatedProducts, writeReview: false });
      },
    }),
  ),
  withHooks({
    onInit(store) {
      void store.loadProducts();
    },
  }),
);
