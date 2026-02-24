import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderActions } from '../header-actions/header-actions';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, HeaderActions, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

}
