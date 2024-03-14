import { Modal, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useWishList from "../../../hooks/crudApis/useWishList";
import theme from "../../../styles/CustomizingTheme";
import { Button } from "../../buttons/Buttons";
import { ModalBox } from "./Modal.styled";

const ModalWishList = (props: any) => {
  var wishListRequest: any = useWishList();
  const navigate = useNavigate();

  const saveData = async () => {
    // setIsLoading(true);
    try {
      await wishListRequest.post(props.plot);
    } catch (e) {
      console.error(e);
    }
    // setIsLoading(false);
  };

  useEffect(() => {
    props.open && saveData();
  }, [props.open]);

  return (
    <Modal onClose={() => props.setModalWishList(false)} open={props.open}>
      <ModalBox style={{ width: "800px" }}>
        <Typography>Wish List</Typography>
        <div className="horizontal-line"></div>
        <div className="flex" style={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.secondary.main,
              fontWeight: "600",
              fontSize: "13px"
            }}
          >
            Susccessfuly Added to wish list
          </Typography>
          <Button
            type="filled"
            onClick={() => navigate("/user-wish-list")}
            bg={props.theme.palette.primary.dark}
            border={props.theme.palette.primary.main}
          >
            View Wish List
          </Button>
        </div>
      </ModalBox>
    </Modal>
  );
};

export default ModalWishList;
