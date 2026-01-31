import styled, { css } from 'styled-components';
import { FlexBox } from 'theme/components/FlexBox';
import { Headline, Paragraph } from 'theme/components/Typography';

export const Card = styled.div`
  border-radius: 16px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

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
      width: 50%;
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
  level: 3,
})`
  line-height: 18px;
  hyphens: auto;

  ${({ theme: { media } }) => css`
    ${media.tablet} {
      font-size: 14px;
      line-height: 16px;
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

  ${({ theme: { media } }) => css`
    ${media.tablet} {
      font-size: 12px;

      span {
        font-size: 18px;
        line-height: 22px;
      }
    }
  `}
`;

export const Info = styled.div`
  padding: 0px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  height: 100%;
  box-sizing: border-box;
  width: 100%;

  ${({ theme: { media } }) => css`
    ${media.tablet} {
      padding: 12px 12px 0px;
      flex: 1;
    }
  `}
`;

export const ActionButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #d4e9d4;
  border-radius: 14px;
  overflow: auto;
  height: 38px;
  overflow: hidden;
  > button {
    width: 40px;
    font-size: 20px;
    font-weight: 400;
    border-radius: 0px;
    margin-bottom: 2px;
  }
`;

export const Bottom = styled.div`
  padding: 16px;

  ${({ theme: { media } }) => css`
    ${media.tablet} {
      padding: 12px;
    }
  `}
`;

export const PriceContainer = styled(FlexBox).attrs({
  align: 'center',
  gap: '8px',
  justify: 'space-between',
  marginBottom: '12px',
})`
  margin-bottom: 12px;

  ${({ theme: { media } }) => css`
    ${media.tablet} {
      margin-bottom: 4px;
    }
  `}
`;

export const Measure = styled(Paragraph).attrs({
  level: 2,
})`
  ${({ theme: { media } }) => css`
    ${media.tablet} {
      font-size: 12px;
    }
  `}
`;
