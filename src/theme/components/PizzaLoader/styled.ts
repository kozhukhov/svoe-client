import styled, { css, keyframes } from 'styled-components';

type SliceVariant = 1 | 2 | 3 | 4 | 5;
type PeperoniVariant = 'p1' | 'p2' | 'p3';
type OliveVariant = 'o1' | 'o2' | 'o3' | 'o4' | 'o5' | 'o6' | 'o7';

const slice1 = keyframes`
  0% { opacity: 0; }
  25% { opacity: 1; }
  100% { opacity: 1; }
`;

const slice2 = keyframes`
  0% { opacity: 0; }
  25% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 1; }
`;

const slice3 = keyframes`
  0% { opacity: 0; }
  50% { opacity: 0; }
  75% { opacity: 1; }
  100% { opacity: 1; }
`;

const slice4 = keyframes`
  0% { opacity: 0; }
  75% { opacity: 0; }
  100% { opacity: 1; }
`;

const sliceVariantStyles: Record<SliceVariant, ReturnType<typeof css>> = {
  1: css`
    top: 5%;
    left: 15%;
  `,
  2: css`
    top: 18%;
    left: 33%;
    opacity: 0;
    z-index: 2;
    transform: rotate(72deg);
    animation-name: ${slice1};
  `,
  3: css`
    top: 39%;
    left: 27%;
    opacity: 0;
    transform: rotate(144deg);
    animation-name: ${slice2};
  `,
  4: css`
    top: 38%;
    left: 5%;
    opacity: 0;
    transform: rotate(216deg);
    animation-name: ${slice3};
  `,
  5: css`
    top: 17%;
    left: -3%;
    opacity: 0;
    transform: rotate(288deg);
    animation-name: ${slice4};
  `,
};

const peperoniVariantStyles: Record<PeperoniVariant, ReturnType<typeof css>> = {
  p1: css`
    top: 10%;
    left: 35%;
  `,
  p2: css`
    top: 38%;
    right: 16%;
  `,
  p3: css`
    bottom: 10%;
    left: 26%;
  `,
};

const oliveVariantStyles: Record<OliveVariant, ReturnType<typeof css>> = {
  o1: css`
    top: 10%;
    left: 24%;
    transform: scale(0.6);
  `,
  o2: css`
    top: 26%;
    left: 22%;
    transform: scale(0.7);
  `,
  o3: css`
    top: 42%;
    left: 32%;
    transform: scale(0.5);
  `,
  o4: css`
    top: 55%;
    left: 50%;
  `,
  o5: css`
    bottom: 15%;
    right: 40%;
    transform: scale(0.75);
  `,
  o6: css`
    top: 15%;
    right: 28%;
    transform: scale(0.9);
  `,
  o7: css`
    top: 25%;
    right: 18%;
    transform: scale(0.5);
  `,
};

export const Box = styled.div`
  --cheese: #f7c946;
  --tomato: #d84b2a;
  --crust: #d19952;
  --peperoni: #a2371d;
  --olive: #1d1d1d;

  position: relative;
  width: 200px;
  height: 200px;
  display: block;
  border-radius: 50%;

  @media all and (max-width: 200px) {
    width: 100px;
    height: 100px;
  }
`;

export const Slice = styled.div<{ variant: SliceVariant }>`
  position: absolute;
  width: 65%;
  height: 50%;
  clip-path: polygon(50% 100%, 0 0, 100% 0);
  transform: rotate(0deg);
  border-radius: 50%;
  animation-duration: 0.7s;
  animation-iteration-count: infinite;
  animation-direction: alternate;

  ${({ variant }) => sliceVariantStyles[variant]}
`;

export const Border = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Crust = styled.div`
  position: absolute;
  top: 6%;
  left: 10%;
  width: 80%;
  height: 80%;
  background: var(--crust);
  clip-path: polygon(50% 100%, 0 0, 100% 0);
  border-radius: 50%;
`;

export const Cheese = styled.div`
  position: absolute;
  top: 20%;
  left: 17.5%;
  width: 65%;
  height: 65%;
  background: var(--cheese);
  clip-path: polygon(50% 100%, 0 0, 100% 0);
  border-radius: 50%;
  overflow: hidden;
`;

export const Peperoni = styled.div<{ variant: PeperoniVariant }>`
  position: absolute;
  width: 25%;
  height: 30%;
  border-radius: 50%;
  background: var(--peperoni);

  ${({ variant }) => peperoniVariantStyles[variant]}
`;

export const Olive = styled.div<{ variant: OliveVariant }>`
  position: absolute;
  width: 8%;
  height: 10%;
  background: var(--olive);
  border-radius: 50%;

  ${({ variant }) => oliveVariantStyles[variant]}
`;
