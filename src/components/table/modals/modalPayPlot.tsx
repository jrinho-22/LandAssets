import { Modal } from "@mui/material";
import usePlotUser from "../../../hooks/crudApis/usePlotsUser";
import IUserPlot from "../../../interfaces/IUserPlot";
import FormGrid, { FormItem, FormRow } from "../../formGrid/FormGrid";
import { ModalBox } from "../../plot/modals/Modal.styled";
import OrderSummary from "../../plot/modals/modalBuyPlot/OrderSummary";

const modalPayPlot = (props: {
  plots: IUserPlot[];
  open: boolean;
  setModalVisibility: Function;
}) => {
  const modelPayPlot = usePlotUser();

  const orderSummaryRows = (plots: IUserPlot[]) => {
    let total = 0;
    var maped = plots.flatMap((plot: any) => {
      total = total + plot.monthlyPayment;
      return [
        {
          description: "Plot Number",
          value: plot.plotNo
        },
        {
          description: "Installment Price",
          value: plot.monthlyPayment
        },
        {
          description: "-----------------------------------------------------",
          value: null
        }
      ];
    });
    return [...maped, { description: "Total Cost", value: total }];
  };

  const customActionHandler = async () => {
    props.plots.map(async (v: IUserPlot) => {
      await modelPayPlot.put(Number(v.id));
    });
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };

  return (
    <Modal onClose={() => props.setModalVisibility(false)} open={props.open}>
      <ModalBox style={{ width: "800px" }}>
        <FormGrid
          //   validationUtils={validationUtils}
          title="PLOT PAYMENT"
          actionButton="Pay"
          style={{ marginTop: "-10px" }}
          customAction={() => customActionHandler()}
        >
          <FormRow>
            <FormItem col="6">
              <OrderSummary
                title="Payment Summary"
                rows={orderSummaryRows(props.plots)}
              />
            </FormItem>
          </FormRow>
        </FormGrid>
      </ModalBox>
    </Modal>
  );
};

export default modalPayPlot;
