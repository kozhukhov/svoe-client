import { FC } from 'react';

import * as Styled from './styled';

type Props = {
  mapLink: string;
};

export const MapWithActions: FC<Props> = ({ mapLink }) => {
  return (
    <Styled.Wrapper>
      <Styled.Frame
        allowFullScreen
        loading="lazy"
        src="https://yandex.by/map-widget/v1/?text=%D0%9B%D0%B8%D0%B4%D0%B0%2C%20%D1%83%D0%BB.%20%D0%9C%D0%B0%D1%88%D0%B5%D1%80%D0%BE%D0%B2%D0%B0%2012"
        title="Лида, ул. Машерова 12 на карте"
      />
      <Styled.Action href={mapLink}>
        Открыть маршрут в Яндекс Картах
      </Styled.Action>
    </Styled.Wrapper>
  );
};
