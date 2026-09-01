import styled from 'styled-components';

import { TextAlign } from 'theme/components/Typography/types';

type Props = {
  html: string;
  textAlign?: TextAlign;
  className?: string;
};

const Content = styled.div<{ $textAlign: TextAlign }>`
  text-align: ${({ $textAlign }) => $textAlign};

  p {
    margin: 0 0 0.5em;

    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    color: #3f8f4a;
    text-decoration: underline;
  }
`;

export const HtmlContent = ({
  html,
  textAlign = 'left',
  className,
}: Props) => {
  if (!html) return null;

  return (
    <Content
      $textAlign={textAlign}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
