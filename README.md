# Amazoo: Signal-Driven E-Commerce Frontend (Angular)

## 1. Project Title and Overview

### 1.1 Title
**Amazoo - A Modular E-Commerce Frontend Using Angular Signals and Material Design**

### 1.2 Overview
This project is a portfolio-grade implementation of an e-commerce web application built with Angular 21. It focuses on modular frontend engineering, reactive state management, and scalable UI composition.

The application provides a complete browsing-to-checkout user journey, including product exploration, wishlist management, cart operations, authentication dialogs, checkout flow, and post-order confirmation.

### 1.3 Problem Statement
E-commerce interfaces require consistent state synchronization across multiple views (catalog, product detail, wishlist, cart, and checkout), while preserving responsiveness and maintainability. This project addresses that problem by centralizing domain state in a signal-based store and organizing the codebase by feature domains.

### 1.4 Context and Objectives
The project was developed as a software engineering portfolio artifact with the following objectives:
- Demonstrate clean feature-first Angular architecture.
- Implement predictable client-side state transitions for core commerce operations.
- Build reusable UI primitives and domain-specific components.
- Showcase modern Angular capabilities (standalone components, signals, component input binding, view transitions, SSR hydration support).

## 2. Implemented Features

### 2.1 Functional Features
- Product catalog with category filtering (`all`, `electronics`, `clothing`, `accessories`, `home`).
- Search capability across product name and description.
- Product detail view with stock indicator, pricing, rating, and review history.
- Add-to-cart with quantity control and in-cart quantity updates.
- Wishlist management (add, remove, clear, move cart item to wishlist, add all wishlist items to cart).
- Checkout flow with order summary (subtotal, tax, total) and simulated order placement.
- Authentication dialogs (sign-in/sign-up) with checkout gating.
- Review submission (authenticated user path) and dynamic rating recalculation.

### 2.2 UI/UX Features
- Responsive layout with adaptive sidebar behavior based on viewport size.
- Sticky header with integrated search and quick-access action badges (wishlist/cart counters).
- Empty states for product search results and wishlist.
- Toast feedback for key actions (wishlist/cart/auth events, loading failures).
- Smooth route/view transitions and consistent card/panel design language.
- Material 3 + Tailwind-assisted styling with custom theme tokens.

### 2.3 Technical Features
- Signal-based centralized state store using `@ngrx/signals`.
- Immutable state updates via `immer`.
- Local persistence of selected state slices (`wishlistItems`, `cartItems`, `user`) using storage sync.
- Route-level lazy loading through standalone component imports.
- SSR-compatible Angular setup with hydration/event replay.
- Domain model typing (`Product`, `CartItem`, `Order`, `User`, `UserReview`) for stronger compile-time safety.

## 3. Architecture

### 3.1 High-Level Architecture
The system follows a feature-first component architecture:
- `features/` contains domain workflows (`products`, `cart`, `wishlist`, `layout`).
- `shared/` contains reusable UI components, directives, and validators.
- `ecommerce-store.ts` acts as the central application state boundary.
- Routing composes pages from feature modules using lazy component loading.

### 3.2 Folder Structure Explanation
```text
src/
  app/
    features/
      products/      # Catalog, product detail, reviews
      cart/          # Cart pages, checkout, order success
      wishlist/      # Wishlist page and empty state
      layout/        # Header, sidebar, navigation actions
    shared/
      components/    # Reusable UI units (card, rating, dialogs, selectors)
      directives/    # Shared view-level directive(s)
    models/          # Domain interfaces and request payload types
    services/        # Cross-cutting services (toaster)
    ecommerce-store.ts # Central signal store (state, computed, methods, lifecycle)
  styles.scss         # Global theming, Material/Tailwind integration
public/
  data/products.json  # Product catalog seed data
```

### 3.3 State Management Approach
State is managed through a single signal store (`EcommerceStore`) with:
- **State slices**: products, filters, wishlist, cart, user, loading, UI state.
- **Computed selectors**: filtered product list, wishlist count, cart count, selected product.
- **Methods**: domain actions for cart, wishlist, auth, checkout, and reviews.
- **Persistence**: local storage synchronization for user/wishlist/cart continuity.

