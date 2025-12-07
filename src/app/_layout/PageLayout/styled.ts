import styled, { css } from 'styled-components';
import { Paragraph } from 'theme/components/Typography';

export const TopPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const Content = styled.div`
  margin-right: -60px;
  padding-right: 60px;

  ${({ theme: { media } }) => css`
    ${media.tablet} {
      margin-right: -20px;
      padding-right: 20px;
    }

    ${media.mobile} {
      margin-right: -16px;
      padding-right: 16px;
    }
  `}
`;

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Total = styled(Paragraph).attrs({ level: 4, fontWeight: 600 })`
  color: #465fff;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgb(236, 243, 255);
  border: 1px solid #465fff;
  margin-top: 4px;
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 12px;
`;

export const Sentinel = styled.div`
  height: 1px;
`;
