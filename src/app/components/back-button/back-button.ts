import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-back-button',
  imports: [RouterLink, MatIcon, MatButton],
  templateUrl: './back-button.html',
  styleUrl: './back-button.scss',
})
export class BackButton {

  navigateTo = input<string>();

}
