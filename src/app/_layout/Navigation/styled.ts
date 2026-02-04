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
          border-bottom: 2px solid #3f8f4a;
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

export const BasketContainer = styled.div`
  min-width: 124px;
  text-align: right;
`;

export const BasketWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 40px;
  border-radius: 12px;
  background-color: #eaf4ea;
  border: 1px solid #d4e9d4;
  padding: 0 10px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: #d4e9d4;
  }

  ${({ theme: { media } }) => css`
    ${media.tablet} {
      display: none;
    }
  `}
`;

export const BasketBadge = styled.div`
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
  box-shadow: 0 0 0 2px #fff;
`;

export const MobileMenu = styled(Section).attrs({
  withoutMarginBottom: true,
})`
  display: none;
  height: 78px;
  box-sizing: border-box;
  width: 100%;
  padding: 0;

  position: fixed;
  bottom: calc(env(safe-area-inset-bottom) + 14px);
  left: 0;
  right: 0;
  z-index: 100;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  ${({ theme: { media } }) => css`
    ${media.tablet} {
      display: flex;
    }
  `}
`;

export const MobileMenuDock = styled.div`
  pointer-events: auto;
  width: min(520px, calc(100% - 40px));
  padding: 8px 10px calc(8px + env(safe-area-inset-bottom));
  border-radius: 22px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.74);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 16px 34px rgba(16, 24, 40, 0.16);
  transform: none;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  &::before {
    content: '';
    position: absolute;
    inset: -14px;
    z-index: -1;
    border-radius: 999px;
    background: radial-gradient(
      circle at 50% 60%,
      rgba(16, 24, 40, 0.14),
      rgba(16, 24, 40, 0) 60%
    );
    filter: blur(16px);
    opacity: 0.9;
    pointer-events: none;
  }
`;

export const MobileMenuItem = styled(Paragraph)<{ $highlighted?: boolean }>`
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2px;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 14px;
  transition:
    transform 120ms ease,
    background 120ms ease,
    color 120ms ease;

  ${({ $highlighted }) => css`
    ${$highlighted
      ? css`
          background: transparent;
          color: #344054;
        `
      : css`
          background: transparent;
          color: #475467;
        `}
  `}

  &:active {
    transform: translateY(1px);
  }
`;

export const MobileMenuIconWrapper = styled.div<{ $highlighted: boolean }>`
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.08);

  ${({ $highlighted }) => css`
    ${$highlighted
      ? css`
          background: rgba(63, 143, 74, 0.12);
          color: #3f8f4a;
        `
      : css`
          background: rgba(16, 24, 40, 0.04);
        `}
  `}
`;

export const MobileMenuBadge = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 999px;
  background-color: #ff4d4f;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  box-shadow: 0 0 0 2px rgba(234, 244, 234, 0.92);
`;

export const PhoneWrapper = styled(FlexBox)`
  display: none;

  ${({ theme: { media } }) => css`
    ${media.tablet} {
      display: flex;
    }
  `}
`;

export const BasketCount = styled.div`
  border-left: 1px solid #d4e9d4;
  margin-left: 8px;
  padding-left: 8px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
