import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { ViewPanel } from '../../../../../shared/directives/view-panel';

@Component({
  selector: 'app-payment-form',
  imports: [MatIcon, MatRadioButton, MatRadioGroup, ViewPanel],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.scss',
})
export class PaymentForm {

}
