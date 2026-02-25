import { Component } from '@angular/core';
import { BackButton } from '../../../../shared/components/back-button/back-button';
import { ListCartItems } from '../../components/list-cart-items/list-cart-items';

@Component({
  selector: 'app-view-cart',
  imports: [BackButton, ListCartItems],
  templateUrl: './view-cart.html',
  styleUrl: './view-cart.scss',
})
export default class ViewCart {

}
