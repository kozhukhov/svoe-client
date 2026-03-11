'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFetch } from 'lib/services/APIService';
import { Skeleton } from 'theme/components/Skeleton';

import { BannerDTO } from 'modules/banner/dto';
import { getBanners } from 'modules/banner/service';
import { useActiveRestaurant } from 'modules/restaurant/hooks';

import * as Styled from './styled';

type Props = {
  initialBanners?: BannerDTO[];
  deliveryMinFreeSum?: number;
};

export const PromoBanners = ({
  initialBanners,
  deliveryMinFreeSum: initialDeliveryMinFreeSum,
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const { activeRestaurant } = useActiveRestaurant();

  const bannersKey =
    !initialBanners && activeRestaurant?.id
      ? getBanners.getUrl({ restaurantId: activeRestaurant.id })
      : null;

  const { data: bannersData, isLoading: isBannersLoading } = useFetch<
    Awaited<ReturnType<typeof getBanners.request>>
  >(bannersKey, getBanners.request);

  const banners = useMemo(
    () =>
      (initialBanners ?? bannersData ?? []).map((b) => ({
        id: b.id,
        image: b.imageUrl,
        title: b.title ?? undefined,
        description: b.description ?? undefined,
        link: b.linkUrl ?? undefined,
      })),
    [initialBanners, bannersData],
  );

  const isLoading = !initialBanners && isBannersLoading;

  const deliveryMinSum =
    initialDeliveryMinFreeSum != null
      ? Math.round(initialDeliveryMinFreeSum)
      : activeRestaurant?.deliveryMinFreeSum != null
        ? Math.round(activeRestaurant.deliveryMinFreeSum)
        : 35;

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  useEffect(() => {
    if (!isAutoPlaying || banners.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, banners.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrevious();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleImageLoad = (bannerId: string) => {
    setLoadedImages((prev) => ({ ...prev, [bannerId]: true }));
  };

  const handleImageError = (bannerId: string) => {
    setLoadedImages((prev) => ({ ...prev, [bannerId]: true }));
  };

  return (
    <Styled.Wrapper>
      <Styled.Content>
        <Styled.WelcomeSection>
          <Styled.WelcomeTitle>
            Бесплатная доставка по всему городу от{' '}
            <Styled.Price>{deliveryMinSum}</Styled.Price> рублей
          </Styled.WelcomeTitle>
          <Styled.WelcomeDescription>
            Закажите вкусные блюда с доставкой или самовывозом. Свежие
            ингредиенты и быстрое приготовление.
          </Styled.WelcomeDescription>
        </Styled.WelcomeSection>

        {isLoading ? (
          <Styled.SliderSkeleton>
            <Styled.SliderSkeletonInner>
              <Skeleton height="100%" width="100%" />
            </Styled.SliderSkeletonInner>
          </Styled.SliderSkeleton>
        ) : banners.length > 0 ? (
          <Styled.SliderContainer>
            <Styled.Slider
              $currentIndex={currentIndex}
              onTouchEnd={handleTouchEnd}
              onTouchMove={handleTouchMove}
              onTouchStart={handleTouchStart}
            >
              {banners.map((banner) => {
                const isLoaded = loadedImages[banner.id];
                return (
                  <Styled.Slide key={banner.id}>
                    {!isLoaded && (
                      <Styled.SkeletonWrapper>
                        <Skeleton height="100%" width="100%" />
                      </Styled.SkeletonWrapper>
                    )}
                    <Styled.SlideImage
                      $loaded={isLoaded}
                      alt="Промо-баннер"
                      src={banner.image}
                      onError={() => handleImageError(banner.id)}
                      onLoad={() => handleImageLoad(banner.id)}
                    />
                  </Styled.Slide>
                );
              })}
            </Styled.Slider>

            {banners.length > 1 && (
              <Styled.ProgressBars>
                {banners.map((_, index) => (
                  <Styled.ProgressBar
                    $active={index === currentIndex}
                    key={index}
                    type="button"
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </Styled.ProgressBars>
            )}
          </Styled.SliderContainer>
        ) : null}
      </Styled.Content>
    </Styled.Wrapper>
  );
};
