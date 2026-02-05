'use client';

import { useEffect, useMemo, useState } from 'react';
import { BasketItem } from 'app/_layout/Basket/BasketItem';
import { Section } from 'app/_layout/Section';
import { useBasket, useItemBasket } from 'lib/context/basket';
import { useFetch } from 'lib/services/APIService';
import { useRouter } from 'next/navigation';
import { PrimaryButton, SecondaryButton, Size } from 'theme/components/Button';
import { FormTextField } from 'theme/components/Fields/FormTextField';
import { FlexBox } from 'theme/components/FlexBox';
import { Switcher } from 'theme/components/Switcher';
import { Headline, Paragraph } from 'theme/components/Typography';

import { MenuItemDTO } from 'modules/menu/dto';
import { getMenu } from 'modules/menu/service';
import { createOrderUseCase } from 'modules/order/usecase';
import { useActiveRestaurant } from 'modules/restaurant/hooks';

import * as Styled from './styled';
import { useForm } from './useForm';

type MenuResponse = {
  categories: { id: string; name: string; items: MenuItemDTO[] }[];
};

export default function CheckoutPage() {
  const { count, items, finalPrice, clearBasket } = useBasket();
  const router = useRouter();
  const { activeRestaurant } = useActiveRestaurant();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (count === 0) {
      router.push(`/${activeRestaurant?.slug}`);
    }
  }, [count, activeRestaurant?.slug, router]);

  const {
    errors,
    handleSubmit,
    setValue,
    fulfillment,
    payment,
    fulfillmentOptions,
    paymentOptions,
    fulfillmentRegistration,
    paymentRegistration,
    changeFromRegistration,
    entranceRegistration,
    floorRegistration,
    nameRegistration,
    phoneRegistration,
    streetRegistration,
    houseRegistration,
    flatRegistration,
    commentRegistration,
    watch,
  } = useForm();

  const menuKey = activeRestaurant?.id
    ? getMenu.getUrl({ restaurantID: activeRestaurant.id })
    : null;

  const { data: menu } = useFetch<MenuResponse>(menuKey, getMenu.request);

  const saucesCategory = useMemo(() => {
    const categories = menu?.categories ?? [];
    return categories.find((c) => c.name.toLowerCase().includes('соус'));
  }, [menu?.categories]);

  const sauces = useMemo(() => {
    const list = saucesCategory?.items ?? [];
    return list.slice(0, 6);
  }, [saucesCategory?.items]);

  const deliveryCost = useMemo(() => {
    if (!activeRestaurant) return 0;
    if (fulfillment !== 'delivery') return 0;

    const minFree = activeRestaurant.deliveryMinFreeSum ?? 0;
    if (minFree > 0 && finalPrice >= minFree) return 0;

    return activeRestaurant.deliveryPaidCost ?? 0;
  }, [activeRestaurant, fulfillment, finalPrice]);

  const totalToPay = useMemo(
    () => finalPrice + deliveryCost,
    [deliveryCost, finalPrice],
  );

  const onSubmit = async () => {
    if (!activeRestaurant) return;

    setIsSubmitting(true);

    const values = watch();
    const changeFrom = values.changeFrom
      ? Number(values.changeFrom.replace(',', '.').trim())
      : undefined;

    const base = {
      restaurantId: activeRestaurant.id,
      name: values.name,
      phone: values.phone,
      comment: values.comment || undefined,
      deliveryCost,
      finalPrice,
    };

    const service =
      fulfillment === 'delivery'
        ? {
          orderServiceType: 'DeliveryByCourier' as const,
          street: values.street,
          houseNumber: values.house,
          entrance: values.entrance || undefined,
          floor: values.floor || undefined,
          flatNumber: values.flat || undefined,
        }
        : { orderServiceType: 'DeliveryByClient' as const };

    const paymentData =
      payment === 'cash'
        ? {
          paymentType: 'Cash' as const,
          changeFrom: Number.isFinite(changeFrom) ? changeFrom : undefined,
        }
        : { paymentType: 'Card' as const };

    const itemsData = items.map((item) => {
      const activeModifiers = item.modifiers.filter(
        (modifier) => modifier.modifierId !== 'without-modifier',
      );
      const activeSize = item.item.itemSizes.find(
        (s) => s.id === item.productSizeId,
      );

      return {
        productId: item.productId,
        price: item.price,
        amount: item.count,
        productSizeId: item.productSizeId,
        fullName:
          item.item.name +
          ' ' +
          (activeSize?.name ?? '') +
          ' ' +
          activeModifiers
            .map((modifier) =>
              activeSize?.itemModifierGroups
                .find((group) => group.id === modifier.groupId)
                ?.items.find((item) => item.id === modifier.modifierId)
                ?.name.toLowerCase(),
            )
            .join(', '),
        modifiers: activeModifiers.map((modifier) => ({
          amount: 1,
          price: modifier.price,
          productGroupId: modifier.groupId,
          productId: modifier.modifierId,
        })),
      };
    });

    await createOrderUseCase({
      ...base,
      items: itemsData,
      ...service,
      ...paymentData,
      onSuccess: () => {
        clearBasket();
        setIsSubmitting(false);
        router.replace(`/${activeRestaurant.slug}`);
      },
      onError: () => {
        setIsSubmitting(false);
      },
    });
  };

  return (
    <Section>
      <Styled.Header>
        <Headline level={4}>Оформление заказа</Headline>
        <Paragraph color="#475467" level={2}>
          Заполните данные, проверьте заказ и нажмите «Оформить»
        </Paragraph>
      </Styled.Header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Styled.OrderGrid>
          <Styled.LeftColumn>
            <Styled.Accordion>
              <Styled.AccordionSummary>
                <Headline level={5}>1. Личные данные</Headline>
              </Styled.AccordionSummary>
              <Styled.AccordionContent>
                <Styled.FieldsGrid $cols={2}>
                  <FormTextField
                    required
                    error={errors.name?.message}
                    label="Имя"
                    placeholder="Введите имя"
                    registration={nameRegistration}
                  />
                  <FormTextField
                    required
                    error={errors.phone?.message}
                    label="Номер телефона"
                    mask="+375 00 000-00-00"
                    placeholder="+375 00 000-00-00"
                    registration={phoneRegistration}
                  />
                </Styled.FieldsGrid>
              </Styled.AccordionContent>
            </Styled.Accordion>

            <Styled.Accordion>
              <Styled.AccordionSummary>
                <Headline level={5}>2. Адрес</Headline>
              </Styled.AccordionSummary>
              <Styled.AccordionContent>
                <FlexBox direction="column" gap="10px">
                  <input type="hidden" {...fulfillmentRegistration} />

                  <Switcher
                    options={fulfillmentOptions}
                    setValue={(value) =>
                      setValue('fulfillment', value as any, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      })
                    }
                    value={fulfillment}
                  />

                  {fulfillment === 'pickup' ? (
                    <Styled.InlineInfo>
                      <Paragraph color="#1D2939" fontWeight={700} level={3}>
                        {activeRestaurant?.name}
                      </Paragraph>
                      <Paragraph color="#475467" level={3}>
                        {activeRestaurant?.address}
                      </Paragraph>
                    </Styled.InlineInfo>
                  ) : (
                    <Styled.FieldsGrid $cols={2}>
                      <FormTextField
                        required
                        error={errors.street?.message}
                        label="Улица"
                        placeholder="Например: Машерова"
                        registration={streetRegistration}
                      />
                      <FormTextField
                        required
                        error={errors.house?.message}
                        label="Дом"
                        placeholder="Например: 12"
                        registration={houseRegistration}
                      />
                      <FormTextField
                        label="Подъезд"
                        placeholder="Например: 2"
                        registration={entranceRegistration}
                      />
                      <FormTextField
                        label="Этаж"
                        placeholder="Например: 5"
                        registration={floorRegistration}
                      />
                      <FormTextField
                        error={errors.flat?.message}
                        label="Квартира"
                        placeholder="Например: 45"
                        registration={flatRegistration}
                      />
                    </Styled.FieldsGrid>
                  )}
                </FlexBox>
              </Styled.AccordionContent>
            </Styled.Accordion>

            <Styled.Accordion>
              <Styled.AccordionSummary>
                <Headline level={5}>3. Оплата</Headline>
              </Styled.AccordionSummary>
              <Styled.AccordionContent>
                <input type="hidden" {...paymentRegistration} />
                <Switcher
                  options={paymentOptions}
                  setValue={(value) =>
                    setValue('payment', value as any, {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: true,
                    })
                  }
                  value={payment}
                />

                {payment === 'cash' && (
                  <div style={{ height: 10 }}>
                    <span />
                  </div>
                )}
                {payment === 'cash' && (
                  <FormTextField
                    error={errors.changeFrom?.message}
                    label="С какой суммы нужна сдача"
                    placeholder="Например: 50"
                    registration={changeFromRegistration}
                    type="number"
                  />
                )}
              </Styled.AccordionContent>
            </Styled.Accordion>

            <Styled.Accordion>
              <Styled.AccordionSummary>
                <Headline level={5}>4. Комментарий</Headline>
              </Styled.AccordionSummary>
              <Styled.AccordionContent>
                <FormTextField
                  label="Комментарий"
                  placeholder="Например: без лука, позвонить за 5 минут"
                  registration={commentRegistration}
                  rows={3}
                />
              </Styled.AccordionContent>
            </Styled.Accordion>
          </Styled.LeftColumn>

          <Styled.Sidebar>
            <Styled.Card>
              <FlexBox
                align="center"
                justify="space-between"
                marginBottom="12px"
              >
                <Headline level={5}>Ваш заказ</Headline>
                <SecondaryButton
                  label="Изменить"
                  size={Size.SMALL}
                  onClick={() => router.push(`/${activeRestaurant?.slug}`)}
                />
              </FlexBox>

              <Styled.ItemsList>
                {items.map((item) => (
                  <BasketItem
                    compact
                    item={item}
                    key={
                      item.productId +
                      item.productSizeId +
                      JSON.stringify(item.modifiers)
                    }
                  />
                ))}
              </Styled.ItemsList>
            </Styled.Card>

            {sauces.length > 0 && (
              <Styled.Card>
                <Styled.CardTitle>
                  <Headline level={5} marginBottom="4px">
                    Добавьте соус
                  </Headline>
                  <Paragraph color="#475467" level={3}>
                    Нажмите на соус, чтобы добавить
                  </Paragraph>
                </Styled.CardTitle>

                <Styled.UpsellGrid>
                  {sauces.map((sauce) => (
                    <UpsellSauceCard item={sauce} key={sauce.id} />
                  ))}
                </Styled.UpsellGrid>
              </Styled.Card>
            )}
          </Styled.Sidebar>
        </Styled.OrderGrid>

        <Styled.SummaryBar>
          <Styled.SummaryBarCard>
            <Styled.SummaryBarInner>
              <div>
                <Headline level={5} marginBottom="4px">
                  Итого
                </Headline>
                <Styled.SummaryBarTotals>
                  <Paragraph color="#1D2939" fontWeight={600} level={3}>
                    Сумма: {finalPrice.toFixed(2)} руб
                  </Paragraph>
                  <Paragraph color="#1D2939" fontWeight={600} level={3}>
                    Доставка:{' '}
                    {deliveryCost === 0
                      ? 'Бесплатно'
                      : `${deliveryCost.toFixed(2)} руб`}
                  </Paragraph>
                  <Paragraph color="#1D2939" fontWeight={700} level={2}>
                    К оплате: {totalToPay.toFixed(2)} руб
                  </Paragraph>
                </Styled.SummaryBarTotals>
                <Paragraph color="#98a2b3" level={4} marginTop="6px">
                  Нажимая «Оформить», вы подтверждаете правильность данных
                  заказа
                </Paragraph>
              </div>

              <PrimaryButton
                fullWidth
                label={isSubmitting ? 'Оформляем...' : 'Оформить'}
                loading={isSubmitting}
                size={Size.LARGE}
              />
            </Styled.SummaryBarInner>
          </Styled.SummaryBarCard>
        </Styled.SummaryBar>
      </form>
    </Section>
  );
}

