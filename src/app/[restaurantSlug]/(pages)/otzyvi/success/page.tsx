'use client';

import { Section } from 'app/_layout/Section';
import { SectionInfo } from 'app/_layout/SectionInfo';
import { useRouter } from 'next/navigation';
import { PrimaryButton } from 'theme/components/Button';

import { useActiveRestaurant } from 'modules/restaurant/hooks';

export default function SuccessPage() {
  const router = useRouter();

  const { activeRestaurant } = useActiveRestaurant();

  return (
    <Section>
      <SectionInfo
        center
        content={
          <PrimaryButton
            label="Вернуться в меню"
            onClick={() => router.push(`/${activeRestaurant?.slug}`)}
          />
        }
        description="Мы обязательно рассмотрим ваше обращение и постараемся стать лучше"
        title="Спасибо за вашу обратную связь!"
      />
    </Section>
  );
}
