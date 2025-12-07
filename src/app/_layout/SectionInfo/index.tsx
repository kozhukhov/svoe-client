import React from 'react';
import { Label, Variant } from 'theme/components/Label';
import { Headline, Paragraph } from 'theme/components/Typography';

import * as Styled from './styled';

export const SectionInfo = ({
  title,
  description,
  label,
  maxWidth,
  center,
  content,
  ...props
}: {
  title?: React.ReactNode | string;
  description?: string;
  label?: string;
  maxWidth?: string;
  center?: boolean;
  content?: React.ReactNode;
}) => {
  return (
    <Styled.SectionInfo $center={center} $maxWidth={maxWidth} {...props}>
      {label && (
        <Label marginBottom="6px" text={label} variant={Variant.PRIMARY} />
      )}
      {title && (
        <Headline
          level={3}
          marginBottom="8px"
          textAlign={center ? 'center' : 'left'}
        >
          {title}
        </Headline>
      )}
      {description && (
        <Paragraph
          level={1}
          marginBottom="16px"
          textAlign={center ? 'center' : 'left'}
        >
          {description}
        </Paragraph>
      )}
      {content && content}
    </Styled.SectionInfo>
  );
};
