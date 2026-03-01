'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Skeleton } from 'theme/components/Skeleton';

import { useActiveRestaurant } from 'modules/restaurant/hooks';

import * as Styled from './styled';

type Banner = {
  id: string;
  image: string;
  title?: string;
  description?: string;
  link?: string;
};

// Пример данных баннеров - в будущем можно получать с API
const mockBanners: Banner[] = [
  {
    id: '1',
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=400&fit=crop',
    title: 'Скидка 20% на все блюда',
    description: 'Только сегодня! Успейте заказать',
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=400&fit=crop',
    title: 'Бесплатная доставка',
    description: 'При заказе от 1000 рублей',
  },
  {
    id: '3',
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=400&fit=crop',
    title: 'Новое меню',
    description: 'Попробуйте наши новые блюда',
  },
];

export const PromoBanners = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const { activeRestaurant } = useActiveRestaurant();

  const banners = mockBanners;

  const deliveryMinSum =
    activeRestaurant?.deliveryMinFreeSum != null
      ? Math.round(activeRestaurant.deliveryMinFreeSum)
      : 35;

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Возобновляем автопрокрутку через 5 секунд
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

        {banners.length > 0 && (
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
        )}
      </Styled.Content>
    </Styled.Wrapper>
  );
};
