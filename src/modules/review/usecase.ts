import { snackbar } from 'app/_layout/Snackbars';

import { CreateReviewData } from './dto';
import { getCreateReviewMessages } from './notifications';
import { createReview } from './service';

export const createReviewUseCase = ({
  onSuccess,
  onError,
  ...reviewData
}: CreateReviewData & {
  onSuccess: () => void;
  onError: () => void;
}) =>
  snackbar
    .promise(
      createReview.request(createReview.getUrl(), {
        arg: reviewData,
      }),
      getCreateReviewMessages(),
    )
    .then(() => {
      onSuccess();
    })
    .catch(() => {
      onError();
    });
