'use client';

import { Section } from 'app/_layout/Section';
import { Headline, Paragraph } from 'theme/components/Typography';

import * as Styled from './styled';
// import { useFetch } from 'lib/services/APIService';

// import { getMenu } from 'modules/menu/service';

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
  // const s = useFetch(getMenu.getUrl({ restaurantID: '1' }), getMenu.request);

  return (
    <div>
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
    </div>
  );
}
