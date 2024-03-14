import styled from "styled-components";

export const TableStyled = styled.table`
  background-color: white;
  border-collapse: collapse;
  width: 100%;
  font-family: sans-serif;

  .Mui-checked {
    color: #32b14d !important ;
  }

  tr {
    border-top: 1px solid #a5a5a5;
    border-bottom: 1px solid #a5a5a5;
    padding: 30px;
    height: 55px;
  }

  thead {
    background-color: #e8e4e4;

    th {
      font-size: 15px;
      text-shadow: 0 0 #051a30;
      color: #051a30;
      text-align: center;
    }

    th:first-child {
      width: 5%;
    }

    tr {
      height: 30px;
    }
  }

  tbody {
    td {
      text-align: center;
      font-size: 14px;
    }
  }
`;

export const TableRow = styled.tr<{ active: boolean }>`
  color: ${({ active }) => (!active ? "#959595" : "#32b14d")};
`;

export const Status = styled.div<{ status: String }>`
  border: 2px solid;
  /* width: 90px; */
  min-width: 70px;
  font-size: 14px;
  letter-spacing: 0.3px;
  display: inline-block;
  /* margin: 2px 5px; */
  padding: 2px 6px;
  text-align: center;
  ${({ status }) => {
    switch (status) {
      case "pending":
        return `
        border-color: #ff9921
        `;
      case "overDue":
        return `
        border-color: #fe6060
        `;
      case "sold":
        return `
        border-color: #fe6060
        `;
      case "paid":
        return `
        border-color: #39b54a
        `;
      case "available":
        return `
        border-color: #39b54a
        `;
      case "fullyPaid":
        return `
        border-color: #236d14
        `;
      default:
        return `
        border-color: gray
        `;
    }
  }};
  span {
    color: #959595;
  }
`;

//userTable
export const TableContainer = styled.div`
  padding: 50px 60px 80px;
  background-color: white;
  border-radius: 15px;
`;
