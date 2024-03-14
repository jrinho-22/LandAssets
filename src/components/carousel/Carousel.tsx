import { Button } from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import ICarousel from "../../interfaces/ICarousel";
import { Container } from "./Carousel.styled";

const Carousel = forwardRef<CarouselRef, ICarousel>((props, ref) => {
  const [translateProperty, setTranslateProperty] = useState(0);
  const [disableCarouselButton, setDisableCarouselButton] = useState("");

  useEffect(() => {
    if (props.itemsUtils && props.itemsUtils.activeValue) {
      const index = props.itemsUtils.items.findIndex(
        (v: any) => v.id == props.itemsUtils?.activeValue.id
      );

      const value = (100 / props.length) * index;

      setTranslateProperty(value);
    }
  }, [props.itemsUtils?.activeValue]);

  const translatePropertyHandler = (direction: string): void => {
    var value: number;
    if (props.itemsUtils) {
      const index = props.itemsUtils.items.findIndex(
        (v: any) => v.id == props.itemsUtils?.activeValue.id
      );
      direction == "forward"
        ? props.itemsUtils.setActiveValue(props.itemsUtils.items[index + 1])
        : props.itemsUtils.setActiveValue(props.itemsUtils.items[index - 1]);
    }

    if (direction == "forward") {
      value = 100 / props.length;
    } else if (direction == "back") {
      value = -100 / props.length;
    } else {
      value = 0;
    }

    setTranslateProperty((prev: any) => {
      if ((prev + value >= 99 && prev + value <= 101) || prev + value < 0) {
        return prev;
      }
      return prev + value;
    });
  };

  React.useImperativeHandle(ref, () => ({
    translatePropertyHandler: (value: string) => translatePropertyHandler(value)
  }));

  const DefaultButton = (props: { direction: "back" | "forward" }) => {
    return (
      <Button
        // disabled={props.disabled}
        // onClick={props.onClick}
        style={{
          visibility:
            disableCarouselButton == props.direction ? "hidden" : "visible",
          margin: "auto",
          height: "30px"
        }}
        onClick={() => translatePropertyHandler(props.direction)}
      >
        {props.direction}
      </Button>
    );
  };

  useEffect(() => {
    const nextTranslatePropertyValue = translateProperty + 100 / props.length;
    if (nextTranslatePropertyValue >= 99 && nextTranslatePropertyValue <= 101) {
      setDisableCarouselButton("forward");
    } else if (translateProperty == 0) {
      setDisableCarouselButton("back");
    } else {
      setDisableCarouselButton("");
    }

    if (props.length == 1) {
      setDisableCarouselButton("back forward");
    }
  }, [translateProperty]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: props.direction == "column" ? "column" : "row",
        height: "100%",
        width: "100%"
      }}
    >
      {props.backButton && !props.actionTrigger ? (
        <div
          style={{
            cursor: disableCarouselButton.includes("back")
              ? "default"
              : "pointer",
            margin: "auto",
            visibility: disableCarouselButton.includes("back")
              ? "hidden"
              : "visible"
          }}
          onClick={() => translatePropertyHandler("back")}
        >
          {props.backButton}
        </div>
      ) : (
        !props.actionTrigger && <DefaultButton direction="back" />
      )}
      <Container
        direction={props.direction!}
        lenght={props.length}
        translate={translateProperty}
      >
        <div>{props.children}</div>
      </Container>
      {props.forwardButton && !props.actionTrigger ? (
        <div
          style={{
            cursor: disableCarouselButton.includes("forward")
              ? "default"
              : "pointer",
            margin: "auto",
            visibility: disableCarouselButton.includes("forward")
              ? "hidden"
              : "visible"
          }}
          onClick={() => translatePropertyHandler("forward")}
        >
          {props.forwardButton}
        </div>
      ) : (
        !props.actionTrigger && <DefaultButton direction="forward" />
      )}
    </div>
  );
});

Carousel.defaultProps = {
  direction: "row"
};

export interface CarouselRef {
  translatePropertyHandler: (value: "forward" | "back") => void;
}
export default Carousel;
