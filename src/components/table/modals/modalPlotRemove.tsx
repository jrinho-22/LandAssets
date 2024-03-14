import { Modal, Typography } from "@mui/material";
import { useEffect } from "react";
import IWishList from "../../../interfaces/IWishList";
import { ModalBox } from "../../plot/modals/Modal.styled";
import theme from "../../../styles/CustomizingTheme";

const modalPayPlot = (props: {
  modal: { post: Function; get: Function; del: Function };
  plot: IWishList[];
  open: boolean;
  setModalVisibility: Function;
}) => {
  useEffect(() => {
    if (props.open) {
      const ids = props.plot.map((plot: IWishList) => plot.id);
      props.modal.del(ids);
    }
  }, [props.open]);

  const closeHandler = () => {
    props.setModalVisibility(false), window.location.reload();
  };

  return (
    <Modal onClose={() => closeHandler()} open={props.open}>
      <ModalBox style={{ width: "800px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.secondary.main,
              fontWeight: "600",
              fontSize: "13px"
            }}
          >
            Plots susccessfuly removed from Wish List!
          </Typography>
        </div>
      </ModalBox>
    </Modal>
  );
};

export default modalPayPlot;
