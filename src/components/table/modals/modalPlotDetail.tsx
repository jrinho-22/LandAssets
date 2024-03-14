import { Modal, TextField } from "@mui/material";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import IUserPlot from "../../../interfaces/IUserPlot";
import IWishList from "../../../interfaces/IWishList";
import Carousel from "../../carousel/Carousel";
import FormGrid, { FormItem, FormRow } from "../../formGrid/FormGrid";
import { ModalBox } from "../../plot/modals/Modal.styled";
import theme from "../../../styles/CustomizingTheme";
import NumericFormatCustom from "../../inputs/NumberFormat";

const modalPayPlot = (props: {
  plot: IWishList[] | IUserPlot[];
  open: boolean;
  setModalVisibility: Function;
}) => {
  return (
    <Modal onClose={() => props.setModalVisibility(false)} open={props.open}>
      <ModalBox style={{ width: "800px" }}>
        <FormGrid title="PLOT DETAIL" style={{ marginTop: "-10px" }}>
          <Carousel
            direction={"row"}
            forwardButton={
              <ArrowForwardIosOutlinedIcon
                fontSize="small"
                style={{
                  padding: "10px",
                  backgroundColor: "rgb(223 251 239)",
                  borderRadius: "100%",
                  margin: "auto 20px auto 10px",
                  color: theme.palette.secondary.dark
                }}
              />
            }
            backButton={
              <ArrowBackIosOutlinedIcon
                fontSize="small"
                style={{
                  margin: "auto 20px auto 0px",
                  padding: "10px",
                  borderRadius: "100%",
                  color: theme.palette.secondary.dark,
                  backgroundColor: "rgb(223 251 239)"
                }}
              />
            }
            length={props.plot.length}
          >
            {props.plot.map((v: IWishList | IUserPlot) => {
              return (
                <div>
                  <FormRow style={{ marginTop: "0px", marginLeft: "-24px" }}>
                    <FormItem col="3">
                      <TextField
                        size="small"
                        color="secondary"
                        variant="outlined"
                        label="plot Number"
                        fullWidth
                        disabled
                        value={
                          typeof (v as IWishList).plot == "object"
                            ? (v as IWishList).plot.number
                            : (v as IUserPlot).plotNo
                        }
                      />
                    </FormItem>
                    <FormItem col="4">
                      <TextField
                        size="small"
                        color="secondary"
                        variant="outlined"
                        label="Estate"
                        fullWidth
                        disabled
                        value={
                          typeof (v as IWishList).plot == "object"
                            ? (v as IWishList).plot.estate
                            : (v as IUserPlot).estate
                        }
                      />
                    </FormItem>
                    <FormItem col="4">
                      <TextField
                        size="small"
                        color="secondary"
                        variant="outlined"
                        label="Size"
                        fullWidth
                        disabled
                        value={
                          typeof (v as IWishList).plot == "object"
                            ? (v as IWishList).plot.size
                            : (v as IUserPlot).size
                        }
                      />
                    </FormItem>
                    <FormItem col="4">
                      <TextField
                        size="small"
                        color="secondary"
                        variant="outlined"
                        label="Price"
                        InputProps={{
                          inputComponent: NumericFormatCustom
                        }}
                        fullWidth
                        disabled
                        value={
                          typeof (v as IWishList).plot == "object"
                            ? (v as IWishList).plot.totalCashPrice
                            : (v as IUserPlot).price
                        }
                      />
                    </FormItem>
                    <FormItem col="4">
                      <TextField
                        size="small"
                        color="secondary"
                        variant="outlined"
                        label="Down Payment"
                        fullWidth
                        InputProps={{
                          inputComponent: NumericFormatCustom
                        }}
                        disabled
                        value={
                          typeof (v as IWishList).plot == "object"
                            ? (v as IWishList).plot.firstInstallment
                            : (v as IUserPlot).downPayment
                        }
                      />
                    </FormItem>
                    <FormItem col="4">
                      <TextField
                        size="small"
                        color="secondary"
                        variant="outlined"
                        label="Price Per SQM"
                        fullWidth
                        disabled
                        InputProps={{
                          inputComponent: NumericFormatCustom
                        }}
                        value={
                          typeof (v as IWishList).plot == "object"
                            ? (v as IWishList).plot.pricePerSQM
                            : (v as IUserPlot).pricePerSQM
                        }
                      />
                    </FormItem>
                  </FormRow>
                </div>
              );
            })}
          </Carousel>
        </FormGrid>
      </ModalBox>
    </Modal>
  );
};

export default modalPayPlot;
