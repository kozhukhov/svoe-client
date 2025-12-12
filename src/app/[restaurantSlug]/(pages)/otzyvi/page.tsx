'use client';

import { useMemo } from 'react';
import { PageLayout } from 'app/_layout/PageLayout';
import { Section } from 'app/_layout/Section';
import { SectionInfo } from 'app/_layout/SectionInfo';
import { formatToLongDate } from 'lib/utils';
import { PrimaryButton } from 'theme/components/Button';
import { Skeleton } from 'theme/components/Skeleton';
import { Paragraph } from 'theme/components/Typography';

import { useReviews } from 'modules/review/hooks';

import * as Styled from './styled';

export default function OtzyviPage() {
  const {
    reviews,
    reviewsHasMore,
    reviewsTotal,
    isReviewsLoading,
    isReviewsValidating,
    loadMoreReviews,
  } = useReviews();

  const reviewWord = useMemo(
    () =>
      Number(reviewsTotal.toString().split('').pop()) < 5
        ? 'отзыва'
        : 'отзывов',
    [reviewsTotal],
  );

  return (
    <Section>
      <SectionInfo
        center
        content={<PrimaryButton label="Оставить отзыв" />}
        description="Мы внимательно читаем каждое мнение, чтобы делать наши блюда и сервис ещё лучше."
        title={
          <>
            Всего собрано <Styled.Count>{reviewsTotal}</Styled.Count>{' '}
            {reviewWord} от наших гостей
          </>
        }
      />
      {isReviewsLoading ? (
        <Styled.Reviews>
          <Skeleton height="140px" width="100%" />
          <Skeleton height="140px" width="100%" />
          <Skeleton height="140px" width="100%" />
          <Skeleton height="140px" width="100%" />
          <Skeleton height="140px" width="100%" />
          <Skeleton height="140px" width="100%" />
        </Styled.Reviews>
      ) : (
        <PageLayout
          hasMore={reviewsHasMore}
          isLoading={isReviewsLoading}
          isValidating={isReviewsValidating}
          loadMore={loadMoreReviews}
        >
          <Styled.Reviews>
            {reviews.map((review) => (
              <Styled.ReviewCard key={review.id}>
                <Styled.ReviewHeader>
                  <div>
                    <Paragraph fontWeight={700} level={2}>
                      {review.name}
                    </Paragraph>
                    <Paragraph level={3}>
                      {formatToLongDate(review.date)}
                    </Paragraph>
                  </div>
                  <Styled.RatingBadge>
                    <span aria-hidden>★</span>
                    {review.rating.toFixed(1)}
                  </Styled.RatingBadge>
                </Styled.ReviewHeader>
                <Paragraph level={3}>{review.content}</Paragraph>
              </Styled.ReviewCard>
            ))}
          </Styled.Reviews>
        </PageLayout>
      )}
    </Section>
  );
}
