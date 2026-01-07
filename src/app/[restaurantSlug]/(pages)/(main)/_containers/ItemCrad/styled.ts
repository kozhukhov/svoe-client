import styled from 'styled-components';
import { Paragraph } from 'theme/components/Typography';

export const Card = styled.div`
  border-radius: 16px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

export const Image = styled.img`
  width: 100%;
  scale: 1/1;
  object-fit: cover;
  border-radius: 16px;
`;

export const Description = styled(Paragraph).attrs({
  level: 2,
})`
  line-height: 20px;
`;

export const Price = styled(Paragraph).attrs({
  fontWeight: 700,
})``;

export const Info = styled.div`
  padding: 0px 16px 16px;
`;
