import { FC, useEffect, useMemo, useState } from 'react';
import { useItemBasket } from 'lib/context/basket';
import { PrimaryButton } from 'theme/components/Button';
import { Switcher } from 'theme/components/Switcher';
import { Paragraph } from 'theme/components/Typography';

import { MenuItemDTO, MenuItemSizeDTO } from 'modules/menu/dto';

import { MAP_FROM_TYPE_TO_LABEL } from './constants';
import * as Styled from './styled';

type Props = {
  item: MenuItemDTO;
};

export const ItemCard: FC<Props> = ({ item }) => {
  const [activeSize, setActiveSize] = useState<MenuItemSizeDTO>(
    item.itemSizes.find((size) => size.isDefault) ?? item.itemSizes[0],
  );
  const [activeModifiers, setActiveModifiers] = useState<
    {
      groupId: string;
      modifierId: string;
      price: number;
    }[]
  >(
    activeSize.itemModifierGroups.map((group) => ({
      groupId: group.id,
      modifierId:
        group.items.length === 1 ? 'without-modifier' : group.items[0].id,
      price: group.items.length === 1 ? 0 : group.items[0].price,
    })),
  );

  useEffect(() => {
    setActiveModifiers(
      activeSize.itemModifierGroups.map((group) => ({
        groupId: group.id,
        modifierId:
          group.items.length === 1 ? 'without-modifier' : group.items[0].id,
        price: group.items.length === 1 ? 0 : group.items[0].price,
      })),
    );
  }, [activeSize]);

  const { count, finalPrice, addItem, removeItem } = useItemBasket({
    productId: item.id,
    productSizeId: activeSize.id,
    modifiers: activeModifiers,
    item,
    price: activeSize.price,
  });

  const hasSizes = useMemo(() => item.itemSizes.length > 1, [item.itemSizes]);

  const measure = useMemo(
    () =>
      activeSize.weight
        ? `${activeSize.weight} ${MAP_FROM_TYPE_TO_LABEL[activeSize.measureUnitType]}`
        : '1 шт',
    [activeSize.weight, activeSize.measureUnitType],
  );

  const actionButton = useMemo(() => {
    if (count > 0) {
      return (
        <Styled.ActionButton>
          <PrimaryButton label="–" onClick={removeItem} />
          <Paragraph color="#3f8f4a" fontWeight={600}>
            {count}
          </Paragraph>
          <PrimaryButton label="+" onClick={addItem} />
        </Styled.ActionButton>
      );
    }

    return <PrimaryButton fullWidth label="В корзину" onClick={addItem} />;
  }, [count, addItem, removeItem]);

  const bottom = useMemo(
    () => (
      <>
        {hasSizes && (
          <Switcher
            options={item.itemSizes.map((size) => ({
              label: size.name,
              value: size.id,
            }))}
            setValue={(value: string) =>
              setActiveSize(
                item.itemSizes.find((size) => size.id === value) ??
                item.itemSizes[0],
              )
            }
            value={activeSize.id}
          />
        )}
        {activeSize.itemModifierGroups &&
          activeSize.itemModifierGroups.map((group) => (
            <Switcher
              key={group.id}
              options={
                group.items.length === 1
                  ? [
                    {
                      label: 'Классика',
                      value: 'without-modifier',
                    },
                    {
                      label: group.items[0].name,
                      value: group.items[0].id,
                    },
                  ]
                  : group.items.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
              }
              setValue={(value: string) =>
                setActiveModifiers((currentModifiers) =>
                  currentModifiers.map((modifier) =>
                    modifier.groupId === group.id
                      ? {
                        ...modifier,
                        modifierId: value,
                        price:
                          group.items.find((item) => item.id === value)
                            ?.price ?? 0,
                      }
                      : modifier,
                  ),
                )
              }
              value={
                activeModifiers.find(
                  (modifier) => modifier.groupId === group.id,
                )?.modifierId ?? ''
              }
            />
          ))}
        <Styled.PriceContainer>
          <Styled.Price>
            <span>{Number(finalPrice).toFixed(2)}</span> руб
          </Styled.Price>
          <Styled.Measure>{measure}</Styled.Measure>
        </Styled.PriceContainer>
        {actionButton}
      </>
    ),
    [
      hasSizes,
      item.itemSizes,
      activeSize.id,
      activeSize.itemModifierGroups,
      finalPrice,
      measure,
      actionButton,
      activeModifiers,
    ],
  );

  return (
    <Styled.Card>
      <Styled.Wrapper>
        <Styled.Image src={activeSize.image} />
        <Styled.Info $hasDescription={!!item.description}>
          <Styled.Name>{item.name}</Styled.Name>
          <Styled.Description>
            {item.description} {!item.description && bottom}
          </Styled.Description>
        </Styled.Info>
      </Styled.Wrapper>
      {item.description && <Styled.Bottom>{bottom}</Styled.Bottom>}
    </Styled.Card>
  );
};
