import { FC } from 'react';

import * as Styled from './styled';

type Props = {
  mapLink: string;
};

export const MapWithActions: FC<Props> = ({ mapLink }) => {
  console.log('mapLink', mapLink);
  return (
    <Styled.Wrapper>
      <Styled.Frame
        allowFullScreen
        loading="lazy"
        src={mapLink}
        title="Лида, ул. Машерова 12 на карте"
      />
      <Styled.Action newPage href={mapLink}>
        Открыть в Яндекс Картах
      </Styled.Action>
    </Styled.Wrapper>
  );
};
