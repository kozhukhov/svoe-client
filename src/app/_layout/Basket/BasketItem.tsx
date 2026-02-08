import { FC } from 'react';
import { MAP_FROM_TYPE_TO_LABEL } from 'app/[restaurantSlug]/(pages)/(main)/_containers/ItemCrad/constants';
import {
  BasketItem as BasketItemType,
  useItemBasket,
} from 'lib/context/basket';
import { PrimaryButton, Size } from 'theme/components/Button';
import { FlexBox } from 'theme/components/FlexBox';
import { Paragraph } from 'theme/components/Typography';

import * as Styled from './styled';

type Props = {
  item: BasketItemType;
  compact?: boolean;
};

export const BasketItem: FC<Props> = ({ item, compact = false }) => {
  const activeSize = item.item.itemSizes.find(
    (size) => size.id === item.productSizeId,
  );

  const isSushiCategory = /(суш|ролл)/i.test(item.categoryName ?? '');

  const measure = activeSize?.weight
    ? `${Math.round(activeSize?.weight)} ${MAP_FROM_TYPE_TO_LABEL[activeSize?.measureUnitType]}${isSushiCategory ? ' | 8 шт' : ''}`
    : '1 шт';

  const { count, finalPrice, addItem, removeItem } = useItemBasket({
    productId: item.productId,
    productSizeId: item.productSizeId,
    modifiers: item.modifiers,
    item: item.item,
    price: item.price,
  });

  return (
    <Styled.BasketItem $compact={compact} key={item.productId}>
      <Styled.BasketImage src={activeSize?.image} />
      <Styled.BasketItemContent>
        {compact ? (
          <FlexBox gap="10px" justify="space-between">
            <div style={{ minWidth: 0 }}>
              <Paragraph color="#1D2939" fontWeight={600} level={3}>
                {item.item.name}
              </Paragraph>
              <Styled.BasketItemDescription>
                {measure}
                {activeSize?.name && `, ${activeSize?.name} `}
                {item.modifiers
                  .map((modifier) =>
                    activeSize?.itemModifierGroups
                      .find((group) => group.id === modifier.groupId)
                      ?.items.find((item) => item.id === modifier.modifierId)
                      ?.name.toLowerCase(),
                  )
                  .join(', ')}
              </Styled.BasketItemDescription>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 6,
              }}
            >
              <Styled.ActionButton $compact>
                <PrimaryButton
                  label="–"
                  size={Size.SMALL}
                  onClick={removeItem}
                />
                <Paragraph color="#3f8f4a" fontWeight={600} level={3}>
                  {count}
                </Paragraph>
                <PrimaryButton label="+" size={Size.SMALL} onClick={addItem} />
              </Styled.ActionButton>
              <Paragraph
                color="#1D2939"
                fontWeight={700}
                level={2}
                textAlign="right"
              >
                {(finalPrice * count).toFixed(2)} руб
              </Paragraph>
            </div>
          </FlexBox>
        ) : (
          <>
            <Paragraph color="#1D2939" fontWeight={600} level={2}>
              {item.item.name}
            </Paragraph>
            <Styled.BasketItemDescription>
              {measure}
              {activeSize?.name && `, ${activeSize?.name} `}
              {item.modifiers
                .map((modifier) =>
                  activeSize?.itemModifierGroups
                    .find((group) => group.id === modifier.groupId)
                    ?.items.find((item) => item.id === modifier.modifierId)
                    ?.name.toLowerCase(),
                )
                .join(', ')}
            </Styled.BasketItemDescription>
            <FlexBox align="center" justify="space-between" marginTop="12px">
              <Styled.ActionButton>
                <PrimaryButton label="–" onClick={removeItem} />
                <Paragraph color="#3f8f4a" fontWeight={600} level={2}>
                  {count}
                </Paragraph>
                <PrimaryButton label="+" onClick={addItem} />
              </Styled.ActionButton>
              <Paragraph color="#1D2939" fontWeight={600} level={2}>
                {(finalPrice * count).toFixed(2)} руб
              </Paragraph>
            </FlexBox>
          </>
        )}
      </Styled.BasketItemContent>
    </Styled.BasketItem>
  );
};
