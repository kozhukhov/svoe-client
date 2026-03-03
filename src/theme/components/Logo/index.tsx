import { FC } from 'react';

import { useActiveRestaurant } from 'modules/restaurant/hooks';

import LogoIcon from './assets/logo.png';
import * as Styled from './styled';

type Props = {
  small?: boolean;
};

export const Logo: FC<Props> = ({ small = false }) => {
  const { activeRestaurant } = useActiveRestaurant();

  return (
    <Styled.Wrapper $small={small} href={`/${activeRestaurant?.slug}`}>
      <Styled.Logo alt="Logo" src={LogoIcon.src} />
    </Styled.Wrapper>
  );
};
