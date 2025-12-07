import styled, { css } from 'styled-components';

export const InfoGrid = styled.div<{ $marginBottom?: string }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
  margin-bottom: ${({ $marginBottom = '18px' }) => $marginBottom};
`;

export const Card = styled.div<{
  $gap?: number;
  $borderOpacity?: number;
  $shadow?: string;
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap = 10 }) => `${$gap}px`};
  padding: 18px;
  border-radius: 16px;
  border: 1px solid
    rgba(0, 0, 0, ${({ $borderOpacity = 0.1 }) => $borderOpacity});
  background: #fff;
  box-shadow: ${({ $shadow }) => $shadow ?? 'none'};
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Icon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  color: rgb(249, 198, 70);
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
  background: rgba(249, 198, 70, 0.08);
`;

export const CardValue = styled.div`
  font-size: 22px;
  line-height: 28px;
  font-weight: 800;
  color: #1d2939;
  margin-bottom: 2px;
`;

export const CardNote = styled.div`
  color: #4b5563;
  font-size: 14px;
  line-height: 21px;
`;

export const MapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.04);
  background: #f8fafc;
`;

export const MapFrame = styled.iframe`
  width: 100%;
  height: 360px;
  border: none;

  ${({ theme: { media } }) => css`
    ${media.mobile} {
      height: 320px;
    }
  `}
`;

export const MapCaption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 14px;
  background: rgba(249, 198, 70, 0.08);
  color: #1d2939;

  ${({ theme: { media } }) => css`
    ${media.mobile} {
      flex-direction: column;
      align-items: flex-start;
    }
  `}
`;

export const MapLink = styled.a`
  font-weight: 600;
  color: #1d2939;
  text-decoration: none;

  &:hover {
    color: rgb(249, 198, 70);
  }
`;
