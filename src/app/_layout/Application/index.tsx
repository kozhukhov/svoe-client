'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { LocalStorageService } from 'lib/services/LocalStorageService';
import { redirect } from 'next/navigation';
import { PrimaryButton, SecondaryButton } from 'theme/components/Button';
import { FlexBox } from 'theme/components/FlexBox';
import { PizzaLoader } from 'theme/components/PizzaLoader';
import { Headline, Paragraph } from 'theme/components/Typography';

import { useActiveRestaurant } from 'modules/restaurant/hooks';

import { Footer } from '../Footer';
import { Main } from '../Main';
import { Navigation } from '../Navigation';

import * as Styled from './styled';

const LOCAL_STORAGE_KEY = 'svoe-restaurant-location';

export const Application = ({ children }: { children: React.ReactNode }) => {
  const [rejectLocation, setRejectLocation] = useState(false);

  const { isRestaurantsLoading, restaurants, activeRestaurant } =
    useActiveRestaurant();

  const restaurantLocationSlug = LocalStorageService.get(LOCAL_STORAGE_KEY);

  const shouldShowDialogApproveLocation = useMemo(
    () =>
      !rejectLocation &&
      activeRestaurant &&
      restaurantLocationSlug !== activeRestaurant.slug,
    [rejectLocation, activeRestaurant, restaurantLocationSlug],
  );

  const shouldShowDialogChangeLocation = useMemo(
    () => rejectLocation || !activeRestaurant,
    [activeRestaurant, rejectLocation],
  );

  const setRestaurantLocation = useCallback((slug: string) => {
    LocalStorageService.set(LOCAL_STORAGE_KEY, slug);

    redirect(`/${slug}`);
  }, []);

  if (isRestaurantsLoading) {
    return (
      <Styled.Wrapper>
        <PizzaLoader />
      </Styled.Wrapper>
    );
  }

  if (shouldShowDialogApproveLocation) {
    return (
      <Styled.Wrapper>
        <Styled.Dialog>
          <Headline level={5} marginBottom="4px" textAlign="center">
            Вы находитесь в городе {activeRestaurant!.city}?
          </Headline>
          <Paragraph level={2} marginBottom="16px" textAlign="center">
            Это поможет показать вам меню и цены вашего города
          </Paragraph>
          <FlexBox stretch gap="16px">
            <SecondaryButton
              label="Нет"
              onClick={() => setRejectLocation(true)}
            />
            <PrimaryButton
              label="Да"
              onClick={() => setRestaurantLocation(activeRestaurant!.slug)}
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
                icon={<IoLocationOutline color="#f9c646" size={20} />}
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

  return (
    <>
      <Navigation />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};
