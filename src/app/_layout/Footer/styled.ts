import styled, { css } from 'styled-components';
import { Paragraph } from 'theme/components/Typography';

export const Footer = styled.footer`
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 30px;

  ${({ theme: { media } }) => css`
    ${media.tablet} {
      padding-bottom: 100px;
      display: none;
    }

    ${media.mobile} {
      padding-top: 20px;
      border-radius: 15px 15px 0 0;
    }
  `}
`;

export const Bottom = styled.div`
  padding: 30px 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ theme: { media } }) => css`
    ${media.mobile} {
      flex-direction: column;
      align-items: center;
      gap: 10px;
      padding: 20px 0px;
      margin-top: 20px;

      > div {
        text-align: center;
      }
    }
  `}
`;

export const Socials = styled.div`
  display: flex;
  gap: 10px;
`;

export const SocialLink = styled.a<{ $icon: string }>`
  width: 24px;
  height: 24px;
  border-radius: 5px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  transition: opacity 0.3s ease;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }

  ${({ $icon }) => css`
    background-image: url(${$icon});
  `}
`;

export const Top = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  gap: 20px;
  flex-wrap: wrap;
`;

export const Column = styled.div`
  flex: 1;

  ${({ theme: { media } }) => css`
    ${media.tablet} {
      width: calc(50% - 10px);
      flex: none;
    }
  `}
`;

export const ColumnTitle = styled(Paragraph).attrs({
  level: 2,
  fontWeight: 700,
})`
  margin-bottom: 10px;
`;

export const Contacts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;

  ${({ theme: { media } }) => css`
    ${media.mobile} {
      > div {
        font-size: 14px;
      }
    }
  `}
`;

export const Link = styled(Paragraph)`
  &:hover {
    color: rgb(249, 198, 70);
  }
`;

export const WorkTime = styled(Column)``;
