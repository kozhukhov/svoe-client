'use client';

import { FC } from 'react';
import { MdClose } from 'react-icons/md';
import { useBasket } from 'lib/context/basket';
import { formatPrice } from 'lib/utils';
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
        <Styled.BasketHeader>
          <Headline level={5}>Корзина</Headline>
          <Styled.CloseButton aria-label="Закрыть корзину" onClick={onClose}>
            <MdClose size={22} />
          </Styled.CloseButton>
        </Styled.BasketHeader>
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
          <>
            <Styled.BasketItems>
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
            </Styled.BasketItems>
            <Styled.BottomBasket>
              {(() => {
                const minFree = activeRestaurant?.deliveryMinFreeSum ?? 0;
                const paidCost = activeRestaurant?.deliveryPaidCost ?? 0;
                const deliveryCost = finalPrice >= minFree ? 0 : paidCost;
                const totalPrice = finalPrice + deliveryCost;
                const deliveryLabel =
                  deliveryCost === 0
                    ? 'Бесплатно'
                    : `${formatPrice(deliveryCost)} руб`;
                return (
                  <>
                    <Paragraph color="#1D2939" fontWeight={600} level={3}>
                      <FlexBox justify="space-between">
                        <span>Сумма заказа</span>
                        <span>{formatPrice(finalPrice)} руб</span>
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
                        <span>{deliveryLabel}</span>
                      </FlexBox>
                    </Paragraph>
                    <Paragraph
                      color="#1D2939"
                      fontWeight={600}
                      marginBottom="8px"
                    >
                      <FlexBox justify="space-between">
                        <span>Всего к оплате</span>
                        <span>{formatPrice(totalPrice)} руб</span>
                      </FlexBox>
                    </Paragraph>
                  </>
                );
              })()}
              <PrimaryButton
                fullWidth
                label="Перейти к оплате"
                onClick={() => {
                  router.push(`/${activeRestaurant?.slug}/checkout`);
                  onClose();
                }}
              />
            </Styled.BottomBasket>
          </>
        )}
      </Styled.BasketContainer>
    </>
  );
};
