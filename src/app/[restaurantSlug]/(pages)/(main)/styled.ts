import styled from 'styled-components';

export const Categories = styled.div`
  display: flex;
  gap: 8px;
  margin: 0px -20px;
  padding: 0px 20px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CategoryCard = styled.div`
  border-radius: 10px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  padding: 4px 8px;
`;
