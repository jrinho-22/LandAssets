import { Modal, TextField, Typography } from "@mui/material";
import { Button } from "../../buttons/Buttons";
import { ModalBox } from "./Modal.styled";

const ModalBookVisit = (props: any) => {
  // props.
  return (
    <Modal
      onClose={() => props.setModalBookVisitVisibility(false)}
      open={props.open}
    >
      <ModalBox style={{ width: "800px" }}>
        <Typography>BOOK SITE VISIT</Typography>
        <div className="horizontal-line"></div>
        <div className="flex" style={{ justifyContent: "space-around" }}>
          <TextField
            sx={{ mr: "10px" }}
            color="secondary"
            variant="standard"
            label="Estate name"
            fullWidth
          />
          <TextField
            sx={{ ml: "10px" }}
            color="secondary"
            variant="standard"
            label="Select Date"
            fullWidth
          />
          {/* <Button onClick={handleClose}>Close Child Modal</Button> */}
        </div>
        <div
          className="flex"
          style={{ marginTop: "25px", flexDirection: "row-reverse" }}
        >
          <Button
            type="filled"
            bg={props.theme.palette.primary.dark}
            border={props.theme.palette.primary.main}
          >
            Book Now
          </Button>
        </div>
      </ModalBox>
    </Modal>
  );
};

export default ModalBookVisit;
