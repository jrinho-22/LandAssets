import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useWishList from "../../../hooks/crudApis/useWishList";
import IPlot from "../../../interfaces/IPlot";
import ModalBuyPlot from "../../plot/modals/modalBuyPlot/ModalBuyPlot";
import ModalPayPlot from "../modals/modalPayPlot";
import ModalPlotDetail from "../modals/modalPlotDetail";
import ModalPlotRemove from "../modals/modalPlotRemove";
import { ActionsWrapper, Wrapper } from "./Subheader.styled";

interface ISubheader {
  title: String;
  removeButton?: Boolean;
  plotDetailButton?: Boolean;
  shareButton?: Boolean;
  buyNowButton?: Array<string> | null;
  payNowButton?: Array<string> | null;
  activeChecked: Array<IPlot>;
}

const Subheader: React.FC<ISubheader> = (props: any) => {
  const modalWisthList = useWishList();
  const checkDisabled = (
    allowedStatus: Array<string>,
    allowedMany?: Boolean
  ) => {
    allowedMany = allowedMany || false;
    return !allowedMany
      ? props.activeChecked.length &&
          props.activeChecked.every((v: any) =>
            allowedStatus.includes(v.status)
          )
      : props.activeChecked.length == 1 &&
          props.activeChecked.every((v: any) =>
            allowedStatus.includes(v.status)
          );
  };

  const [modalPayPlotVisibility, setModalPayPlotVisibility] = useState(false);
  const [modalBuyPlotVisibility, setModalBuyPlotVisibility] = useState(false);
  const [modalPlotDetailVisibility, setModalPlotDetailVisibility] =
    useState(false);
  const [modalPlotRemoveVisibility, setModalPlotRemoveVisibility] =
    useState(false);

  return (
    <>
      <ModalPayPlot
        plots={props.activeChecked}
        setModalVisibility={setModalPayPlotVisibility}
        open={modalPayPlotVisibility}
      />
      <ModalBuyPlot
        plot={props.activeChecked[0]?.plot}
        setModalBuyPlotVisibility={setModalBuyPlotVisibility}
        open={modalBuyPlotVisibility}
      />
      <ModalPlotDetail
        plot={props.activeChecked}
        setModalVisibility={setModalPlotDetailVisibility}
        open={modalPlotDetailVisibility}
      />
      <ModalPlotRemove
        modal={modalWisthList}
        plot={props.activeChecked}
        setModalVisibility={setModalPlotRemoveVisibility}
        open={modalPlotRemoveVisibility}
      />
      <Wrapper>
        <Typography
          sx={{
            fontWeight: "800",
            fontSize: "20px"
          }}
        >
          {props.title}
        </Typography>
        <ActionsWrapper>
          {props.removeButton && (
            <button
              onClick={() => setModalPlotRemoveVisibility(true)}
              disabled={!props.activeChecked.length}
            >
              <Typography variant="h6">Remove</Typography>
            </button>
          )}
          {props.plotDetailButton && (
            <button
              onClick={() => setModalPlotDetailVisibility(true)}
              disabled={!props.activeChecked.length}
            >
              <Typography variant="h6">Plot Detail</Typography>
            </button>
          )}
          {props.shareButton && (
            <button disabled={!props.activeChecked.length}>
              <Typography variant="h6">Share</Typography>
            </button>
          )}
          {props.buyNowButton && (
            <button
              onClick={() => setModalBuyPlotVisibility(true)}
              disabled={!checkDisabled(props.buyNowButton, true)}
            >
              <Typography variant="h6">Buy Now</Typography>
            </button>
          )}
          {props.payNowButton && (
            <button
              onClick={() => setModalPayPlotVisibility(true)}
              disabled={!checkDisabled(props.payNowButton)}
            >
              <Typography variant="h6">Pay now</Typography>
            </button>
          )}
        </ActionsWrapper>
      </Wrapper>
    </>
  );
};

Subheader.defaultProps = {
  removeButton: false,
  plotDetailButton: false,
  shareButton: false,
  buyNowButton: null,
  payNowButton: null
};

export default Subheader;
