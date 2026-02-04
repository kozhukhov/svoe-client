import styled, { css } from 'styled-components';

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
`;

export const Card = styled.div`
  background: #ffffff;
  border: 1px solid #eef2f7;
  border-radius: 16px;
  padding: 12px;
  box-shadow: 0 8px 20px rgba(16, 24, 40, 0.05);
`;

export const CardTitle = styled.div`
  margin-bottom: 10px;
`;

export const FieldsGrid = styled.div<{ $cols?: 1 | 2 }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols ?? 1}, minmax(0, 1fr));
  gap: 10px;
`;

export const InlineInfo = styled.div`
  background: #f8fafc;
  border: 1px solid #eef2f7;
  border-radius: 14px;
  padding: 12px;
`;

export const OrderGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 420px;
  gap: 12px;
  align-items: start;

  ${({ theme: { media } }) => css`
    ${media.tablet} {
      grid-template-columns: 1fr;
    }
  `}
`;

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;

  > :last-child {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
  }
`;

export const UpsellGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  ${({ theme: { media } }) => css`
    ${media.mobile} {
      grid-template-columns: 1fr;
    }
  `}
`;

export const UpsellItem = styled.button`
  appearance: none;
  border: none;
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  gap: 10px;
  border: 1px solid #eef2f7;
  background: #ffffff;
  border-radius: 16px;
  padding: 10px;
  text-align: left;
  cursor: pointer;
  transition:
    transform 120ms ease,
    box-shadow 120ms ease;

  &:hover {
    box-shadow: 0 8px 18px rgba(16, 24, 40, 0.08);
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: 2px solid rgba(63, 143, 74, 0.45);
    outline-offset: 2px;
  }
`;

export const UpsellImage = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  object-fit: cover;
  background: #f3f4f6;
`;

export const UpsellContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

export const UpsellBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Accordion = styled.div`
  background: #ffffff;
  border: 1px solid #eef2f7;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(16, 24, 40, 0.05);
`;

export const AccordionSummary = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
`;

export const AccordionContent = styled.div`
  padding: 0 12px 12px;
`;

export const SummaryBar = styled.div`
  position: sticky;
  bottom: 12px;
  z-index: 20;
  margin-top: 12px;
`;

export const SummaryBarCard = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid #eef2f7;
  border-radius: 16px;
  padding: 12px;
  box-shadow: 0 14px 30px rgba(16, 24, 40, 0.12);
  backdrop-filter: blur(10px);
`;

export const SummaryBarInner = styled.div`
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 12px;
  align-items: center;

  ${({ theme: { media } }) => css`
    ${media.mobile} {
      grid-template-columns: 1fr;
    }
  `}
`;

export const SummaryBarTotals = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;
