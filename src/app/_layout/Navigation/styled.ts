import { css, styled } from 'styled-components';
import { FlexBox } from 'theme/components/FlexBox';
import { Paragraph } from 'theme/components/Typography';

import { Section as BaseSection } from '../Section';

import CloseIcon from './assets/close.svg';
import HamburgerIcon from './assets/hamburger.svg';

const navigationStyle = css`
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  width: 100%;
  padding: 10px 0px;
  box-sizing: border-box;
  background-color: #fff;
  backdrop-filter: blur(10px);
  height: 64px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const Navigation = styled.div`
  ${navigationStyle}

  position: relative;
  margin-bottom: 60px;

  ${({ theme: { media } }) => css`
    ${media.tablet} {
      margin-bottom: 20px;
    }
  `}
`;

export const StickyNavigation = styled.div<{ $active: boolean }>`
  ${navigationStyle}
  position: fixed;
  transition: all 0.3s ease-in-out;

  ${({ $active }) =>
    $active
      ? css`
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        `
      : css`
          opacity: 0;
          visibility: hidden;
          transform: translateY(-100%);
          pointer-events: none;
        `}
`;

export const Section = styled(BaseSection).attrs({
  withoutMarginBottom: true,
})`
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Menu = styled.div`
  display: flex;
  gap: 20px;

  ${({ theme: { media } }) => css`
    ${media.tablet} {
      flex-direction: column;
      gap: 4px;
      margin-bottom: 12px;
    }
  `}
`;

export const MenuItem = styled(Paragraph).attrs({
  level: 1,
  fontWeight: 600,
  color: '#1a1a1a',
})<{ $active: boolean }>`
  ${({ theme: { media }, $active }) => css`
    ${$active
      ? css`
          border-bottom: 2px solid rgb(249, 198, 70);
        `
      : css`
          border-bottom: 2px solid transparent;
        `}

    ${media.tablet} {
      color: #1a1a1a;
    }
  `}
`;

export const MobileToggle = styled.div<{ $isOpen: boolean }>`
  display: contents;

  ${({ theme: { media }, $isOpen }) => css`
    ${media.tablet} {
      display: block;
      position: relative;
      width: 40px;
      height: 40px;
      background-color: transparent;
      border-radius: 8px;
      border: 1px solid #fff;

      cursor: pointer;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      background: ${$isOpen
        ? `url(${CloseIcon.src})`
        : `url(${HamburgerIcon.src})`};
      background-size: 20px;
      background-position: center;
      background-repeat: no-repeat;
    }
  `}
`;

export const MobileMenuWrapper = styled.div<{ $isOpen: boolean }>`
  display: contents;

  ${({ theme: { media }, $isOpen }) => css`
    ${media.tablet} {
      position: absolute;
      display: block;
      padding: 20px;
      top: 60px;
      z-index: -1;
      right: 0;
      width: 100%;
      box-sizing: border-box;
      background-color: #fff;
      transition: all 0.3s ease-in-out;
      opacity: ${$isOpen ? '1' : '0'};
      visibility: ${$isOpen ? 'visible' : 'hidden'};
      transform: ${$isOpen ? 'translateY(0)' : 'translateY(-300px)'};
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
  `}
`;

export const Blur = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  display: none;

  ${({ theme: { media } }) => css`
    ${media.tablet} {
      display: block;
    }
  `}
`;

export const BasketWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 40px;
  border-radius: 12px;
  background-color: rgba(249, 198, 70, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0 10px;
  svg {
    display: block;
  }

  ${({ theme: { media } }) => css`
    ${media.tablet} {
      display: none;
    }
  `}
`;

export const BasketBadge = styled.span`
  position: absolute;
  top: -9px;
  right: -9px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background-color: #ff4d4f;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  box-shadow: 0 0 0 2px #fff;
`;

export const MobileMenu = styled(Section).attrs({
  withoutMarginBottom: true,
})`
  display: none;
  height: 80px;
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  align-items: center;
  justify-content: space-between;

  ${({ theme: { media } }) => css`
    ${media.tablet} {
      display: flex;
    }
  `}
`;

export const MobileMenuItem = styled(Paragraph)<{ $active?: boolean }>`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;

  ${({ $active }) => css`
    ${$active
      ? css`
          color: rgb(249, 198, 70);
        `
      : css`
          color: #1a1a1a;
        `}
  `}
`;

export const PhoneWrapper = styled(FlexBox)`
  display: none;

  ${({ theme: { media } }) => css`
    ${media.tablet} {
      display: flex;
    }
  `}
`;
