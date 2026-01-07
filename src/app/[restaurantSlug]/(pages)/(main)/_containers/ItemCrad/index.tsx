import { FC, useMemo, useState } from 'react';
import { useMedia } from 'lib/hooks/useMedia';
import { PrimaryButton } from 'theme/components/Button';
import { FlexBox } from 'theme/components/FlexBox';
import { Paragraph } from 'theme/components/Typography';

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

  const { isTabletOrMobile } = useMedia();

  // const hasSizes = useMemo(() => item.itemSizes.length > 1, [item.itemSizes]);

  const measure = useMemo(
    () =>
      activeSize.weight
        ? `${activeSize.weight} ${MAP_FROM_TYPE_TO_LABEL[activeSize.measureUnitType]}`
        : '1 шт',
    [activeSize.weight, activeSize.measureUnitType],
  );

  return (
    <Styled.Card>
      <Styled.Image src={activeSize.image} />
      <Styled.Info>
        <div>
          <Styled.Name>{item.name}</Styled.Name>
          <Styled.Description>
            {item.description}{' '}
            {item.description && (
              <>
                <br />
                <br />
              </>
            )}
            {isTabletOrMobile && measure}
          </Styled.Description>
          {!isTabletOrMobile && (
            <FlexBox
              align="center"
              gap="8px"
              justify="space-between"
              marginBottom="12px"
              marginTop="24px"
            >
              <Styled.Price>
                <span>{Number(activeSize.price).toFixed(2)}</span> руб
              </Styled.Price>
              <Paragraph>{measure}</Paragraph>
            </FlexBox>
          )}
        </div>
        {isTabletOrMobile ? (
          <PrimaryButton
            fullWidth
            label={Number(activeSize.price).toFixed(2) + ' руб'}
          />
        ) : (
          <PrimaryButton fullWidth label="В корзину" />
        )}
      </Styled.Info>
    </Styled.Card>
  );
};
