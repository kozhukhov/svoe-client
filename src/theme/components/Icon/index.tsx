import { FC, ReactElement } from 'react';
import styled from 'styled-components';

export const BaseIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  color: #3f8f4a;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
  background: rgba(63, 143, 74, 0.08);
`;

type Props = {
  icon: ReactElement;
};

export const Icon: FC<Props> = ({ icon }) => {
  return <BaseIcon>{icon}</BaseIcon>;
};
