'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Section } from 'app/_layout/Section';
import { SectionInfo } from 'app/_layout/SectionInfo';
import { useFetch } from 'lib/services/APIService';
import Link from 'next/link';
import { Skeleton } from 'theme/components/Skeleton';
import { Headline, Paragraph } from 'theme/components/Typography';

import { MenuDTO } from 'modules/menu/dto';
import { getCategory, getMenu } from 'modules/menu/service';
import { SeoDataDTO } from 'modules/seo/dto';

import { ItemCard } from '../../(main)/_containers/ItemCrad';
import * as MainStyled from '../../(main)/styled';

type MenuResponse = { categories: MenuDTO[] };

type Props = {
  restaurantId: string;
  restaurantSlug: string;
  categorySlug: string;
  seoData: SeoDataDTO;
};

export const CategoryPageClient = ({
  restaurantId,
  restaurantSlug,
  categorySlug,
  seoData,
}: Props) => {
  const stickyCategoriesWrapperRef = useRef<HTMLDivElement | null>(null);
  const [isFixedCategoriesVisible, setIsFixedCategoriesVisible] =
    useState(false);

  const { data: menu, isLoading: isMenuLoading } = useFetch<MenuResponse>(
    getMenu.getUrl({ restaurantID: restaurantId }),
    getMenu.request,
  );

  const categories = useMemo(
    () =>
      (menu?.categories ?? []).filter(
        (c) => c.items.length > 0 && c.labels?.[0],
      ),
    [menu?.categories],
  );

  useEffect(() => {
    if (categories.length === 0) return;
    const wrapper = stickyCategoriesWrapperRef.current;
    if (!wrapper) return;

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const bottom = wrapper.getBoundingClientRect().bottom;
      setIsFixedCategoriesVisible(bottom <= 64);
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [categories.length]);

  const renderCategoryPills = () => (
    <MainStyled.Categories>
      {isMenuLoading ? (
        <>
          <MainStyled.CategoryCardSekeleton />
          <MainStyled.CategoryCardSekeleton />
          <MainStyled.CategoryCardSekeleton />
          <MainStyled.CategoryCardSekeleton />
          <MainStyled.CategoryCardSekeleton />
        </>
      ) : (
        <>
          <MainStyled.CategoryCard
            $active={false}
            as={Link}
            href={`/${restaurantSlug}`}
          >
            <Paragraph noWrap color="#475467" fontWeight={700} level={3}>
              Все меню
            </Paragraph>
          </MainStyled.CategoryCard>
          {categories.map((category) => {
            const slug = category.labels[0];
            return (
              <MainStyled.CategoryCard
                $active={slug === categorySlug}
                as={Link}
                href={`/${restaurantSlug}/${slug}`}
                key={category.id}
              >
                <Paragraph
                  noWrap
                  color={slug === categorySlug ? '#3f8f4a' : '#475467'}
                  fontWeight={700}
                  level={3}
                >
                  {category.name}
                </Paragraph>
              </MainStyled.CategoryCard>
            );
          })}
        </>
      )}
    </MainStyled.Categories>
  );

  const { data: categoryData, isLoading: isCategoryLoading } = useFetch(
    getCategory.getUrl({ restaurantID: restaurantId, categorySlug }),
    getCategory.request,
  );

  return (
    <>
      <Section withoutMarginBottom>
        <Headline level={5} marginBottom="8px">
          Категории
        </Headline>
        <MainStyled.StickyCategories
          ref={(el) => {
            stickyCategoriesWrapperRef.current = el;
          }}
        >
          {renderCategoryPills()}
        </MainStyled.StickyCategories>
      </Section>

      {categories.length > 0 && (
        <MainStyled.FixedCategories $visible={isFixedCategoriesVisible}>
          <Section withoutMarginBottom>{renderCategoryPills()}</Section>
        </MainStyled.FixedCategories>
      )}

      <MainStyled.ProductsTopSpacer />

      <Section>
        <SectionInfo
          description={seoData.description ?? ''}
          title={seoData.title ?? ''}
        />
        {isCategoryLoading ? (
          <MainStyled.Items>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton height="200px" key={i} width="100%" />
            ))}
          </MainStyled.Items>
        ) : categoryData ? (
          <MainStyled.Items>
            {categoryData.items.map((item) => (
              <ItemCard
                categoryName={categoryData.label}
                item={item}
                key={item.id}
              />
            ))}
          </MainStyled.Items>
        ) : null}
      </Section>
    </>
  );
};
