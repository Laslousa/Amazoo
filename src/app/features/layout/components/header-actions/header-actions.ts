import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatBadge } from '@angular/material/badge';
import { EcommerceStore } from '../../../../ecommerce-store';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDivider } from "@angular/material/divider";
import { SignInDialog } from '../../../../shared/components/sign-in-dialog/sign-in-dialog';
import { MatDialog } from '@angular/material/dialog';
import { SignUpDialog } from '../../../../shared/components/sign-up-dialog/sign-up-dialog';

@Component({
  selector: 'app-header-actions',
  imports: [MatIconModule, MatButtonModule, RouterLink, MatBadge, MatMenu, MatMenuTrigger, MatMenuItem, MatDivider],
  templateUrl: './header-actions.html',
  styleUrl: './header-actions.scss',
})
export class HeaderActions {

  store = inject(EcommerceStore)
  matDialog = inject(MatDialog);

  openSignInDialog() {
    this.matDialog.open(SignInDialog, {
     disableClose: true,
    });
  }

  openSignUpDialog() {
    this.matDialog.open(SignUpDialog, {
      disableClose: true,
     });
   }
}
   
