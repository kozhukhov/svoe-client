import styled, { css } from 'styled-components';

export const SectionInfo = styled.div<{
  $maxWidth?: string;
  $center?: boolean;
}>`
  max-width: ${({ $maxWidth }) => $maxWidth};

  ${({ $center }) =>
    $center &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: auto;
    `}

  margin-bottom: 48px;

  ${({ theme: { media } }) => css`
    ${media.tablet} {
      margin-bottom: 24px;
    }
  `}
`;
