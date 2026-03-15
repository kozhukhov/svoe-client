'use client';

import { Section } from 'app/_layout/Section';
import { SectionInfo } from 'app/_layout/SectionInfo';
import { FlexBox } from 'theme/components/FlexBox';
import { InfoCard } from 'theme/components/InfoCard';
import { MapWithActions } from 'theme/components/MapWithActions';
import { Headline, Paragraph } from 'theme/components/Typography';

import { RestaurantDTO } from 'modules/restaurant/dto';
import { SeoDataDTO } from 'modules/seo/dto';

import { getDeliveryCards, ITEMS } from '../constants';
import * as Styled from '../styled';

type Props = {
  restaurant: RestaurantDTO;
  seoData: SeoDataDTO;
};

export const DostavkaPageClient = ({ restaurant, seoData }: Props) => {
  return (
    <Section>
      <SectionInfo
        description={seoData.description ?? ''}
        label="Доставка и оплата"
        title={seoData.title ?? ''}
      />

      <Styled.InfoGrid>
        {getDeliveryCards(restaurant).map((card) => (
          <InfoCard
            icon={card.icon}
            key={card.name}
            name={card.name}
            note={card.note}
            value={card.value}
          />
        ))}
      </Styled.InfoGrid>

      <Styled.MapCard>
        <div>
          <Headline level={5} marginBottom="8px">
            Зона доставки
          </Headline>
          <Paragraph level={2} marginBottom="12px">
            В настоящий момент мы доставляем заказы только в пределах
            обозначенной зоны доставки. Если ваш адрес находится за её пределами
            - свяжитесь с администратором, и мы уточним возможность доставки в
            индивидуальном порядке.
          </Paragraph>
          <FlexBox direction="column" gap="4px">
            {ITEMS.map((item, index) => (
              <Paragraph key={index} level={2} marginBottom="4px">
                {index + 1}. {item}
              </Paragraph>
            ))}
          </FlexBox>
        </div>
        <MapWithActions mapLink={restaurant.deliveryZoneMapUrl || ''} />
      </Styled.MapCard>
    </Section>
  );
};
