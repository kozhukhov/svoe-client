'use client';

import { FC, useState } from 'react';
import { MdLocalPhone } from 'react-icons/md';
import { useBasket } from 'lib/context/basket';
import { usePathname } from 'next/navigation';
import { Logo } from 'theme/components/Logo';
import { Paragraph } from 'theme/components/Typography';

import { useActiveRestaurant } from 'modules/restaurant/hooks';

import { APP_STORE_URL, PLAY_MARKET_URL } from '../Footer/constants';
import { MENU, MOBILE_MENU } from './constants';
import * as Styled from './styled';
import { useScroll } from './useScroll';

type Props = {
  onOpenBasket: () => void;
};

export const Navigation: FC<Props> = ({ onOpenBasket }) => {
  const isScrolled = useScroll();
  const [isOpen, setIsOpen] = useState(false);

  const { count } = useBasket();

  const { activeRestaurant } = useActiveRestaurant();

  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const onCloseMenu = () => {
    setIsOpen(false);
  };

  const menu = (
    <Styled.Section>
      <Logo small />

      <Styled.MobileMenuWrapper $isOpen={isOpen}>
        <Styled.Menu>
          {MENU.map((menu) => (
            <Styled.MenuItem
              $active={pathname.includes(menu.url) && menu.url !== '/'}
              href={`/${activeRestaurant?.slug}/${menu.url}`}
              key={menu.title}
              onClick={onCloseMenu}
            >
              {menu.title}
            </Styled.MenuItem>
          ))}
          <Styled.AppLinks>
            <Styled.AppLinksTitle>Ссылки на приложения</Styled.AppLinksTitle>
            <Styled.AppLink
              href={APP_STORE_URL}
              onClick={onCloseMenu}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Styled.AppLinkIcon>
                <svg
                  fill="currentColor"
                  height="16"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </Styled.AppLinkIcon>
              App Store
            </Styled.AppLink>
            <Styled.AppLink
              href={PLAY_MARKET_URL}
              onClick={onCloseMenu}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Styled.AppLinkIcon>
                <svg
                  fill="currentColor"
                  height="16"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.8 12l2.9-2.9zM5.864 2.658L16.802 8.99l-2.302 2.302-8.636-8.636z" />
                </svg>
              </Styled.AppLinkIcon>
              Google Play
            </Styled.AppLink>
          </Styled.AppLinks>
        </Styled.Menu>
      </Styled.MobileMenuWrapper>

      <Styled.BasketContainer>
        <Styled.BasketWrapper onClick={onOpenBasket}>
          <Paragraph color="#3f8f4a" fontWeight={600} level={3}>
            Корзина
          </Paragraph>
          {count > 0 && (
            <Styled.BasketCount>
              <Styled.BasketBadge>{count}</Styled.BasketBadge>
            </Styled.BasketCount>
          )}
        </Styled.BasketWrapper>
      </Styled.BasketContainer>

      <Styled.PhoneWrapper align="center" gap="8px">
        <MdLocalPhone size={20} />
        <Paragraph
          color="#1a1a1a"
          fontWeight={600}
          href={`tel:${activeRestaurant?.phone.replace(/ |-|\(|\)/g, '')}`}
          level={2}
        >
          {activeRestaurant?.phone}
        </Paragraph>
      </Styled.PhoneWrapper>
    </Styled.Section>
  );

  return (
    <>
      {isOpen && <Styled.Blur onClick={toggleMenu} />}
      <Styled.Navigation>{menu}</Styled.Navigation>
      <Styled.StickyNavigation $active={isScrolled}>
        {menu}
      </Styled.StickyNavigation>
      <Styled.MobileMenu>
        <Styled.MobileMenuDock>
          {MOBILE_MENU.map(({ action, title, Icon, url }) => (
            <Styled.MobileMenuItem
              {...(action === 'basket'
                ? {
                  $highlighted: count > 0,
                  onClick: onOpenBasket,
                }
                : url
                  ? {
                    href: `/${activeRestaurant?.slug}/${url}`,
                    onClick: onCloseMenu,
                  }
                  : { onClick: toggleMenu })}
              key={title}
            >
              <Styled.MobileMenuIconWrapper
                $highlighted={count > 0 && action === 'basket'}
              >
                <Icon size={19} />
                {action === 'basket' && count > 0 && (
                  <Styled.MobileMenuBadge>{count}</Styled.MobileMenuBadge>
                )}
              </Styled.MobileMenuIconWrapper>
              <Paragraph color="inherit" fontWeight={600} level={3}>
                {title}
              </Paragraph>
            </Styled.MobileMenuItem>
          ))}
        </Styled.MobileMenuDock>
      </Styled.MobileMenu>
    </>
  );
};
