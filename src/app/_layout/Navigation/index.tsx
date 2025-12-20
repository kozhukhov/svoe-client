'use client';

import { useState } from 'react';
import { BsBasket } from 'react-icons/bs';
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

  const menu = (
    <Styled.Section>
      <Logo small />

      <Styled.MobileToggle $isOpen={isOpen} onClick={toggleMenu}>
        <Styled.MobileMenuWrapper $isOpen={isOpen}>
          <Styled.Menu>
            {MENU.map((menu) => (
              <Styled.MenuItem
                $active={pathname.includes(menu.url) && menu.url !== '/'}
                href={`/${activeRestaurant?.slug}/${menu.url}`}
                key={menu.title}
              >
                {menu.title}
              </Styled.MenuItem>
            ))}
          </Styled.Menu>

          {/* <Paragraph
            color="#1a1a1a"
            fontWeight={600}
            href={`tel:${activeRestaurant?.phone.replace(/ |-|\(|\)/g, '')}`}
            level={2}
          >
            {activeRestaurant?.phone}
          </Paragraph> */}
        </Styled.MobileMenuWrapper>
      </Styled.MobileToggle>
      <Styled.BasketWrapper>
        <BsBasket size={20} />
        <Styled.BasketBadge>{basketCount}</Styled.BasketBadge>
      </Styled.BasketWrapper>
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
        {MOBILE_MENU.map(({ title, Icon }) => (
          <Styled.MobileMenuItem key={title}>
            <Icon size={20} />
            <Paragraph fontWeight={600} level={2}>
              {title}
            </Paragraph>
          </Styled.MobileMenuItem>
        ))}
      </Styled.MobileMenu>
    </>
  );
};
