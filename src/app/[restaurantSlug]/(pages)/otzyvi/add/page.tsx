'use client';

import { Section } from 'app/_layout/Section';
import { SectionInfo } from 'app/_layout/SectionInfo';
import { useRouter } from 'next/navigation';
import { PrimaryButton, SecondaryButton } from 'theme/components/Button';
import { FlexBox } from 'theme/components/FlexBox';

import { useActiveRestaurant } from 'modules/restaurant/hooks';

export default function AddOtzyviPage() {
  const router = useRouter();

  const { activeRestaurant } = useActiveRestaurant();

  return (
    <Section>
      <SectionInfo
        center
        content={
          <FlexBox gap="12px">
            <SecondaryButton
              label="Есть замечания"
              onClick={() =>
                router.push(
                  `/${activeRestaurant?.slug}/otzyvi/add/pismo-directoru`,
                )
              }
            />
            <PrimaryButton
              label="Все понравилось"
              onClick={() =>
                router.push(`/${activeRestaurant?.slug}/otzyvi/add/novy-otzyv`)
              }
            />
          </FlexBox>
        }
        description="Нам важно ваше мнение. Будем благодарны, если вы поделитесь впечатлениями о вашем визите"
        maxWidth="600px"
        title="Вам понравилось обслуживание в нашем кафе?"
      />
    </Section>
  );
}
