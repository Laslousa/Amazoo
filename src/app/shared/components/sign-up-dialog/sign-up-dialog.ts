import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { passwordsMatchValidator } from '../validators/password-validator';
import { EcommerceStore } from '../../../ecommerce-store';
import { Sign } from 'crypto';
import { SignUpParams } from '../../../models/user';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [
    MatIcon,
    MatIconButton,
    MatDialogClose,
    MatFormField,
    MatInput,
    MatPrefix,
    MatButton,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-up-dialog.html',
  styleUrl: './sign-up-dialog.scss',
})
export class SignUpDialog {
  store = inject(EcommerceStore);
  dialogRef = inject(MatDialogRef);
  matDialog = inject(MatDialog);
  fb = inject(NonNullableFormBuilder);
  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);

  signUpForm = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordsMatchValidator },
  );

  signUp() {
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const { name, email, password } = this.signUpForm.value;
    this.store.signUp({
      name,
      email,
      password,
      dialogId: this.dialogRef.id,
      checkout: this.data?.checkout,
    } as SignUpParams);
  }

  openSignInDialog() {
    this.dialogRef.close();
    this.matDialog.open(SignInDialog, {
      data: {
        checkout: this.data?.checkout,
      },
    });

  }

}
