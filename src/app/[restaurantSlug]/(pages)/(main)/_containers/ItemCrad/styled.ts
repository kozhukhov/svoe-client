import styled, { css } from 'styled-components';
import { Headline, Paragraph } from 'theme/components/Typography';

export const Card = styled.div`
  border-radius: 16px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ theme: { media } }) => css`
    ${media.tablet} {
      flex-direction: row;
    }
  `}
`;

export const Image = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  height: auto;
  object-fit: cover;
  border-radius: 16px;

  ${({ theme: { media } }) => css`
    ${media.tablet} {
      width: 40%;
    }
  `}
`;

export const Name = styled(Headline).attrs({
  level: 5,
  fontWeight: 600,
  marginBottom: '4px',
})`
  ${({ theme: { media } }) => css`
    ${media.tablet} {
      font-size: 18px;
      margin-bottom: 8px;
      line-height: 18px;
    }
  `}
`;

export const Description = styled(Paragraph).attrs({
  level: 2,
})`
  line-height: 20px;

  ${({ theme: { media } }) => css`
    ${media.tablet} {
      font-size: 14px;
      line-height: 17px;
    }
  `}
`;

export const Price = styled(Paragraph).attrs({
  fontWeight: 700,
})`
  span {
    font-size: 22px;
    line-height: 28px;
    font-weight: 800;
    color: #1d2939;
  }
`;

export const Info = styled.div`
  padding: 0px 16px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  height: 100%;
  box-sizing: border-box;
  width: 100%;

  ${({ theme: { media } }) => css`
    ${media.tablet} {
      padding: 12px;
      flex: 1;
    }
  `}
`;
