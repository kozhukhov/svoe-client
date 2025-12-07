import { FC } from 'react';

import LogoIcon from './assets/logo.png';
import * as Styled from './styled';

type Props = {
  small?: boolean;
};

export const Logo: FC<Props> = ({ small = false }) => {
  return (
    <Styled.Wrapper $small={small} href="/">
      <Styled.Logo alt="Logo" src={LogoIcon.src} />
    </Styled.Wrapper>
  );
};
