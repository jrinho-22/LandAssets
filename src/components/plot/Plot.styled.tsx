// import { Container } from "@mui/material";
import styled from "styled-components";
import { useTheme } from "@mui/material";

export const Container = styled.div<{ translate: Boolean }>`
  margin: 0px auto;
  /* width: 1200px; */
  max-width: 1400px;
  width: 90%;
  padding: 1px;
  height: 500px;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: ${(props) => (props.translate ? "88px" : "20px")};
  transition: ${(props) =>
    !props.translate ? "margin-bottom 0.5s ease-in-out" : undefined};

  .containerFooter {
    justify-content: space-around;
    align-items: center;
    flex-grow: 1;
    display: flex;
    gap: 30%;
    height: 100%;
    width: 100%;
  }
`;

export const UpperContainer = styled.div`
  z-index: 1;
  /* height: calc(100% - 30px); */
  height: 102%;
  margin: -2px;
  /* margin: -50px -2px 0; */
  display: flex;
  padding: 50px 20px 40px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 40px;
`;

export const FooterContainer = styled.div<{ translate: Boolean }>`
  /* height: 80px; */
  /* z-index: 6; */
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding-bottom: 19px;
  box-sizing: border-box;
  position: absolute;
  top: 69%;
  right: 0;
  left: 0;
  height: 155px;
  border-radius: 40px;
  background-color: ${() => useTheme().palette.secondary.light};
  transform: translateY(${(props) => (props.translate ? 88 : 0)}px);
  transition: transform 0.7s ease-in-out;
`;

export const EstateMap = styled.div`
  width: 70%;
  box-sizing: border-box;
`;

export const HorizontalLine = styled.div`
  border-left: 2px solid ${() => useTheme().palette.secondary.main}; /* 1px solid black line */
  margin-left: 20px;
`;

export const EstateImgContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  top: 18%;
`;

export const EstateImg = styled.img`
  height: 85%;
  width: 100%;
`;

export const EstateInfo = styled.div`
  width: 30%;
  box-sizing: border-box;
  padding: 10px 50px 10px 20px;
  display: flex;
  flex-direction: column;

  span {
    font-family: sans-serif;
    color: #4d4d4d;
    font-size: 13px;
  }

  //immediately after(+)
  span + * {
    all: unset;
    border-radius: 5px;
    background-color: #ededed;
    margin-left: 15px;
    height: 25px;
    max-width: 23%;
    font-family: sans-serif;
    font-size: 13px;
    padding: 2px 10px;
  }
`;

export const Scrollable = styled.div`
  height: 90%;
  overflow: auto;
  border-radius: 10px;
`;
