import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 32px;
  position: relative;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const WelcomeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px 0;
`;

export const WelcomeSubtitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #3f8f4a;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
`;

export const WelcomeTitle = styled.h1`
  font-size: 42px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.1;
  letter-spacing: -0.5px;

  @media (max-width: 968px) {
    font-size: 32px;
  }

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const BrandName = styled.span`
  color: #3f8f4a;
  font-weight: 900;
`;

export const Price = styled.span`
  color: #3f8f4a;
  font-weight: 900;
`;

export const WelcomeDescription = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #475467;
  margin: 12px 0 0 0;
  line-height: 1.6;
  max-width: 90%;

  @media (max-width: 968px) {
    font-size: 15px;
    max-width: 100%;
  }
`;

export const WelcomeAccent = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #3f8f4a;
  margin-top: 8px;
  padding-top: 16px;
  border-top: 2px solid rgba(63, 143, 74, 0.2);
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  background: #f5f5f5;
`;

export const Slider = styled.div<{ $currentIndex: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${({ $currentIndex }) => `-${$currentIndex * 100}%`});
`;

export const Slide = styled.div`
  position: relative;
  width: 100%;
  min-width: 100%;
  flex-shrink: 0;
  height: 0;
  padding-bottom: 60%;
  overflow: hidden;

  @media (max-width: 968px) {
    padding-bottom: 50%;
  }

  @media (max-width: 768px) {
    padding-bottom: 60%;
  }
`;

export const SkeletonWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const SlideImage = styled.img<{ $loaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 0.3s ease;
  z-index: 2;
`;

export const SlideContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px 20px 40px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.5) 40%,
    rgba(0, 0, 0, 0.2) 70%,
    transparent 100%
  );

  @media (max-width: 768px) {
    padding: 20px 16px 36px;
  }
`;

export const SlideTitle = styled.h3`
  color: #ffffff;
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 8px 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  letter-spacing: -0.3px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const SlideDescription = styled.p`
  color: rgba(255, 255, 255, 0.95);
  font-size: 15px;
  font-weight: 400;
  margin: 0;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const ProgressBars = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 6px;
  padding: 16px 20px;
  z-index: 10;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.2) 50%,
    transparent 100%
  );

  @media (max-width: 768px) {
    padding: 12px 16px;
    gap: 4px;
  }
`;

export const ProgressBar = styled.button<{ $active: boolean }>`
  flex: 1;
  height: ${({ $active }) => ($active ? '4px' : '3px')};
  border: none;
  padding: 0;
  cursor: pointer;
  transition:
    background 0.3s ease,
    height 0.2s ease;
  background: ${({ $active }) =>
    $active ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.35)'};
  border-radius: 2px;
  box-shadow: ${({ $active }) =>
    $active ? '0 0 8px rgba(255, 255, 255, 0.5)' : 'none'};

  &:hover {
    background: rgba(255, 255, 255, 0.7);
    height: 4px;
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: 2px;
  }
`;
