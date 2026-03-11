'use client';

import { Section } from 'app/_layout/Section';
import { Headline } from 'theme/components/Typography';

import { MenuItemDTO } from 'modules/menu/dto';

import { ItemCard } from '../../(main)/_containers/ItemCrad';
import * as MainStyled from '../../(main)/styled';

type Props = {
  label: string;
  items: MenuItemDTO[];
};

export const CategoryPageClient = ({ label, items }: Props) => {
  return (
    <Section>
      <Headline level={4} marginBottom="16px">
        {label}
      </Headline>
      <MainStyled.Items>
        {items.map((item) => (
          <ItemCard categoryName={label} item={item} key={item.id} />
        ))}
      </MainStyled.Items>
    </Section>
  );
};
