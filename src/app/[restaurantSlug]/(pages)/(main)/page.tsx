'use client';

import { Section } from 'app/_layout/Section';
import { useFetch } from 'lib/services/APIService';
import { Headline, Paragraph } from 'theme/components/Typography';

import { getMenu } from 'modules/menu/service';

import { ItemCard } from './_containers/ItemCrad';
// import { PromoBanners } from './_containers/PromoBanners';
import * as Styled from './styled';

const CATEGORIES = [
  {
    title: 'Пицца',
    url: '/pizza',
  },
  {
    title: 'Роллы',
    url: '/rolls',
  },
  {
    title: 'Пицца',
    url: '/pizza',
  },
  {
    title: 'Роллы',
    url: '/rolls',
  },
  {
    title: 'Пицца',
    url: '/pizza',
  },
  {
    title: 'Роллы',
    url: '/rolls',
  },
];

export default function MainPage() {
  const { data: menu } = useFetch(
    getMenu.getUrl({ restaurantID: '1' }),
    getMenu.request,
  );

  return (
    <div>
      {/* <PromoBanners /> */}
      <div>Истории</div>
      <div>Новинки</div>
      <Section>
        <Headline level={5} marginBottom="16px">
          Категории
        </Headline>
        <Styled.Categories>
          {CATEGORIES.map((category) => (
            <Styled.CategoryCard key={category.title}>
              <Paragraph fontWeight={500} level={3} textAlign="center">
                {category.title}
              </Paragraph>
            </Styled.CategoryCard>
          ))}
        </Styled.Categories>
      </Section>
      {menu?.categories.map((category) => (
        <Section key={category.id}>
          <Headline level={4} marginBottom="16px">
            {category.name}
          </Headline>
          <Styled.Items>
            {category.items.map((item) => (
              <ItemCard item={item} key={item.id} />
            ))}
          </Styled.Items>
        </Section>
      ))}
    </div>
  );
}
