import { FC, ReactElement } from 'react';

import { Icon } from '../Icon';
import { Headline, Paragraph } from '../Typography';

import * as Styled from './styled';

type Props = {
  icon: ReactElement;
  name: string;
  value: string;
  note: string;
};

export const InfoCard: FC<Props> = ({ icon, name, value, note }) => {
  return (
    <Styled.Card>
      <Styled.Header>
        <Icon icon={icon} />
        <Paragraph fontWeight={700} level={2} marginBottom="4px">
          {name}
        </Paragraph>
      </Styled.Header>
      <Paragraph fontWeight={700} level={1} marginBottom="4px">
        {value}
      </Paragraph>
      <Paragraph level={2}>{note}</Paragraph>
    </Styled.Card>
  );
};
