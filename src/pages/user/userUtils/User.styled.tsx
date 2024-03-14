import styled from "styled-components";

// user
export const FlexContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;

  h1 {
    color: white;
    font-family: sans-serif;
    margin: 5px;
  }

  h1:first-child {
    font-size: 40px;
    font-weight: 800;
  }

  h1:last-child {
    font-weight: 200;
  }
`;

//userMenu
export const FlexContainerRow = styled.div<{ children: any }>`
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  gap: 40px 60px;
  justify-content: center;
`;

export const OptionContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  width: 180px;
  border-radius: 25px;
  flex-direction: column;
  background-color: white;
  box-shadow: -4px 0px 29px -8px rgba(0, 0, 0, 0.68);
  border-bottom: 6px solid #32b14d;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  span {
    font-family: sans-serif;
    color: #313131;
    font-weight: 600;
    font-size: 16px;
    transition: color 0.2s ease-in-out;
  }

  svg {
    font-size: 90px;
  }

  &:hover {
    background-color: #001b2f;

    span {
      color: white;
    }
  }

  div {
    padding: 20px;
    text-align: center;
  }

  img {
    height: 80px;
  }
`;
