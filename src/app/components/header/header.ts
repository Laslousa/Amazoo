import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderActions } from '../header-actions/header-actions';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, HeaderActions],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

}
