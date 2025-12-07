'use client';

import { Section } from 'app/_layout/Section';
import { SectionInfo } from 'app/_layout/SectionInfo';
import { FlexBox } from 'theme/components/FlexBox';
import { InfoCard } from 'theme/components/InfoCard';
import { MapWithActions } from 'theme/components/MapWithActions';
import { Headline, Paragraph } from 'theme/components/Typography';

import { getDeliveryCards, ITEMS } from './constants';
import * as Styled from './styled';

const mapLink =
  'https://yandex.by/maps/20648/lida/?text=%D0%9B%D0%B8%D0%B4%D0%B0%2C%20%D1%83%D0%BB.%20%D0%9C%D0%B0%D1%88%D0%B5%D1%80%D0%BE%D0%B2%D0%B0%2012';

export default function DostavkaIPlatataPage() {
  return (
    <Section>
      <SectionInfo
        description="Доставка пиццы и роллов по Лиде — быстро и удобно. Бесплатная доставка от 35 рублей, удобные способы оплаты, понятный график работы и собственные курьеры. Забирайте заказ самовывозом или оформляйте доставку домой и в офис."
        label="Доставка и оплата"
        title="Доставка и оплата в Лиде"
      />

      <Styled.InfoGrid>
        {getDeliveryCards().map((card) => (
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
        <MapWithActions mapLink={mapLink} />
      </Styled.MapCard>
    </Section>
  );
}
