'use client';

import { useCallback, useState } from 'react';
import { PageLayout } from 'app/_layout/PageLayout';
import { Section } from 'app/_layout/Section';
import { SectionInfo } from 'app/_layout/SectionInfo';
import { formatToLongDate } from 'lib/utils';
import { useRouter } from 'next/navigation';
import { PrimaryButton } from 'theme/components/Button';
import { Paragraph } from 'theme/components/Typography';

import { ReviewDTO } from 'modules/review/dto';
import { getReviews } from 'modules/review/service';
import { SeoDataDTO } from 'modules/seo/dto';

import * as Styled from '../styled';

type Props = {
  initialReviews: ReviewDTO[];
  initialHasMore: boolean;
  initialTotal: number;
  restaurantId: string;
  restaurantSlug: string;
  seoData: SeoDataDTO;
};

export const OtzyviPageClient = ({
  initialReviews,
  initialHasMore,
  initialTotal,
  restaurantId,
  restaurantSlug,
  seoData,
}: Props) => {
  const router = useRouter();
  const [reviews, setReviews] = useState(initialReviews);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(1);
  const [isValidating, setIsValidating] = useState(false);

  const lastDigit = Number(initialTotal.toString().split('').pop());
  const reviewWord = lastDigit < 5 ? 'отзыва' : 'отзывов';

  const loadMore = useCallback(async () => {
    if (!hasMore || isValidating) return;
    const nextPage = page + 1;
    setIsValidating(true);
    try {
      const url = getReviews.getUrl({
        restaurantID: restaurantId,
        page: nextPage,
      });
      const result = await getReviews.request(url);
      setReviews((prev) => [...prev, ...result.items]);
      setHasMore(result.hasMore);
      setPage(nextPage);
    } finally {
      setIsValidating(false);
    }
  }, [hasMore, isValidating, page, restaurantId]);

  return (
    <Section>
      <SectionInfo
        center
        content={
          <PrimaryButton
            label="Оставить отзыв"
            onClick={() => router.push(`/${restaurantSlug}/otzyvi/add`)}
          />
        }
        description={seoData.description ?? ''}
        title={
          <>
            Всего собрано <Styled.Count>{initialTotal}</Styled.Count>{' '}
            {reviewWord} от наших гостей
          </>
        }
      />
      <PageLayout
        hasMore={hasMore}
        isValidating={isValidating}
        loadMore={loadMore}
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
    </Section>
  );
};
