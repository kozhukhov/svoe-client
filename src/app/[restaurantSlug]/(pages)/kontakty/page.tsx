'use client';

import { Section } from 'app/_layout/Section';
import { SectionInfo } from 'app/_layout/SectionInfo';
import { InfoCard } from 'theme/components/InfoCard';
import { MapWithActions } from 'theme/components/MapWithActions';
import { Headline, Paragraph } from 'theme/components/Typography';

import { useActiveRestaurant } from 'modules/restaurant/hooks';

import { getContactCards } from './constants';
import * as Styled from './styled';

export default function KontaktyPage() {
  const { activeRestaurant } = useActiveRestaurant();

  return (
    <Section>
      <SectionInfo
        description="Доставка пиццы и роллов по всему городу, удобный самовывоз, актуальный график работы и телефон для заказов. Быстро принимаем заказы, подсказываем меню и организуем доставку"
        label="Контакты"
        title={`Контакты ресторана в городе ${activeRestaurant?.city}`}
      />
      <Styled.InfoGrid>
        {getContactCards(activeRestaurant!).map((card) => (
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
            Мы находимся в центре города {activeRestaurant?.city} и принимаем
            заказы на доставку пиццы и роллов по всему городу. Вы можете
            оформить доставку домой или в офис, либо забрать заказ
            самостоятельно без ожидания в очереди.
          </Paragraph>
        </div>
        <MapWithActions mapLink={activeRestaurant?.mapUrl || ''} />
      </Styled.MapCard>
    </Section>
  );
}
