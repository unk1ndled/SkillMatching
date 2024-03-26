import React from 'react'
import styled from 'styled-components';

const ListWrapper = (props) => {
  return (
    <OffersWrapper>{props.children}</OffersWrapper>
  )
}

const OffersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Adjust minmax values as needed */
  gap: 15px; /* Adjust gap between grid items */
  margin: 0 auto;
  padding: 20px;
  max-width: 80vw;
  max-height: 70vh; /* Limit the height of the wrapper to the viewport height */
  overflow-y: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 20px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #613dc1;
    border-radius: 20px;
    border: 8px solid transparent;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #6F00EF;
  }
`;

export default ListWrapper