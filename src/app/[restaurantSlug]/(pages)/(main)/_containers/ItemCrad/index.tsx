import { FC, useMemo, useState } from 'react';
import { PrimaryButton } from 'theme/components/Button';
import { FlexBox } from 'theme/components/FlexBox';
import { Headline } from 'theme/components/Typography';

import { MenuItemDTO, MenuItemSizeDTO } from 'modules/menu/dto';

import { MAP_FROM_TYPE_TO_LABEL } from './constants';
import * as Styled from './styled';

type Props = {
  item: MenuItemDTO;
};

export const ItemCard: FC<Props> = ({ item }) => {
  const [activeSize] = useState<MenuItemSizeDTO>(
    item.itemSizes.find((size) => size.isDefault) ?? item.itemSizes[0],
  );

  // const hasSizes = useMemo(() => item.itemSizes.length > 1, [item.itemSizes]);

  const measure = useMemo(
    () =>
      activeSize.weight
        ? `${activeSize.weight} ${MAP_FROM_TYPE_TO_LABEL[activeSize.measureUnitType]}`
        : null,
    [activeSize.weight, activeSize.measureUnitType],
  );

  return (
    <Styled.Card>
      <Styled.Image src={activeSize.image} />
      <Styled.Info>
        <Headline fontWeight={600} level={5} marginBottom="4px">
          {item.name}
        </Headline>
        <Styled.Description>
          {item.description} {measure}
        </Styled.Description>
        <FlexBox
          align="center"
          gap="8px"
          justify="space-between"
          marginTop="24px"
        >
          <Styled.Price>{Number(activeSize.price).toFixed(2)} BYN</Styled.Price>
          <PrimaryButton label="В корзину" />
        </FlexBox>
      </Styled.Info>
    </Styled.Card>
  );
};
