import styled from "styled-components";

export const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 6px;
  box-shadow: 24;
  padding: 30px;
  box-sizing: border-box;
  max-height: 550px;
  overflow: auto;

  .horizontal-line {
    border-bottom: 1px solid #939393;
    margin-bottom: 20px;
  }

  .flex {
    display: flex;
  }

  p {
    margin-bottom: 20px;
    color: black;
    font-weight: 800;
  }
`;

// BuyPlot
export const OrderSummary = styled.div`
  .order-summary-row {
    display: flex;
    justify-content: space-between;
    line-height: 24px;
  }

  span {
    font-family: Averta;
  }
`;
