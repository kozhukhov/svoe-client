'use client';

import { Section } from 'app/_layout/Section';
import { SectionInfo } from 'app/_layout/SectionInfo';
import { InfoCard } from 'theme/components/InfoCard';
import { MapWithActions } from 'theme/components/MapWithActions';
import { Headline, Paragraph } from 'theme/components/Typography';

import { RestaurantDTO } from 'modules/restaurant/dto';
import { SeoDataDTO } from 'modules/seo/dto';

import { getContactCards } from '../constants';
import * as Styled from '../styled';

type Props = {
  restaurant: RestaurantDTO;
  seoData: SeoDataDTO;
};

export const KontaktyPageClient = ({ restaurant, seoData }: Props) => {
  return (
    <Section>
      <SectionInfo
        description={seoData.description ?? ''}
        label="Контакты"
        title={seoData.title ?? ''}
      />
      <Styled.InfoGrid>
        {getContactCards(restaurant).map((card) => (
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
            Где мы находимся
          </Headline>
          <Paragraph level={2} marginBottom="12px">
            Мы находимся в центре города {restaurant.city} и принимаем заказы на
            доставку пиццы и роллов по всему городу. Вы можете оформить доставку
            домой или в офис, либо забрать заказ самостоятельно без ожидания в
            очереди.
          </Paragraph>
        </div>
        <MapWithActions mapLink={restaurant.mapUrl || ''} />
      </Styled.MapCard>
    </Section>
  );
};
