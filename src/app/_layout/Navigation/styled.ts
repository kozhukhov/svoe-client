import { css, styled } from 'styled-components';
import { SecondaryButton } from 'theme/components/Button';
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
  margin-bottom: 100px;

  ${({ theme: { media } }) => css`
    ${media.tablet} {
      margin-bottom: 60px;
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
      border-radius: 12px;
      padding: 20px;
      top: 60px;
      right: 0;
      width: 270px;
      background-color: #fff;
      transition: all 0.3s ease-in-out;
      opacity: ${$isOpen ? '1' : '0'};
      visibility: ${$isOpen ? 'visible' : 'hidden'};
      transform: ${$isOpen
        ? 'translateY(0) scale(1)'
        : 'translateY(-10px) scale(0.95)'};
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

export const Action = styled(SecondaryButton)`
  ${({ theme: { media } }) => css`
    ${media.tablet} {
      width: 100%;
    }
  `}
`;