const UpsellSauceCard = ({ item }: { item: MenuItemDTO }) => {
  const defaultSize = useMemo(
    () => item.itemSizes.find((s) => s.isDefault) ?? item.itemSizes[0],
    [item.itemSizes],
  );

  const defaultModifiers = useMemo(
    () =>
      (defaultSize?.itemModifierGroups ?? []).map((group) => ({
        groupId: group.id,
        modifierId:
          group.items.length === 1 ? 'without-modifier' : group.items[0].id,
        price: group.items.length === 1 ? 0 : group.items[0].price,
      })),
    [defaultSize?.itemModifierGroups],
  );

  const { addItem, count, finalPrice } = useItemBasket({
    productId: item.id,
    productSizeId: defaultSize?.id ?? item.itemSizes[0].id,
    modifiers: defaultModifiers,
    item,
    price: defaultSize?.price ?? item.itemSizes[0].price,
  });

  return (
    <Styled.UpsellItem type="button" onClick={addItem}>
      <Styled.UpsellImage src={defaultSize?.image} />
      <Styled.UpsellContent>
        <Paragraph noWrap color="#1D2939" fontWeight={700} level={3}>
          {item.name}
        </Paragraph>
        <Styled.UpsellBottom>
          <Paragraph color="#1D2939" fontWeight={600} level={3}>
            {Number(finalPrice).toFixed(2)} руб
          </Paragraph>
          {count > 0 && (
            <Paragraph color="#3f8f4a" fontWeight={700} level={3}>
              ×{count}
            </Paragraph>
          )}
        </Styled.UpsellBottom>
      </Styled.UpsellContent>
    </Styled.UpsellItem>
  );
};
