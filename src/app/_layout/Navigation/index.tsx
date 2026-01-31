'use client';

import { FC, useState } from 'react';
import { MdLocalPhone } from 'react-icons/md';
import { useBasket } from 'lib/context/basket';
import { usePathname } from 'next/navigation';
import { Logo } from 'theme/components/Logo';
import { Paragraph } from 'theme/components/Typography';

import { useActiveRestaurant } from 'modules/restaurant/hooks';

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
        {MOBILE_MENU.map(({ title, Icon, url }) => (
          <Styled.MobileMenuItem
            {...(url
              ? {
                href: `/${activeRestaurant?.slug}/${url}`,
                $active: pathname.includes(url) && url !== '/',
                onClick: onCloseMenu,
              }
              : { onClick: toggleMenu })}
            key={title}
          >
            <Icon size={20} />
            <Paragraph color="inherit" fontWeight={600} level={2}>
              {title}
            </Paragraph>
          </Styled.MobileMenuItem>
        ))}
      </Styled.MobileMenu>
    </>
  );
};
