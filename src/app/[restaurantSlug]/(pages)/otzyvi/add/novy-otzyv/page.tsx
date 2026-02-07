'use client';

import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Section } from 'app/_layout/Section';
import { SectionInfo } from 'app/_layout/SectionInfo';
import { useRouter } from 'next/navigation';
import { PrimaryButton, SecondaryButton } from 'theme/components/Button';
import { FormTextField } from 'theme/components/Fields/FormTextField';
import { FlexBox } from 'theme/components/FlexBox';
import { Paragraph } from 'theme/components/Typography';

import { useActiveRestaurant } from 'modules/restaurant/hooks';
import { CreateReviewData } from 'modules/review/dto';
import { createReviewUseCase } from 'modules/review/usecase';

import * as Styled from './styled';
import { useForm } from './useForm';

export default function NovyOtzyvPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const router = useRouter();

  const { activeRestaurant } = useActiveRestaurant();

  const {
    contentRegistration,
    phoneRegistration,
    nameRegistration,
    ratingRegistration,
    errors,
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm();

  const currentRating = watch('rating');

  const onSubmit = async (data: CreateReviewData) => {
    setIsLoading(true);

    await createReviewUseCase({
      ...data,
      restaurantId: activeRestaurant!.id,
      isPublic: true,
      onSuccess: () => {
        setIsLoading(false);
        reset();

        router.replace(`/${activeRestaurant?.slug}/otzyvi/success`);
      },
      onError: () => {
        setIsLoading(false);
        setError('Что-то пошло не так. Попробуйте позже.');
      },
    });
  };

  return (
    <Section>
      <SectionInfo
        center
        content={
          <FlexBox direction="column" gap="8px" marginTop="16px">
            <SecondaryButton
              fullWidth
              icon={<FcGoogle size={20} />}
              label="Оставить отзыв на Google картах"
            />
            <Styled.Separator>Или</Styled.Separator>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Styled.StarsWrapper>
                <input
                  type="hidden"
                  value={currentRating ?? ''}
                  {...ratingRegistration}
                />
                <Styled.Stars>
                  {[1, 2, 3, 4, 5].map((value) => {
                    const isActive =
                      (hoveredRating ?? currentRating ?? 0) >= value;

                    return (
                      <Styled.StarButton
                        aria-label={`Поставить ${value} ${value === 1 ? 'звезду' : 'звезды'
                          }`}
                        aria-pressed={currentRating === value}
                        key={value}
                        type="button"
                        onClick={() => {
                          setValue('rating', value, {
                            shouldDirty: true,
                            shouldTouch: true,
                            shouldValidate: true,
                          });
                        }}
                        onMouseEnter={() => setHoveredRating(value)}
                        onMouseLeave={() => setHoveredRating(null)}
                      >
                        <FaStar
                          color={isActive ? '#3f8f4a' : '#e5e7eb'}
                          size={28}
                        />
                      </Styled.StarButton>
                    );
                  })}
                </Styled.Stars>
                {errors.rating && (
                  <Paragraph color="#ff3b30" level={4} marginTop="2px">
                    {errors.rating.message}
                  </Paragraph>
                )}
              </Styled.StarsWrapper>
              <FlexBox gap="16px">
                <FormTextField
                  required
                  error={errors.name?.message}
                  label="Имя"
                  placeholder="Введите имя"
                  registration={nameRegistration}
                />
                <FormTextField
                  required
                  error={errors.phone?.message}
                  label="Телефон"
                  mask="+375 00 000-00-00"
                  placeholder="+375 00 000-00-00"
                  registration={phoneRegistration}
                />
              </FlexBox>
              <FormTextField
                required
                error={errors.content?.message}
                label="Текст отзыва"
                placeholder="Введите текст отзыва"
                registration={contentRegistration}
                rows={6}
              />
              <Paragraph color="#ff3b30" level={3} marginBottom="6px">
                {error}
              </Paragraph>
              <PrimaryButton
                fullWidth
                label="Отправить отзыв"
                loading={isLoading}
              />
            </form>
          </FlexBox>
        }
        description="Мы рады, что вам все понравилось! Мы ценим ваше мнение и будем благодарны, если вы поделитесь им"
        maxWidth="600px"
        title="Оставьте отзыв"
      />
    </Section>
  );
}
