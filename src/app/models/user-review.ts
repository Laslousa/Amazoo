export interface UserReview {
    id: string;
    productId: string;
    userName: string;
    userImageUrl: string;
    rating: number;
    comment: string;
    title: string;
    reviewDate: Date;
}

export type AddReviewParams = Pick<UserReview, 'rating' | 'comment' | 'title'>;
