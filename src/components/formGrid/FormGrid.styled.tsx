import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-auto-rows: auto;
  grid-gap: 4%;

  .flex {
    display: flex;
  }
`;
