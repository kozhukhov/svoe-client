'use client';

import { useState } from 'react';
import { Section } from 'app/_layout/Section';
import { SectionInfo } from 'app/_layout/SectionInfo';
import { useRouter } from 'next/navigation';
import { PrimaryButton } from 'theme/components/Button';
import { FormTextField } from 'theme/components/Fields/FormTextField';
import { FlexBox } from 'theme/components/FlexBox';
import { Paragraph } from 'theme/components/Typography';

import { useActiveRestaurant } from 'modules/restaurant/hooks';
import { CreateReviewData } from 'modules/review/dto';
import { createReviewUseCase } from 'modules/review/usecase';

import { useForm } from './useForm';

export default function PismoDirectoruPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const router = useRouter();

  const { activeRestaurant } = useActiveRestaurant();

  const {
    contentRegistration,
    phoneRegistration,
    nameRegistration,
    errors,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data: CreateReviewData) => {
    setIsLoading(true);

    await createReviewUseCase({
      ...data,
      restaurantId: activeRestaurant!.id,
      rating: 1,
      isPublic: false,
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
          <FlexBox direction="column" gap="8px">
            <form onSubmit={handleSubmit(onSubmit)}>
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
                label="Отправить письмо"
                loading={isLoading}
              />
            </form>
          </FlexBox>
        }
        description="Расскажите нам, что вам не понравилось и что мы можем сделать лучше. Директор накажет виновных, свяжется с вами и предложит решение проблемы."
        maxWidth="600px"
        title="Напишите письмо директору"
      />
    </Section>
  );
}
