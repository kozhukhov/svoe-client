import React from 'react';
import { HtmlContent } from 'theme/components/HtmlContent';
import { Label, Variant } from 'theme/components/Label';
import { Headline } from 'theme/components/Typography';

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
      {title &&
        (typeof title === 'string' ? (
          <Headline
            level={3}
            marginBottom="8px"
            textAlign={center ? 'center' : 'left'}
          >
            <HtmlContent html={title} textAlign={center ? 'center' : 'left'} />
          </Headline>
        ) : (
          <Headline
            level={3}
            marginBottom="8px"
            textAlign={center ? 'center' : 'left'}
          >
            {title}
          </Headline>
        ))}
      {description && (
        <Styled.Description $center={center}>
          <HtmlContent
            html={description}
            textAlign={center ? 'center' : 'left'}
          />
        </Styled.Description>
      )}
      {content && content}
    </Styled.SectionInfo>
  );
};
