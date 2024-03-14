import styled from "styled-components";

export const Container = styled.div<{
  lenght: number;
  translate: number;
  direction: "row" | "column";
}>`
  width: 100%;
  height: 100%;
  overflow: hidden;

  > div {
    width: ${(props) =>
      props.direction == "row" ? props.lenght * 100 : "100"}%;
    height: ${(props) =>
      props.direction == "column" ? props.lenght * 100 : "100"}%;
    display: flex;
    flex-direction: ${(props) => (props.direction == "row" ? "row" : "column")};
    transition: ${(props) =>
      props.direction == "row"
        ? "transform 0.4s ease-in-out"
        : "transform 0.3s ease-in-out"};
    transform: translate(
      -${(props) => (props.direction == "row" ? props.translate : 0)}%,
      -${(props) => (props.direction == "column" ? props.translate : 0)}%
    );

    > div {
      width: calc(
        100% / ${(props) => (props.direction == "row" ? props.lenght : 1)}
      );
      height: calc(
        100% / ${(props) => (props.direction == "column" ? props.lenght : 1)}
      );
      box-sizing: border-box;
      padding: 0 20px;
    }
  }
`;
