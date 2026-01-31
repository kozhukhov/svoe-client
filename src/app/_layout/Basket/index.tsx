'use client';

import { FC } from 'react';
import { useBasket } from 'lib/context/basket';
import { PrimaryButton } from 'theme/components/Button';
import { FlexBox } from 'theme/components/FlexBox';
import { Headline, Paragraph } from 'theme/components/Typography';

import * as Styled from './styled';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const Basket: FC<Props> = ({ isOpen, onClose }) => {
  const { count, items } = useBasket();

  return (
    <>
      {isOpen && <Styled.BasketOverlay onClick={onClose} />}
      <Styled.BasketContainer $isOpen={isOpen}>
        {count === 0 ? (
          <Styled.BasketEmpty>
            <Headline level={5} marginBottom="4px" textAlign="center">
              Корзина пуста
            </Headline>
            <Paragraph level={2} marginBottom="16px" textAlign="center">
              Добавьте товары, чтобы оформить заказ
            </Paragraph>
            <PrimaryButton label="Меню" onClick={onClose} />
          </Styled.BasketEmpty>
        ) : (
          <div>
            <Headline level={5} marginBottom="16px">
              Корзина
            </Headline>
            {items.map((item) => (
              <Styled.BasketItem key={item.productId}>
                <Paragraph color="#1D2939" fontWeight={600} level={3}>
                  <FlexBox justify="space-between">
                    <span>{item.item.name}</span>
                  </FlexBox>
                </Paragraph>
              </Styled.BasketItem>
            ))}
            <Paragraph color="#1D2939" fontWeight={600} level={3}>
              <FlexBox justify="space-between">
                <span>Итого</span>
                <span>0 руб</span>
              </FlexBox>
            </Paragraph>
            <Paragraph
              color="#1D2939"
              fontWeight={600}
              level={3}
              marginBottom="8px"
            >
              <FlexBox justify="space-between">
                <span>Доставка</span>
                <span>0 руб</span>
              </FlexBox>
            </Paragraph>
            <Paragraph color="#1D2939" fontWeight={600} marginBottom="8px">
              <FlexBox justify="space-between">
                <span>Всего к оплате</span>
                <span>0 руб</span>
              </FlexBox>
            </Paragraph>
            <PrimaryButton
              fullWidth
              label="Перейти к оплате"
              onClick={onClose}
            />
          </div>
        )}
      </Styled.BasketContainer>
    </>
  );
};
