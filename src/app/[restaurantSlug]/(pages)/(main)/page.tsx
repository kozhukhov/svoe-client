'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Section } from 'app/_layout/Section';
import { useFetch } from 'lib/services/APIService';
import { Skeleton } from 'theme/components/Skeleton';
import { Headline, Paragraph } from 'theme/components/Typography';

import { MenuDTO } from 'modules/menu/dto';
import { getMenu } from 'modules/menu/service';
import { useActiveRestaurant } from 'modules/restaurant/hooks';

import { ItemCard } from './_containers/ItemCrad';
// import { PromoBanners } from './_containers/PromoBanners';
import * as Styled from './styled';

type MenuResponse = {
  categories: MenuDTO[];
};

export default function MainPage() {
  const { activeRestaurant } = useActiveRestaurant();
  const [activeCategoryId, setActiveCategoryId] = useState<string>('');
  const [isFixedCategoriesVisible, setIsFixedCategoriesVisible] =
    useState(false);

  const menuKey = activeRestaurant?.id
    ? getMenu.getUrl({ restaurantID: activeRestaurant.id })
    : null;

  const { data: menu, isLoading: isMenuLoading } = useFetch<MenuResponse>(
    menuKey,
    getMenu.request,
  );

  const categories = useMemo(
    () => (menu?.categories ?? []).filter((c) => c.items.length > 0),
    [menu?.categories],
  );

  const sectionsRef = useRef<Record<string, HTMLDivElement | null>>({});
  const pillsInlineRef = useRef<Record<string, HTMLButtonElement | null>>({});
  const pillsFixedRef = useRef<Record<string, HTMLButtonElement | null>>({});
  const inlineCategoriesRef = useRef<HTMLDivElement | null>(null);
  const fixedCategoriesRef = useRef<HTMLDivElement | null>(null);
  const stickyCategoriesWrapperRef = useRef<HTMLDivElement | null>(null);
  const sectionStateRef = useRef<
    Record<string, { isIntersecting: boolean; top: number }>
  >({});

  useEffect(() => {
    if (!activeCategoryId) return;
    const el = isFixedCategoriesVisible
      ? pillsFixedRef.current[activeCategoryId]
      : pillsInlineRef.current[activeCategoryId];
    const container = isFixedCategoriesVisible
      ? fixedCategoriesRef.current
      : inlineCategoriesRef.current;
    if (!el || !container) return;

    const left =
      el.offsetLeft -
      (container.clientWidth - el.getBoundingClientRect().width) / 2;

    container.scrollTo({
      behavior: 'smooth',
      left: Math.max(0, left),
    });
  }, [activeCategoryId, isFixedCategoriesVisible]);

  useEffect(() => {
    if (categories.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const TARGET_TOP = isFixedCategoriesVisible ? 126 : 96;

        for (const entry of entries) {
          const id = entry.target.getAttribute('data-category-id');
          if (!id) continue;
          sectionStateRef.current[id] = {
            isIntersecting: entry.isIntersecting,
            top: entry.boundingClientRect.top,
          };
        }

        const states = Object.entries(sectionStateRef.current)
          .filter(([, s]) => s.isIntersecting)
          .map(([id, s]) => ({ id, top: s.top }));

        if (states.length === 0) return;

        const passed = states
          .filter((s) => s.top <= TARGET_TOP + 8)
          .sort((a, b) => b.top - a.top);

        const nextId = (passed[0] ?? states.sort((a, b) => a.top - b.top)[0])
          ?.id;
        if (!nextId) return;
        setActiveCategoryId((prev) => (prev === nextId ? prev : nextId));
      },
      {
        root: null,
        rootMargin: '-120px 0px -70% 0px',
        threshold: [0.01],
      },
    );

    categories.forEach((c) => {
      const el = sectionsRef.current[c.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories, isFixedCategoriesVisible]);

  useEffect(() => {
    if (activeCategoryId) return;
    if (categories.length === 0) return;
    setActiveCategoryId(categories[0].id);
  }, [activeCategoryId, categories]);

  useEffect(() => {
    if (categories.length === 0) return;
    const wrapper = stickyCategoriesWrapperRef.current;
    if (!wrapper) return;

    let rafId = 0;

    const update = () => {
      rafId = 0;
      // show fixed categories once we scrolled past inline categories block
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

  const renderCategoryPills = (variant: 'inline' | 'fixed') => (
    <Styled.Categories
      ref={(el) => {
        if (variant === 'inline') inlineCategoriesRef.current = el;
        if (variant === 'fixed') fixedCategoriesRef.current = el;
      }}
    >
      {isMenuLoading ? (
        <>
          <Styled.CategoryCardSekeleton />
          <Styled.CategoryCardSekeleton />
          <Styled.CategoryCardSekeleton />
          <Styled.CategoryCardSekeleton />
          <Styled.CategoryCardSekeleton />
        </>
      ) : (
        categories.map((category) => (
          <Styled.CategoryCard
            $active={category.id === activeCategoryId}
            key={category.id}
            ref={(el) => {
              if (variant === 'inline')
                pillsInlineRef.current[category.id] = el;
              if (variant === 'fixed') pillsFixedRef.current[category.id] = el;
            }}
            type="button"
            onClick={() => {
              setActiveCategoryId(category.id);
              sectionsRef.current[category.id]?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }}
          >
            <Paragraph
              noWrap
              color={category.id === activeCategoryId ? '#3f8f4a' : '#475467'}
              fontWeight={700}
              level={3}
            >
              {category.name}
            </Paragraph>
          </Styled.CategoryCard>
        ))
      )}
    </Styled.Categories>
  );

  return (
    <div>
      <Section withoutMarginBottom>
        <Headline level={5} marginBottom="8px">
          Категории
        </Headline>
        <Styled.StickyCategories
          ref={(el) => {
            stickyCategoriesWrapperRef.current = el;
          }}
        >
          {renderCategoryPills('inline')}
        </Styled.StickyCategories>
      </Section>

      {categories.length > 0 && (
        <Styled.FixedCategories $visible={isFixedCategoriesVisible}>
          <Section withoutMarginBottom>{renderCategoryPills('fixed')}</Section>
        </Styled.FixedCategories>
      )}

      <Styled.ProductsTopSpacer />

      {isMenuLoading ? (
        <>
          {[1, 2, 3, 4, 5].map((item) => (
            <Section key={item}>
              <Skeleton height="36px" marginBottom="16px" width="100px" />
              <Styled.Items>
                <Skeleton height="200px" width="100%" />
                <Skeleton height="200px" width="100%" />
                <Skeleton height="200px" width="100%" />
                <Skeleton height="200px" width="100%" />
              </Styled.Items>
            </Section>
          ))}
        </>
      ) : (
        categories.map((category) => (
          <Section key={category.id}>
            <Styled.CategorySection
              data-category-id={category.id}
              ref={(el) => {
                sectionsRef.current[category.id] = el;
              }}
            >
              <Headline level={4} marginBottom="16px">
                {category.name}
              </Headline>
              <Styled.Items>
                {category.items.map((item) => (
                  <ItemCard item={item} key={item.id} />
                ))}
              </Styled.Items>
            </Styled.CategorySection>
          </Section>
        ))
      )}
    </div>
  );
}
