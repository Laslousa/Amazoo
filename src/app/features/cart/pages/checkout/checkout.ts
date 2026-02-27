import { Component, inject } from '@angular/core';
import { BackButton } from "../../../../shared/components/back-button/back-button";
import { PaymentForm } from './payment-form/payment-form';
import { ShippingForm } from './shipping-form/shipping-form';
import { SummarizeOrder } from "../../../../shared/components/summarize-order/summarize-order";
import { EcommerceStore } from '../../../../ecommerce-store';
import { CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-checkout',
  imports: [BackButton, PaymentForm, ShippingForm, SummarizeOrder, CurrencyPipe, MatButton],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export default class Checkout {

  store = inject(EcommerceStore);

}
