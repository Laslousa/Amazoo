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
  wishlistItems: Product[];
  cartItems: CartItem[];
  user: User | undefined;
  loading: boolean;
  selectedProductId: string | undefined;
  writeReview: boolean;
};

const initialState: EcommerceState = {
  products: [
    // Electronics
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
      reviews: [
        {
          id: '1-1',
          productId: '1',
          userName: 'Sarah Johnson',
          userImageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
          rating: 5,
          title: 'Amazing noise cancellation!',
          comment:
            'These headphones are incredible. The noise cancellation works perfectly on flights and the battery lasts all day.',
          reviewDate: new Date('2024-01-15'),
        },
        {
          id: '1-2',
          productId: '1',
          userName: 'Mike Chen',
          userImageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
          rating: 5,
          title: 'Worth every penny',
          comment:
            'Premium build quality and excellent sound. The 30-hour battery life is not an exaggeration.',
          reviewDate: new Date('2024-02-03'),
        },
        {
          id: '1-3',
          productId: '1',
          userName: 'Emily Rodriguez',
          userImageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
          rating: 4,
          title: 'Great for work from home',
          comment:
            'Perfect for blocking out distractions during video calls. Comfortable for long wear.',
          reviewDate: new Date('2024-02-18'),
        },
        {
          id: '1-4',
          productId: '1',
          userName: 'David Wilson',
          userImageUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
          rating: 5,
          title: "Best headphones I've owned",
          comment:
            'The sound quality is exceptional and the noise cancellation is top-notch. Highly recommend!',
          reviewDate: new Date('2024-03-05'),
        },
        {
          id: '1-5',
          productId: '1',
          userName: 'Lisa Park',
          userImageUrl: 'https://randomuser.me/api/portraits/women/5.jpg',
          rating: 4,
          title: 'Excellent for travel',
          comment:
            'Used these on a 12-hour flight and they were perfect. The case is also very convenient.',
          reviewDate: new Date('2024-03-12'),
        },
        {
          id: '1-6',
          productId: '1',
          userName: 'James Thompson',
          userImageUrl: 'https://randomuser.me/api/portraits/men/6.jpg',
          rating: 5,
          title: 'Superior audio experience',
          comment:
            'Crystal clear highs and deep bass. The wireless connection is stable and quick to pair.',
          reviewDate: new Date('2024-03-20'),
        },
      ],
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
      reviews: [
        {
          id: '2-1',
          productId: '2',
          userName: 'Robert Martinez',
          userImageUrl: 'https://randomuser.me/api/portraits/men/7.jpg',
          rating: 5,
          title: 'Stunning picture quality',
          comment:
            'The OLED display is absolutely gorgeous. HDR content looks amazing and the smart features work flawlessly.',
          reviewDate: new Date('2024-01-20'),
        },
        {
          id: '2-2',
          productId: '2',
          userName: 'Jennifer Lee',
          userImageUrl: 'https://randomuser.me/api/portraits/women/8.jpg',
          rating: 4,
          title: 'Great TV, minor issues',
          comment:
            'Picture is fantastic but the remote could be better. Overall very happy with the purchase.',
          reviewDate: new Date('2024-02-05'),
        },
        {
          id: '2-3',
          productId: '2',
          userName: 'Tom Anderson',
          userImageUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
          rating: 5,
          title: 'Perfect for movie nights',
          comment:
            'The 65-inch screen is perfect for our living room. Colors are vibrant and blacks are truly black.',
          reviewDate: new Date('2024-02-14'),
        },
        {
          id: '2-4',
          productId: '2',
          userName: 'Maria Garcia',
          userImageUrl: 'https://randomuser.me/api/portraits/women/10.jpg',
          rating: 4,
          title: 'Easy setup and great apps',
          comment:
            'Setup was straightforward and all the streaming apps work perfectly. Great value for money.',
          reviewDate: new Date('2024-02-28'),
        },
        {
          id: '2-5',
          productId: '2',
          userName: 'Kevin Brown',
          userImageUrl: 'https://randomuser.me/api/portraits/men/11.jpg',
          rating: 5,
          title: 'Excellent for gaming',
          comment:
            'Low input lag and great response time for gaming. The 4K upscaling is also impressive.',
          reviewDate: new Date('2024-03-08'),
        },
        {
          id: '2-6',
          productId: '2',
          userName: 'Amanda White',
          userImageUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
          rating: 4,
          title: 'Beautiful design',
          comment:
            'The TV looks sleek and modern. Picture quality is excellent, though it took some time to calibrate.',
          reviewDate: new Date('2024-03-15'),
        },
      ],
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
      reviews: [
        {
          id: '3-1',
          productId: '3',
          userName: 'Alex Cooper',
          userImageUrl: 'https://randomuser.me/api/portraits/men/13.jpg',
          rating: 5,
          title: 'Professional quality results',
          comment:
            'This camera delivers outstanding image quality. The 4K video is crisp and the autofocus is lightning fast.',
          reviewDate: new Date('2024-01-10'),
        },
        {
          id: '3-2',
          productId: '3',
          userName: 'Rachel Green',
          userImageUrl: 'https://randomuser.me/api/portraits/women/14.jpg',
          rating: 4,
          title: 'Great for beginners too',
          comment:
            "Despite being professional-grade, it's surprisingly user-friendly. The auto modes work great for learning.",
          reviewDate: new Date('2024-01-25'),
        },
        {
          id: '3-3',
          productId: '3',
          userName: 'Steve Miller',
          userImageUrl: 'https://randomuser.me/api/portraits/men/15.jpg',
          rating: 5,
          title: 'Perfect for travel photography',
          comment:
            'Lightweight yet powerful. The image stabilization is excellent for handheld shots.',
          reviewDate: new Date('2024-02-12'),
        },
        {
          id: '3-4',
          productId: '3',
          userName: 'Diana Prince',
          userImageUrl: 'https://randomuser.me/api/portraits/women/16.jpg',
          rating: 4,
          title: 'Excellent build quality',
          comment:
            'Feels solid and well-made. The menu system takes some getting used to but overall fantastic camera.',
          reviewDate: new Date('2024-02-20'),
        },
        {
          id: '3-5',
          productId: '3',
          userName: 'Chris Evans',
          userImageUrl: 'https://randomuser.me/api/portraits/men/17.jpg',
          rating: 5,
          title: 'Amazing low light performance',
          comment:
            'The sensor performs incredibly well in low light conditions. Perfect for evening events.',
          reviewDate: new Date('2024-03-02'),
        },
        {
          id: '3-6',
          productId: '3',
          userName: 'Sophie Turner',
          userImageUrl: 'https://randomuser.me/api/portraits/women/18.jpg',
          rating: 4,
          title: 'Great value for money',
          comment:
            'Compared to other cameras in this price range, this one offers the best features and quality.',
          reviewDate: new Date('2024-03-10'),
        },
      ],
    },
    // Clothing
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
      reviews: [
        {
          id: '4-1',
          productId: '4',
          userName: 'Jessica Adams',
          userImageUrl: 'https://randomuser.me/api/portraits/women/19.jpg',
          rating: 5,
          title: 'Perfect fit and style',
          comment:
            'This jacket fits exactly as expected. The vintage look is authentic and the modern cut is flattering.',
          reviewDate: new Date('2024-01-08'),
        },
        {
          id: '4-2',
          productId: '4',
          userName: 'Mark Davis',
          userImageUrl: 'https://randomuser.me/api/portraits/men/20.jpg',
          rating: 4,
          title: 'Good quality denim',
          comment:
            'The material feels sturdy and well-made. Sizing runs true to size. Great everyday jacket.',
          reviewDate: new Date('2024-01-22'),
        },
        {
          id: '4-3',
          productId: '4',
          userName: 'Lauren Smith',
          userImageUrl: 'https://randomuser.me/api/portraits/women/21.jpg',
          rating: 4,
          title: 'Versatile wardrobe staple',
          comment:
            'Goes with everything! The wash is perfect - not too light, not too dark. Very happy with this purchase.',
          reviewDate: new Date('2024-02-07'),
        },
        {
          id: '4-4',
          productId: '4',
          userName: 'Ryan Johnson',
          userImageUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
          rating: 5,
          title: 'Excellent craftsmanship',
          comment:
            'The stitching is solid and the buttons feel high quality. This jacket will last for years.',
          reviewDate: new Date('2024-02-15'),
        },
        {
          id: '4-5',
          productId: '4',
          userName: 'Megan Wilson',
          userImageUrl: 'https://randomuser.me/api/portraits/women/23.jpg',
          rating: 4,
          title: 'Great for layering',
          comment:
            'Perfect weight for spring and fall. Looks great over dresses or with jeans and a tee.',
          reviewDate: new Date('2024-02-28'),
        },
        {
          id: '4-6',
          productId: '4',
          userName: 'Tyler Brown',
          userImageUrl: 'https://randomuser.me/api/portraits/men/24.jpg',
          rating: 5,
          title: 'Classic style done right',
          comment:
            'Exactly what I was looking for. The fit is modern but still has that classic denim jacket vibe.',
          reviewDate: new Date('2024-03-05'),
        },
      ],
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
      reviews: [
        {
          id: '5-1',
          productId: '5',
          userName: 'Hannah Taylor',
          userImageUrl: 'https://randomuser.me/api/portraits/women/25.jpg',
          rating: 4,
          title: 'Great value pack',
          comment:
            'Three high-quality shirts for a great price. The cotton is soft and they wash well.',
          reviewDate: new Date('2024-01-12'),
        },
        {
          id: '5-2',
          productId: '5',
          userName: 'Nathan Clark',
          userImageUrl: 'https://randomuser.me/api/portraits/men/26.jpg',
          rating: 4,
          title: 'Perfect basics',
          comment:
            'These are exactly what I needed for everyday wear. Comfortable fit and good colors.',
          reviewDate: new Date('2024-01-28'),
        },
        {
          id: '5-3',
          productId: '5',
          userName: 'Olivia Moore',
          userImageUrl: 'https://randomuser.me/api/portraits/women/27.jpg',
          rating: 5,
          title: 'Excellent quality cotton',
          comment:
            'The material is really soft and breathable. Perfect for layering or wearing alone.',
          reviewDate: new Date('2024-02-10'),
        },
        {
          id: '5-4',
          productId: '5',
          userName: 'Jake Williams',
          userImageUrl: 'https://randomuser.me/api/portraits/men/28.jpg',
          rating: 4,
          title: 'Good fit and colors',
          comment: 'The sizing is accurate and the colors are as shown. Great wardrobe essentials.',
          reviewDate: new Date('2024-02-22'),
        },
        {
          id: '5-5',
          productId: '5',
          userName: 'Emma Davis',
          userImageUrl: 'https://randomuser.me/api/portraits/women/29.jpg',
          rating: 4,
          title: 'Holds up well after washing',
          comment:
            'After multiple washes, these shirts still look and feel great. No shrinking or fading.',
          reviewDate: new Date('2024-03-01'),
        },
        {
          id: '5-6',
          productId: '5',
          userName: 'Lucas Anderson',
          userImageUrl: 'https://randomuser.me/api/portraits/men/30.jpg',
          rating: 4,
          title: 'Comfortable everyday wear',
          comment: 'These have become my go-to shirts. Comfortable, well-made, and versatile.',
          reviewDate: new Date('2024-03-08'),
        },
      ],
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
      reviews: [
        {
          id: '6-1',
          productId: '6',
          userName: 'Grace Miller',
          userImageUrl: 'https://randomuser.me/api/portraits/women/31.jpg',
          rating: 5,
          title: 'Elegant and warm',
          comment:
            'This coat is both stylish and incredibly warm. Perfect for harsh winter weather.',
          reviewDate: new Date('2024-01-05'),
        },
        {
          id: '6-2',
          productId: '6',
          userName: 'Benjamin Lee',
          userImageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
          rating: 4,
          title: 'High quality wool blend',
          comment: 'The material feels premium and the construction is solid. Runs slightly large.',
          reviewDate: new Date('2024-01-18'),
        },
        {
          id: '6-3',
          productId: '6',
          userName: 'Chloe Wilson',
          userImageUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
          rating: 5,
          title: 'Perfect winter coat',
          comment: 'Keeps me warm in freezing temperatures and looks professional for work.',
          reviewDate: new Date('2024-01-30'),
        },
        {
          id: '6-4',
          productId: '6',
          userName: 'Daniel Garcia',
          userImageUrl: 'https://randomuser.me/api/portraits/men/34.jpg',
          rating: 4,
          title: 'Great for business wear',
          comment: 'Looks sharp over suits. The fit is tailored and the quality is excellent.',
          reviewDate: new Date('2024-02-08'),
        },
        {
          id: '6-5',
          productId: '6',
          userName: 'Isabella Martinez',
          userImageUrl: 'https://randomuser.me/api/portraits/women/35.jpg',
          rating: 4,
          title: 'Stylish and functional',
          comment: 'Love the classic design. The pockets are deep and the coat is wind-resistant.',
          reviewDate: new Date('2024-02-16'),
        },
        {
          id: '6-6',
          productId: '6',
          userName: 'Ethan Thompson',
          userImageUrl: 'https://randomuser.me/api/portraits/men/36.jpg',
          rating: 5,
          title: 'Worth the investment',
          comment:
            'This coat will last for years. The wool blend is durable and the style is timeless.',
          reviewDate: new Date('2024-02-25'),
        },
      ],
    },
    // Accessories
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
      reviews: [
        {
          id: '7-1',
          productId: '7',
          userName: 'Victoria Chen',
          userImageUrl: 'https://randomuser.me/api/portraits/women/37.jpg',
          rating: 5,
          title: 'Beautiful classic design',
          comment:
            'This watch is elegant and timeless. The leather strap is comfortable and high quality.',
          reviewDate: new Date('2024-01-03'),
        },
        {
          id: '7-2',
          productId: '7',
          userName: 'Michael Rodriguez',
          userImageUrl: 'https://randomuser.me/api/portraits/men/38.jpg',
          rating: 4,
          title: 'Great everyday watch',
          comment:
            'Perfect for both casual and business attire. Keeps accurate time and looks professional.',
          reviewDate: new Date('2024-01-16'),
        },
        {
          id: '7-3',
          productId: '7',
          userName: 'Sophia Johnson',
          userImageUrl: 'https://randomuser.me/api/portraits/women/39.jpg',
          rating: 5,
          title: 'Excellent craftsmanship',
          comment:
            'The attention to detail is impressive. The watch face is clear and the movement is smooth.',
          reviewDate: new Date('2024-01-24'),
        },
        {
          id: '7-4',
          productId: '7',
          userName: 'Andrew Wilson',
          userImageUrl: 'https://randomuser.me/api/portraits/men/40.jpg',
          rating: 4,
          title: 'Good value for money',
          comment: 'Looks more expensive than it is. The leather strap is genuine and comfortable.',
          reviewDate: new Date('2024-02-06'),
        },
        {
          id: '7-5',
          productId: '7',
          userName: 'Madison Brown',
          userImageUrl: 'https://randomuser.me/api/portraits/women/41.jpg',
          rating: 5,
          title: 'Perfect gift',
          comment:
            'Bought this as a gift and it was very well received. Comes in a nice presentation box.',
          reviewDate: new Date('2024-02-14'),
        },
        {
          id: '7-6',
          productId: '7',
          userName: 'Joshua Davis',
          userImageUrl: 'https://randomuser.me/api/portraits/men/42.jpg',
          rating: 4,
          title: 'Classic and reliable',
          comment:
            'This watch goes with everything. The analog display is easy to read and stylish.',
          reviewDate: new Date('2024-02-20'),
        },
      ],
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
      reviews: [
        {
          id: '8-1',
          productId: '8',
          userName: 'Ashley Taylor',
          userImageUrl: 'https://randomuser.me/api/portraits/women/43.jpg',
          rating: 5,
          title: 'Excellent UV protection',
          comment:
            'These sunglasses are perfect for sunny days. The polarization really reduces glare.',
          reviewDate: new Date('2024-01-07'),
        },
        {
          id: '8-2',
          productId: '8',
          userName: 'Connor Martinez',
          userImageUrl: 'https://randomuser.me/api/portraits/men/44.jpg',
          rating: 4,
          title: 'Stylish and comfortable',
          comment: 'Great looking sunglasses that fit well. The frame feels sturdy and premium.',
          reviewDate: new Date('2024-01-19'),
        },
        {
          id: '8-3',
          productId: '8',
          userName: 'Zoe Anderson',
          userImageUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
          rating: 4,
          title: 'Perfect for driving',
          comment:
            'The polarized lenses make a huge difference when driving. Very comfortable to wear.',
          reviewDate: new Date('2024-01-31'),
        },
        {
          id: '8-4',
          productId: '8',
          userName: 'Brandon Lee',
          userImageUrl: 'https://randomuser.me/api/portraits/men/46.jpg',
          rating: 4,
          title: 'Good quality frame',
          comment:
            "The frame is well-made and doesn't feel cheap. Lenses are clear and distortion-free.",
          reviewDate: new Date('2024-02-11'),
        },
        {
          id: '8-5',
          productId: '8',
          userName: 'Natalie White',
          userImageUrl: 'https://randomuser.me/api/portraits/women/47.jpg',
          rating: 4,
          title: 'Great for outdoor activities',
          comment: 'Perfect for hiking and beach days. The UV protection is excellent.',
          reviewDate: new Date('2024-02-18'),
        },
        {
          id: '8-6',
          productId: '8',
          userName: 'Jordan Clark',
          userImageUrl: 'https://randomuser.me/api/portraits/men/48.jpg',
          rating: 5,
          title: 'Designer quality at fair price',
          comment:
            'These look and feel like much more expensive designer sunglasses. Very impressed.',
          reviewDate: new Date('2024-02-26'),
        },
      ],
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
      reviews: [
        {
          id: '9-1',
          productId: '9',
          userName: 'Samuel Green',
          userImageUrl: 'https://randomuser.me/api/portraits/men/49.jpg',
          rating: 5,
          title: 'Perfect size and quality',
          comment:
            'This wallet is the perfect size - not too bulky but holds everything I need. The leather is top quality.',
          reviewDate: new Date('2024-01-09'),
        },
        {
          id: '9-2',
          productId: '9',
          userName: 'Lily Parker',
          userImageUrl: 'https://randomuser.me/api/portraits/women/50.jpg',
          rating: 4,
          title: 'Great RFID protection',
          comment: 'Love the RFID blocking feature. Gives me peace of mind when traveling.',
          reviewDate: new Date('2024-01-21'),
        },
        {
          id: '9-3',
          productId: '9',
          userName: 'Carter Wilson',
          userImageUrl: 'https://randomuser.me/api/portraits/men/51.jpg',
          rating: 4,
          title: 'Well-crafted wallet',
          comment:
            'The stitching is excellent and the leather feels premium. Great value for the price.',
          reviewDate: new Date('2024-02-02'),
        },
        {
          id: '9-4',
          productId: '9',
          userName: 'Harper Davis',
          userImageUrl: 'https://randomuser.me/api/portraits/women/52.jpg',
          rating: 5,
          title: 'Excellent gift choice',
          comment:
            'Bought this as a gift for my husband. He loves the slim profile and quality construction.',
          reviewDate: new Date('2024-02-13'),
        },
        {
          id: '9-5',
          productId: '9',
          userName: 'Mason Johnson',
          userImageUrl: 'https://randomuser.me/api/portraits/men/53.jpg',
          rating: 4,
          title: 'Durable and functional',
          comment:
            'After 6 months of daily use, this wallet still looks great. The card slots are perfectly sized.',
          reviewDate: new Date('2024-02-19'),
        },
        {
          id: '9-6',
          productId: '9',
          userName: 'Avery Brown',
          userImageUrl: 'https://randomuser.me/api/portraits/women/54.jpg',
          rating: 4,
          title: 'Sleek design',
          comment:
            'The minimalist design is exactly what I was looking for. Fits perfectly in small purses.',
          reviewDate: new Date('2024-02-27'),
        },
      ],
    },
    // Home
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
      reviews: [
        {
          id: '10-1',
          productId: '10',
          userName: 'Logan Miller',
          userImageUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
          rating: 5,
          title: 'Perfect morning routine',
          comment:
            "I can start my coffee from bed using the app. The coffee tastes great and it's so convenient.",
          reviewDate: new Date('2024-01-11'),
        },
        {
          id: '10-2',
          productId: '10',
          userName: 'Aria Garcia',
          userImageUrl: 'https://randomuser.me/api/portraits/women/56.jpg',
          rating: 4,
          title: 'Easy to use app',
          comment:
            'The WiFi setup was simple and the app is intuitive. Love being able to schedule brewing times.',
          reviewDate: new Date('2024-01-23'),
        },
        {
          id: '10-3',
          productId: '10',
          userName: 'Caleb Anderson',
          userImageUrl: 'https://randomuser.me/api/portraits/men/57.jpg',
          rating: 5,
          title: 'Great coffee quality',
          comment:
            'The brewing temperature and timing are perfect. Makes coffee shop quality drinks at home.',
          reviewDate: new Date('2024-02-04'),
        },
        {
          id: '10-4',
          productId: '10',
          userName: 'Maya Thompson',
          userImageUrl: 'https://randomuser.me/api/portraits/women/58.jpg',
          rating: 4,
          title: 'Smart features work well',
          comment:
            'The programmable features are great for busy mornings. Coffee is always ready when I wake up.',
          reviewDate: new Date('2024-02-12'),
        },
        {
          id: '10-5',
          productId: '10',
          userName: 'Ian Wilson',
          userImageUrl: 'https://randomuser.me/api/portraits/men/59.jpg',
          rating: 5,
          title: 'Excellent build quality',
          comment:
            'Feels solid and well-made. The carafe keeps coffee hot for hours without burning it.',
          reviewDate: new Date('2024-02-21'),
        },
        {
          id: '10-6',
          productId: '10',
          userName: 'Layla Martinez',
          userImageUrl: 'https://randomuser.me/api/portraits/women/60.jpg',
          rating: 4,
          title: 'Worth the investment',
          comment:
            'More expensive than basic coffee makers but the smart features make it worth it.',
          reviewDate: new Date('2024-03-03'),
        },
      ],
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
      reviews: [
        {
          id: '11-1',
          productId: '11',
          userName: 'Elena Rodriguez',
          userImageUrl: 'https://randomuser.me/api/portraits/women/61.jpg',
          rating: 5,
          title: 'Amazing for allergies',
          comment:
            'This air purifier has made a huge difference for my seasonal allergies. The air quality monitor is very helpful.',
          reviewDate: new Date('2024-01-04'),
        },
        {
          id: '11-2',
          productId: '11',
          userName: 'Owen Lee',
          userImageUrl: 'https://randomuser.me/api/portraits/men/62.jpg',
          rating: 5,
          title: 'Quiet and effective',
          comment:
            'Runs quietly even on high speed. The HEPA filter really works - I can see the difference in air quality.',
          reviewDate: new Date('2024-01-17'),
        },
        {
          id: '11-3',
          productId: '11',
          userName: 'Ruby Chen',
          userImageUrl: 'https://randomuser.me/api/portraits/women/63.jpg',
          rating: 4,
          title: 'Great for pet owners',
          comment:
            'Helps with pet dander and odors. The real-time air quality display is a nice touch.',
          reviewDate: new Date('2024-01-26'),
        },
        {
          id: '11-4',
          productId: '11',
          userName: 'Felix Johnson',
          userImageUrl: 'https://randomuser.me/api/portraits/men/64.jpg',
          rating: 5,
          title: 'Excellent air quality improvement',
          comment:
            'Noticed cleaner air within hours of setup. The monitoring feature helps track improvements.',
          reviewDate: new Date('2024-02-09'),
        },
        {
          id: '11-5',
          productId: '11',
          userName: 'Stella Brown',
          userImageUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
          rating: 5,
          title: 'Perfect for large rooms',
          comment:
            'Covers my entire living room effectively. The automatic mode adjusts based on air quality.',
          reviewDate: new Date('2024-02-17'),
        },
        {
          id: '11-6',
          productId: '11',
          userName: 'Jasper Davis',
          userImageUrl: 'https://randomuser.me/api/portraits/men/66.jpg',
          rating: 4,
          title: 'Great investment for health',
          comment:
            'Worth every penny for the health benefits. Easy to maintain and replace filters.',
          reviewDate: new Date('2024-02-24'),
        },
      ],
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
      reviews: [
        {
          id: '12-1',
          productId: '12',
          userName: 'Nova Wilson',
          userImageUrl: 'https://randomuser.me/api/portraits/women/67.jpg',
          rating: 5,
          title: 'Life-changing convenience',
          comment:
            'This robot vacuum has transformed my cleaning routine. The mapping feature is incredibly accurate.',
          reviewDate: new Date('2024-01-06'),
        },
        {
          id: '12-2',
          productId: '12',
          userName: 'River Martinez',
          userImageUrl: 'https://randomuser.me/api/portraits/men/68.jpg',
          rating: 4,
          title: 'Smart navigation',
          comment:
            'Navigates around furniture perfectly and rarely gets stuck. The scheduling feature is very convenient.',
          reviewDate: new Date('2024-01-14'),
        },
        {
          id: '12-3',
          productId: '12',
          userName: 'Sage Garcia',
          userImageUrl: 'https://randomuser.me/api/portraits/women/69.jpg',
          rating: 4,
          title: 'Great for pet hair',
          comment:
            'Picks up pet hair really well. The suction power is impressive for such a compact device.',
          reviewDate: new Date('2024-01-29'),
        },
        {
          id: '12-4',
          productId: '12',
          userName: 'Phoenix Anderson',
          userImageUrl: 'https://randomuser.me/api/portraits/men/70.jpg',
          rating: 5,
          title: 'Excellent app integration',
          comment: 'The mobile app is well-designed and makes controlling the vacuum effortless.',
          reviewDate: new Date('2024-02-07'),
        },
        {
          id: '12-5',
          productId: '12',
          userName: 'Rowan Thompson',
          userImageUrl: 'https://randomuser.me/api/portraits/women/71.jpg',
          rating: 4,
          title: 'Good battery life',
          comment:
            'Can clean my entire house on one charge. Returns to dock automatically when battery is low.',
          reviewDate: new Date('2024-02-15'),
        },
        {
          id: '12-6',
          productId: '12',
          userName: 'Atlas Lee',
          userImageUrl: 'https://randomuser.me/api/portraits/men/72.jpg',
          rating: 5,
          title: 'Worth the investment',
          comment:
            'More expensive than basic models but the smart features and reliability make it worth it.',
          reviewDate: new Date('2024-02-23'),
        },
      ],
    },
  ],
  category: 'all',
  wishlistItems: [],
  cartItems: [],
  user: undefined,
  loading: false,
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
  withComputed(({ category, products, wishlistItems, cartItems, selectedProductId }) => ({
    filteredProducts: computed(() => {
      const currentCategory = category();
      if (currentCategory === 'all') return products();
      return products().filter(
        (product) => product.category.toLowerCase() === currentCategory.toLowerCase(),
      );
    }),
    wishlistCount: computed(() => wishlistItems().length),
    cartCount: computed(() => cartItems().reduce((total, item) => total + item.quantity, 0)),
    selectedProduct: computed(() => products().find((p) => p.id === selectedProductId())),
  })),
  withMethods(
    (store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
      setCategory: signalMethod<string>((category: string) => {
        patchState(store, { category });
      }),

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
);