This approach provides deterministic state transitions with low boilerplate compared to reducer-heavy alternatives.

### 3.4 Data Flow Explanation
1. User interaction triggers a component event (e.g., add to cart, set category, submit review).
2. The component invokes a store method.
3. The store updates state (`patchState`, immutable updates via `produce`).
4. Computed signals derive dependent values.
5. Templates reactively re-render from updated signals.
6. Optional side effects occur (toast notifications, navigation, simulated async operations).

## 4. Technology Stack

### 4.1 Frontend Technologies
- Angular 21 (standalone components, router, forms, SSR support)
- TypeScript 5.9
- Angular Material (Material 3 design system components)
- Tailwind CSS 4 (utility-first layout/styling support)
- NgRx Signals (`@ngrx/signals`) for state management
- Immer for immutable update ergonomics

### 4.2 Tooling
- Angular CLI for build, serve, and project scaffolding
- npm as package manager
- PostCSS + Tailwind build integration
- Express server runtime for SSR output serving
- Hot Toast (`@ngxpert/hot-toast`) for user notifications

## 5. Design Decisions

### 5.1 Architectural Choices and Rationale
- **Feature-first organization** was selected to improve scalability and isolate domain concerns.
- **Signal store centralization** was chosen to reduce prop drilling and synchronize cross-page state.
- **Standalone components + lazy routes** were adopted to reduce module overhead and improve route-level loading behavior.
- **Local JSON catalog source** provides deterministic development data and reproducible UI behavior during frontend-focused iteration.
- **Reusable shared components/directives** improve consistency and reduce repeated markup logic.

### 5.2 Trade-offs Considered
- The current authentication and order placement flows are mocked for frontend demonstration, trading production realism for implementation focus.
- A single global store simplifies coordination but can become broad as domain complexity increases.
- Local storage persistence improves user continuity but is not a secure persistence layer for sensitive data.
- Shipping/payment forms prioritize UX structure and visual flow; advanced validation and payment integration are deferred.

## 6. Installation and Setup

### 6.1 Prerequisites
- Node.js 20+ (or 22 LTS recommended for Angular 21 compatibility)
- npm
- Angular CLI (optional globally; local CLI via npm scripts is sufficient)

### 6.2 Setup Steps
1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd ecommerce-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open:
   ```text
   http://localhost:4200/
   ```
5. Build for production:
   ```bash
   npm run build
   ```
6. (Optional) Serve SSR build output:
   ```bash
   npm run serve:ssr:ecommerce-app
   ```

### 6.3 Useful Commands
```bash
npm start        # Development server
npm run build    # Production build
npm run watch    # Development build in watch mode
npm test         # Test runner command (no dedicated specs currently committed)
```

## 7. Future Improvements

- Integrate a real backend API for authentication, products, orders, and reviews.
- Add route guards and role-aware access policies for protected flows.
- Implement robust form validation (shipping/payment) and error handling.
- Integrate real payment processing provider flow.
- Add automated tests (unit, component, integration, and end-to-end).
- Introduce analytics, observability, and performance budgets in CI.
- Add i18n and accessibility audits (keyboard, screen-reader, color contrast).

## 8. Screenshots

> Replace the placeholders below with actual project captures.

### 8.1 Home / Product Grid
![Home Page Placeholder](docs/screenshots/home-page.png)

### 8.2 Product Detail
![Product Detail Placeholder](docs/screenshots/product-detail.png)

### 8.3 Cart and Checkout
![Cart Placeholder](docs/screenshots/cart.png)
![Checkout Placeholder](docs/screenshots/checkout.png)

### 8.4 Wishlist and Authentication Dialogs
![Wishlist Placeholder](docs/screenshots/wishlist.png)
![Auth Dialog Placeholder](docs/screenshots/auth-dialog.png)
