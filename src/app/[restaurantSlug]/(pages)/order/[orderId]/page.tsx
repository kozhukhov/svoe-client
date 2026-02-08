'use client';

import { Section } from 'app/_layout/Section';
import { SectionInfo } from 'app/_layout/SectionInfo';
import { useRouter } from 'next/navigation';
import { PrimaryButton } from 'theme/components/Button';

import { useActiveRestaurant } from 'modules/restaurant/hooks';

export default function OrderSuccessPage() {
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
        description="Спасибо за ваш заказ! Менеджер свяжется с вами, чтобы уточнить детали заказа."
        title="Заказ оформлен"
      />
    </Section>
  );
}

