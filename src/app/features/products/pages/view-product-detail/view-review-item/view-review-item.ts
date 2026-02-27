import { Component, input } from '@angular/core';
import { UserReview } from '../../../../../models/user-review';
import { StarRating } from "../../../../../shared/components/star-rating/star-rating";
import { DatePipe } from '@angular/common';
import { ViewPanel } from '../../../../../shared/directives/view-panel';

@Component({
  selector: 'app-view-review-item',
  imports: [StarRating, DatePipe, ViewPanel],
  templateUrl: './view-review-item.html',
  styleUrl: './view-review-item.scss',
})
export class ViewReviewItem {

  review = input.required<UserReview>();

}
