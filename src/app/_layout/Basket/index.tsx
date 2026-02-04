'use client';

import { FC } from 'react';
import { MdClose } from 'react-icons/md';
import { useBasket } from 'lib/context/basket';
import { useRouter } from 'next/navigation';
import { PrimaryButton } from 'theme/components/Button';
import { FlexBox } from 'theme/components/FlexBox';
import { Headline, Paragraph } from 'theme/components/Typography';

import { useActiveRestaurant } from 'modules/restaurant/hooks';

import { BasketItem } from './BasketItem';
import * as Styled from './styled';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const Basket: FC<Props> = ({ isOpen, onClose }) => {
  const { count, items, finalPrice } = useBasket();
  const router = useRouter();
  const { activeRestaurant } = useActiveRestaurant();

  return (
    <>
      {isOpen && <Styled.BasketOverlay onClick={onClose} />}
      <Styled.BasketContainer $isOpen={isOpen}>
        <Styled.CloseButton aria-label="Закрыть корзину" onClick={onClose}>
          <MdClose size={22} />
        </Styled.CloseButton>
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
              <BasketItem
                item={item}
                key={
                  item.productId +
                  item.productSizeId +
                  JSON.stringify(item.modifiers)
                }
              />
            ))}
            <Styled.BottomBasket>
              <Paragraph color="#1D2939" fontWeight={600} level={3}>
                <FlexBox justify="space-between">
                  <span>Сумма заказа</span>
                  <span>{finalPrice.toFixed(2)} руб</span>
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
                  <span>Бесплатно</span>
                </FlexBox>
              </Paragraph>
              <Paragraph color="#1D2939" fontWeight={600} marginBottom="8px">
                <FlexBox justify="space-between">
                  <span>Всего к оплате</span>
                  <span>{finalPrice.toFixed(2)} руб</span>
                </FlexBox>
              </Paragraph>
              <PrimaryButton
                fullWidth
                label="Перейти к оплате"
                onClick={() => {
                  router.push(`/${activeRestaurant?.slug}/checkout`);
                  onClose();
                }}
              />
            </Styled.BottomBasket>
          </div>
        )}
      </Styled.BasketContainer>
    </>
  );
};
