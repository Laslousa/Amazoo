import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OptionItem } from '../../../../../models/option-item';
import { ViewPanel } from '../../../../../shared/directives/view-panel';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { EcommerceStore } from '../../../../../ecommerce-store';
import { AddReviewParams } from '../../../../../models/user-review';

@Component({
  selector: 'app-write-review',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatSelect,
    MatOption,
    MatButton,
    ReactiveFormsModule,
    ViewPanel,
  ],
  templateUrl: './write-review.html',
  styleUrl: './write-review.scss',
  host: {
    class: 'block',
  },
})
export class WriteReview {
  fb = inject(NonNullableFormBuilder);
  store = inject(EcommerceStore);

  ratingOptions = signal<OptionItem[]>([
    { label: '5 Stars - Excellent', value: 5 },
    { label: '4 Stars - Good', value: 4 },
    { label: '3 Stars - Average', value: 3 },
    { label: '2 Stars - Poor', value: 2 },
    { label: '1 Star - Terrible', value: 1 },
  ]);

  reviewForm = this.fb.group({
    rating: [5, Validators.required],
    title: ['', Validators.required],
    comment: ['', Validators.required],
  });

  saveReview() {
    if (!this.reviewForm.valid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    const { title, comment, rating } = this.reviewForm.value;
    this.store.addReview({ title, comment, rating } as AddReviewParams);
  }
}
