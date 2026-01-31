/* eslint-disable prettier/prettier */
import { FC, useMemo, useState } from 'react';
import { useBasket } from 'lib/context/basket';
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
  console.log(item.name, item);

  const [activeSize, setActiveSize] = useState<MenuItemSizeDTO>(
    item.itemSizes.find((size) => size.isDefault) ?? item.itemSizes[0],
  );

  const { count, addItem, removeItem } = useBasket({
    productId: item.id,
    price: Number(activeSize.price),
    item,
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

    // if (isTabletOrMobile) {
    //   return (
    //     <PrimaryButton
    //       fullWidth
    //       label={Number(activeSize.price).toFixed(2) + ' руб'}
    //     />
    //   );
    // }

    return <PrimaryButton fullWidth label="В корзину" onClick={addItem} />;
  }, [count, addItem, removeItem]);

  return (
    <Styled.Card>
      <Styled.Image src={activeSize.image} />
      <Styled.Info>
        <div>
          <Styled.Name>{item.name}</Styled.Name>
          <Styled.Description>{item.description}</Styled.Description>
        </div>
        <div>
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
                        label: 'Без',
                        value: 'without',
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
                  setActiveSize(
                    item.itemSizes.find((size) => size.id === value) ??
                    item.itemSizes[0],
                  )
                }
                value={activeSize.id}
              />
            ))}
          <Styled.PriceContainer>
            <Styled.Price>
              <span>{Number(activeSize.price).toFixed(2)}</span> руб
            </Styled.Price>
            <Styled.Measure>{measure}</Styled.Measure>
          </Styled.PriceContainer>
          {actionButton}
        </div>
      </Styled.Info>
    </Styled.Card>
  );
};
