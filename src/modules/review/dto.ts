export type ReviewDTO = {
  name: string;
  rating: number;
  content: string;
  date: Date;
  id: string;
};

export type CreateReviewData = {
  name: string;
  rating?: number;
  content: string;
  phone: string;
  isPublic: boolean;
  restaurantId: string;
};
