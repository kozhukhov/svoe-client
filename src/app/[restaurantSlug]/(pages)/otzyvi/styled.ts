import styled from 'styled-components';

export const Reviews = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
`;

export const ReviewCard = styled.div`
  padding: 20px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.04);
`;

export const ReviewHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
`;

export const RatingBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  background: rgb(249, 198, 70);
  color: #fff;
  border-radius: 10px;
  font-weight: 700;
  font-size: 12px;
`;

export const Count = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(249, 198, 70);
  color: #fff;
  padding: 4px 8px;
  border-radius: 10px;
  display: inline-block;
`;
