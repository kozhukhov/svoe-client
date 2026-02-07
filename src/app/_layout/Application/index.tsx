'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { BasketProvider } from 'lib/context/basket';
import { LocalStorageService } from 'lib/services/LocalStorageService';
import { redirect } from 'next/navigation';
import { PrimaryButton, SecondaryButton } from 'theme/components/Button';
import { FlexBox } from 'theme/components/FlexBox';
import { PizzaLoader } from 'theme/components/PizzaLoader';
import { Headline, Paragraph } from 'theme/components/Typography';

import { useInitIIKO } from 'modules/iiko/hooks';
import { useActiveRestaurant } from 'modules/restaurant/hooks';

import { Basket } from '../Basket';
import { Footer } from '../Footer';
import { getSocials } from '../Footer/constants';
import { Main } from '../Main';
import { Navigation } from '../Navigation';
import { SnackbarsProvider } from '../Snackbars';

import * as Styled from './styled';

const LOCAL_STORAGE_KEY = 'svoe-restaurant-location';

const formatReopenAt = (value?: string | null) => {
  if (!value) return null;

  const date = new Date(value);
  if (!Number.isNaN(date.getTime())) {
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }

  return value;
};

export const Application = ({ children }: { children: React.ReactNode }) => {
  const [approvedLocation, setApprovedLocation] = useState(false);
  const [rejectedLocation, setRejectedLocation] = useState(false);
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  const { isLoading: isInitIIKOLoading, error: isInitIIKOError } =
    useInitIIKO();

  const { isRestaurantsLoading, restaurants, activeRestaurant } =
    useActiveRestaurant();

  const cachedRestaurantLocationSlug =
    LocalStorageService.get(LOCAL_STORAGE_KEY);

  const cachedRestaurant = restaurants.find(
    (restaurant) => restaurant.slug === cachedRestaurantLocationSlug,
  );

  const shouldShowDialogApproveLocation = useMemo(
    () =>
      !approvedLocation &&
      !rejectedLocation &&
      (cachedRestaurant || activeRestaurant),
    [approvedLocation, rejectedLocation, cachedRestaurant, activeRestaurant],
  );

  // console.log('restaurantLocationSlug', restaurantLocationSlug);

  const shouldShowDialogChangeLocation = useMemo(
    () =>
      !approvedLocation &&
      (rejectedLocation ||
        (!approvedLocation && !shouldShowDialogApproveLocation)),
    [approvedLocation, shouldShowDialogApproveLocation, rejectedLocation],
  );

  const setRestaurantLocation = useCallback((slug: string) => {
    LocalStorageService.set(LOCAL_STORAGE_KEY, slug);

    setApprovedLocation(true);

    redirect(`/${slug}`);
  }, []);

  if (isRestaurantsLoading || isInitIIKOLoading) {
    return (
      <Styled.Wrapper>
        <PizzaLoader />
      </Styled.Wrapper>
    );
  }

  if (isInitIIKOError) {
    return (
      <Styled.Wrapper>
        <Headline level={5} marginBottom="4px" textAlign="center">
          Что-то пошло не так. Попробуйте позже.
        </Headline>
      </Styled.Wrapper>
    );
  }

  if (shouldShowDialogApproveLocation) {
    return (
      <Styled.Wrapper>
        <Styled.Dialog>
          <Headline level={5} marginBottom="4px" textAlign="center">
            Вы находитесь в городе{' '}
            {cachedRestaurant?.city || activeRestaurant!.city}?
          </Headline>
          <Paragraph level={2} marginBottom="16px" textAlign="center">
            Это поможет показать вам меню и цены вашего города
          </Paragraph>
          <FlexBox stretch gap="16px">
            <SecondaryButton
              label="Нет"
              onClick={() => setRejectedLocation(true)}
            />
            <PrimaryButton
              label="Да"
              onClick={() =>
                setRestaurantLocation(
                  cachedRestaurant?.slug || activeRestaurant!.slug,
                )
              }
            />
          </FlexBox>
        </Styled.Dialog>
      </Styled.Wrapper>
    );
  }

  if (shouldShowDialogChangeLocation) {
    return (
      <Styled.Wrapper>
        <Styled.Dialog>
          <Headline level={5} marginBottom="4px" textAlign="center">
            Пожалуйста, выберите город для просмотра меню и цен
          </Headline>
          <Paragraph level={2} marginBottom="16px" textAlign="center">
            Вы можете изменить город в любое время
          </Paragraph>
          <FlexBox direction="column" gap="16px">
            {restaurants.map((restaurant) => (
              <SecondaryButton
                fullWidth
                  icon={<IoLocationOutline color="#3f8f4a" size={20} />}
                key={restaurant.slug}
                label={restaurant.city}
                onClick={() => setRestaurantLocation(restaurant.slug)}
              />
            ))}
          </FlexBox>
        </Styled.Dialog>
      </Styled.Wrapper>
    );
  }

  if (activeRestaurant?.inactiveReason) {
    const reopenAtText = formatReopenAt(activeRestaurant.reopenAt);
    const phoneHref = activeRestaurant.phone
      ? `tel:${activeRestaurant.phone.replace(/ |-|\(|\)/g, '')}`
      : undefined;

    const socials = getSocials(activeRestaurant);

    return (
      <Styled.Wrapper>
        <Styled.InactiveDialog>
          <div>
            <Headline level={4} marginBottom="8px" textAlign="center">
              Сегодня мы не работаем
            </Headline>
            <Paragraph level={2} marginBottom="10px" textAlign="center">
              Нам очень жаль, но ресторан сегодня закрыт
            </Paragraph>
            <Paragraph level={2} textAlign="center">
              Причина: {activeRestaurant.inactiveReason}
            </Paragraph>
            {reopenAtText && (
              <Paragraph
                color="#3f8f4a"
                fontWeight={700}
                level={2}
                marginTop="12px"
                textAlign="center"
              >
                Откроемся: {reopenAtText}
              </Paragraph>
            )}
          </div>

          <Styled.InactiveDivider />

          <div>
            <Headline level={5} marginBottom="10px" textAlign="center">
              Связаться с нами
            </Headline>
            <Styled.InactiveLinks>
              {phoneHref && (
                <Styled.InactiveLink href={phoneHref} level={2}>
                  {activeRestaurant.phone}
                </Styled.InactiveLink>
              )}
              {activeRestaurant.address && (
                <Paragraph level={3} textAlign="center">
                  {activeRestaurant.address}
                </Paragraph>
              )}
            </Styled.InactiveLinks>

            {socials.length > 0 && (
              <>
                <Styled.InactiveSocials>
                  {socials.map((social) => (
                    <Styled.InactiveSocialLink
                      $icon={social.icon}
                      aria-label={social.name}
                      href={social.url}
                      key={social.name}
                      rel="noopener noreferrer"
                      target="_blank"
                    />
                  ))}
                </Styled.InactiveSocials>
              </>
            )}
          </div>
        </Styled.InactiveDialog>
      </Styled.Wrapper>
    );
  }

  return (
    <Styled.Application>
      <BasketProvider>
        <Navigation onOpenBasket={() => setIsBasketOpen(true)} />
        <SnackbarsProvider />
        <Main>{children}</Main>
        <Footer />
        <Basket isOpen={isBasketOpen} onClose={() => setIsBasketOpen(false)} />
      </BasketProvider>
    </Styled.Application>
  );
};
