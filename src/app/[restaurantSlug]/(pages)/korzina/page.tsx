'use client';

import { MdOutlineShoppingBasket } from 'react-icons/md';
import { Section } from 'app/_layout/Section';
import { FlexBox } from 'theme/components/FlexBox';
import { Headline, Paragraph } from 'theme/components/Typography';

export default function KorzinaPage() {
  return (
    <Section>
      <FlexBox align="center" direction="column">
        <MdOutlineShoppingBasket color="#f9c646" size={100} />
        <Headline level={5} marginTop="16px" textAlign="center">
          Ваша корзина пуста
        </Headline>
        <Paragraph textAlign="center">
          Вы не добавили ни одного товара в корзину
        </Paragraph>
      </FlexBox>
    </Section>
  );
}
