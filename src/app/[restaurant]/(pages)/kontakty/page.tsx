'use client';

import { Section } from 'app/_layout/Section';
import { SectionInfo } from 'app/_layout/SectionInfo';
import { InfoCard } from 'theme/components/InfoCard';
import { MapWithActions } from 'theme/components/MapWithActions';
import { Headline, Paragraph } from 'theme/components/Typography';

import { getContactCards } from './constants';
import * as Styled from './styled';

const mapLink =
  'https://yandex.by/maps/20648/lida/?text=%D0%9B%D0%B8%D0%B4%D0%B0%2C%20%D1%83%D0%BB.%20%D0%9C%D0%B0%D1%88%D0%B5%D1%80%D0%BE%D0%B2%D0%B0%2012';

export default function KontaktyPage() {
  return (
    <Section>
      <SectionInfo
        description="Доставка пиццы и роллов по всему городу, удобный самовывоз, актуальный график работы и телефон для заказов. Быстро принимаем заказы, подсказываем меню и организуем доставку"
        label="Контакты"
        title="Контакты ресторана в Лиде"
      />
      <Styled.InfoGrid>
        {getContactCards().map((card) => (
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
            Мы находимся в центре Лиды и принимаем заказы на доставку пиццы и
            роллов по всему городу. Вы можете оформить доставку домой или в
            офис, либо забрать заказ самостоятельно без ожидания в очереди.
          </Paragraph>
        </div>
        <MapWithActions mapLink={mapLink} />
      </Styled.MapCard>
    </Section>
  );
}
