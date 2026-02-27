import { Component, computed, inject, input } from '@angular/core';
import { EcommerceStore } from '../../../../ecommerce-store';
import { BackButton } from "../../../../shared/components/back-button/back-button";
import { ProductInfo } from './product-info/product-info';
import { ViewReviews } from './view-reviews/view-reviews';

@Component({
  selector: 'app-view-product-detail',
  imports: [BackButton, ProductInfo, ViewReviews],
  templateUrl: './view-product-detail.html',
  styleUrl: './view-product-detail.scss',
})
export default class ViewProductDetail {

  productId = input.required<string>();
  store = inject(EcommerceStore); 

  constructor(){
    this.store.setProductId(this.productId);
  }

  backRoute = computed(() => `/products/${this.store.category()}`);

}
