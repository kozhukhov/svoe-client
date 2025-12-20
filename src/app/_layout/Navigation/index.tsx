'use client';

import { useState } from 'react';
import { BsBasket } from 'react-icons/bs';
import { MdLocalPhone } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import { Logo } from 'theme/components/Logo';
import { Paragraph } from 'theme/components/Typography';

import { useActiveRestaurant } from 'modules/restaurant/hooks';

import { MENU, MOBILE_MENU } from './constants';
import * as Styled from './styled';
import { useScroll } from './useScroll';

export const Navigation = () => {
  const isScrolled = useScroll();
  const [isOpen, setIsOpen] = useState(false);

  const { activeRestaurant } = useActiveRestaurant();

  const basketCount = 0;

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

      <Styled.BasketWrapper>
        <BsBasket size={20} />
        <Styled.BasketBadge>{basketCount}</Styled.BasketBadge>
      </Styled.BasketWrapper>

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
