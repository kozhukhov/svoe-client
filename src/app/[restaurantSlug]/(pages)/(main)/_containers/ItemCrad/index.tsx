import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useItemBasket } from 'lib/context/basket';
import { PrimaryButton } from 'theme/components/Button';
import { Switcher } from 'theme/components/Switcher';
import { Paragraph } from 'theme/components/Typography';

import { MenuItemDTO, MenuItemLabel, MenuItemSizeDTO } from 'modules/menu/dto';

import { MAP_FROM_TYPE_TO_LABEL } from './constants';
import * as Styled from './styled';

type Props = {
  categoryName: string;
  item: MenuItemDTO;
};

export const ItemCard: FC<Props> = ({ categoryName, item }) => {
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [isImageInView, setIsImageInView] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imageButtonRef = useRef<HTMLButtonElement | null>(null);
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
    if (isImagePreviewOpen && !activeSize.image) setIsImagePreviewOpen(false);
  }, [isImagePreviewOpen, activeSize.image]);

  useEffect(() => {
    setIsImageLoaded(false);
  }, [activeSize.image]);

  useEffect(() => {
    const el = imageButtonRef.current;
    if (!el) return;
    if (isImageInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setIsImageInView(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '200px 0px',
        threshold: 0.01,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isImageInView]);

  useEffect(() => {
    if (!isImagePreviewOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsImagePreviewOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isImagePreviewOpen]);

  useEffect(() => {
    if (!isImagePreviewOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isImagePreviewOpen]);

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
    categoryName,
  });

  const hasSizes = useMemo(() => item.itemSizes.length > 1, [item.itemSizes]);

  const isNew = useMemo(
    () => (item.labels ?? []).includes(MenuItemLabel.NEW),
    [item.labels],
  );

  const isSushiCategory = useMemo(() => {
    const text = (categoryName ?? '').toLowerCase();
    return /(суш|ролл)/.test(text);
  }, [categoryName]);

  const imageAspectRatio = useMemo(
    () => (isSushiCategory ? '1 / 0.7' : '1 / 1'),
    [isSushiCategory],
  );

  const sushiPiecesSuffix = useMemo(
    () => (isSushiCategory ? ' | 8 шт' : ''),
    [isSushiCategory],
  );

  const measure = useMemo(
    () =>
      activeSize.weight
        ? `${Math.round(activeSize.weight)} ${MAP_FROM_TYPE_TO_LABEL[activeSize.measureUnitType]}${sushiPiecesSuffix}`
        : '1 шт',
    [activeSize.weight, activeSize.measureUnitType, sushiPiecesSuffix],
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
    <>
      <Styled.Card>
        {isNew && <Styled.Badge>Новинка</Styled.Badge>}
        <Styled.Wrapper>
          <Styled.ImageButton
            $loading={!isImageLoaded && Boolean(activeSize.image)}
            aria-label="Увеличить изображение"
            ref={imageButtonRef}
            type="button"
            onClick={() => {
              setIsImageInView(true);
              if (!activeSize.image) return;
              setIsImagePreviewOpen(true);
            }}
          >
            <Styled.Image
              $aspectRatio={imageAspectRatio}
              $loaded={isImageLoaded}
              alt={item.name}
              decoding="async"
              loading="lazy"
              src={isImageInView ? activeSize.image : undefined}
              onError={() => setIsImageLoaded(true)}
              onLoad={() => setIsImageLoaded(true)}
            />
          </Styled.ImageButton>
          <Styled.Info $hasDescription={!!item.description}>
            <Styled.Name>{item.name}</Styled.Name>
            <Styled.Description>
              {item.description} {!item.description && bottom}
            </Styled.Description>
          </Styled.Info>
        </Styled.Wrapper>
        {item.description && <Styled.Bottom>{bottom}</Styled.Bottom>}
      </Styled.Card>

      {isImagePreviewOpen && (
        <Styled.LightboxOverlay onClick={() => setIsImagePreviewOpen(false)}>
          <Styled.LightboxContent onClick={(e) => e.stopPropagation()}>
            <Styled.LightboxClose
              aria-label="Закрыть"
              type="button"
              onClick={() => setIsImagePreviewOpen(false)}
            >
              ×
            </Styled.LightboxClose>
            <Styled.LightboxImage alt={item.name} src={activeSize.image} />
          </Styled.LightboxContent>
        </Styled.LightboxOverlay>
      )}
    </>
  );
};
