import {
  FormControlLabel,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  TextField
} from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import React, { useEffect, useState } from "react";
import useValidation, {
  required,
  requiredIf
} from "../../../../hooks/useValidation";
import FormGrid, { FormItem, FormRow } from "../../../formGrid/FormGrid";
import { TextHeader } from "../../../formGrid/textHeader/TextHeader";
import { ModalBox } from "../Modal.styled";
import OrderSummary from "./OrderSummary";
import usePlotsUser from "../../../../hooks/crudApis/usePlotsUser";
import NumericFormatCustom from "../../../inputs/NumberFormat";

const CreditCardFields = (props: any) => {
  return (
    <FormRow>
      <FormItem col="5">
        <TextField
          required
          error={!props.validation.number}
          onChange={(e) => {
            props.setRecord((prev: any) => ({
              ...prev,
              creditCard: {
                ...prev.creditCard,
                number: e.target.value
              }
            }));
          }}
          size="small"
          color="secondary"
          variant="outlined"
          type="number"
          label="Credit card number"
          fullWidth
          value={props.record.number}
        />
      </FormItem>
      <FormItem col="3">
        <TextField
          required
          error={!props.validation.expiration}
          onChange={(e) => {
            props.setRecord((prev: any) => ({
              ...prev,
              creditCard: {
                ...prev.creditCard,
                expiration: e.target.value
              }
            }));
          }}
          value={props.record.expiration}
          size="small"
          color="secondary"
          variant="outlined"
          type="number"
          label="Expiration date"
          fullWidth
        />
      </FormItem>
      <FormItem col="2">
        <TextField
          required
          error={!props.validation.cvv}
          onChange={(e) => {
            props.setRecord((prev: any) => ({
              ...prev,
              creditCard: {
                ...prev.creditCard,
                cvv: e.target.value
              }
            }));
          }}
          size="small"
          color="secondary"
          variant="outlined"
          type="number"
          label="CVV"
          fullWidth
          value={props.record.cvv}
        />
      </FormItem>
    </FormRow>
  );
};

const ModalBuyPlot = (props: any) => {
  const modelBuyPlot = usePlotsUser();

  type RecordType = {
    creditCard: {
      number: string;
      expiration: string;
      cvv: string;
    };
    plotId: null | number;
    paymentMethod: string;
    installments: null | number;
    firstInstallment: null | number;
    totalPrice: null | number;
    monthlyPayment: null | number;
    estimatedTax: null | number;
    platformFee: null | number;
    number: string;
    estate: string;
    size: string;
  };

  const emptyRecord = {
    creditCard: {
      number: "",
      expiration: "",
      cvv: ""
    },
    plotId: null,
    paymentMethod: "finance",
    installments: null,
    firstInstallment: null,
    totalPrice: null,
    monthlyPayment: null,
    estimatedTax: null,
    platformFee: null,
    pricePerSQM: "",
    number: "",
    estate: "",
    size: ""
  };

  const [record, setRecord] = useState<RecordType>(emptyRecord);
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderSummaryRows, setOrderSummaryRows] = useState<
    Array<{ description: string; value: number | null }>
  >([]);

  useEffect(() => {
    console.log(record, "receccece");
  }, [record]);

  //load Plot values
  useEffect(() => {
    console.log("runn", props.open, props.plot);
    if (props.plot) {
      setRecord((prev) => ({
        ...prev,
        size: props.plot.size,
        pricePerSQM: props.plot.pricePerSQM,
        plotId: props.plot.id,
        number: props.plot.number,
        estate: props.plot.estate,
        totalPrice: props.plot.totalPartialPaymentPrice,
        estimatedTax: 100,
        platformFee: 100,
        firstInstallment: props.plot.firstInstallment
      }));
    }
  }, [props.open, props.plot]);

  useEffect(() => {
    setRecord((prev) => ({
      ...prev,
      totalPrice: props.plot
        ? record.paymentMethod == "finance"
          ? props.plot.totalPartialPaymentPrice
          : props.plot.totalCashPrice
        : undefined,
      monthlyPayment:
        (prev.totalPrice! - prev.firstInstallment!) / prev.installments!
    }));

    if (record.paymentMethod == "finance") {
      setOrderSummaryRows([
        {
          description: "Total Plot Price",
          value: record.totalPrice
        },
        {
          description: "Installments",
          value: record.installments
        },
        {
          description: "Monthly Payment",
          value: record.monthlyPayment
        },
        {
          description: "First Payment",
          value: record.firstInstallment
        },
        {
          description: "Estimated Tax ",
          value: record.estimatedTax
        },
        {
          description: "Platform fee ",
          value: record.platformFee
        },
        {
          description: "-----------------------------------------------------",
          value: null
        },
        {
          description: "Starting Payment",
          value:
            record.platformFee! +
            record.estimatedTax! +
            record.firstInstallment!
        }
      ]);
    } else if (record.paymentMethod == "cash") {
      setOrderSummaryRows([
        {
          description: "Total Plot Price",
          value: record.totalPrice
        },
        {
          description: "Estimated Tax ",
          value: record.estimatedTax
        },
        {
          description: "Platform fee ",
          value: record.platformFee
        },
        {
          description: "-----------------------------------------------------",
          value: null
        },
        {
          description: "Total",
          value:
            // record.platformFee &&
            // record.totalPrice &&
            // record.estimatedTax &&
            record.platformFee! + record.totalPrice! + record.estimatedTax!
        }
      ]);
    }
  }, [
    record.totalPrice,
    record.paymentMethod,
    record.installments,
    record.firstInstallment,
    record.monthlyPayment
  ]);

  const { validationUtils, validationForm } = useValidation(record, {
    creditCard: {
      number: required(record.creditCard.number),
      expiration: required(record.creditCard.expiration),
      cvv: required(record.creditCard.cvv)
    },
    installments: requiredIf(
      record.paymentMethod == "finance",
      record.installments
    ),
    firstInstallment: requiredIf(
      record.paymentMethod == "finance",
      record.firstInstallment
    )
  });

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecord((prev) => ({
      ...prev,
      paymentMethod: event.target.value
    }));
  };

  const modalCloseHandler = () => {
    setRecord(emptyRecord);
    setOrderSummary(false);
    props.setModalBuyPlotVisibility(false);
    validationUtils.resetForm();
  };
  return (
    <Modal onClose={() => modalCloseHandler()} open={props.open}>
      <ModalBox style={{ width: "800px" }}>
        {orderSummary == false ? (
          <FormGrid
            validationUtils={validationUtils}
            title="PLOT PURCHASE"
            actionButton="continue to checkout"
            customAction={() => setOrderSummary(true)}
          >
            <FormRow>
              <FormItem col="4">
                <TextField
                  size="small"
                  color="secondary"
                  variant="outlined"
                  label="Estate"
                  fullWidth
                  disabled
                  value={record.estate}
                />
              </FormItem>
              <FormItem col="2">
                <TextField
                  size="small"
                  color="secondary"
                  variant="outlined"
                  label="Plot N."
                  fullWidth
                  disabled
                  value={record.number}
                />
              </FormItem>
              <FormItem col="4">
                <RadioGroup
                  onChange={handleRadioChange}
                  value={record.paymentMethod}
                  defaultValue="finance"
                  row
                >
                  <FormControlLabel
                    value="finance"
                    control={<Radio color="secondary" />}
                    label="Finance"
                  />
                  <FormControlLabel
                    control={<Radio color="secondary" />}
                    value="cash"
                    label="Cash"
                  />
                </RadioGroup>
              </FormItem>
            </FormRow>
            {record.paymentMethod == "finance" ? (
              <>
                <TextHeader title="Insnatallment PLan" />
                <FormRow>
                  <FormItem col="4">
                    <TextField
                      disabled
                      InputProps={{
                        inputComponent: NumericFormatCustom
                      }}
                      error={!validationForm.firstInstallment}
                      // onChange={(e) =>
                      //   setRecord((prev) => ({
                      //     ...prev,
                      //     firstInstallment: Number(e.target.value)
                      //   }))
                      // }
                      value={record.firstInstallment}
                      size="small"
                      color="secondary"
                      variant="outlined"
                      label="Down Payment"
                      fullWidth
                    />
                  </FormItem>
                  <FormItem col="3">
                    <TextField
                      error={!validationForm.installments}
                      onChange={(e) =>
                        setRecord((prev) => ({
                          ...prev,
                          installments: Number(e.target.value)
                        }))
                      }
                      value={record.installments}
                      type="number"
                      size="small"
                      color="secondary"
                      variant="outlined"
                      label="Number of Payments"
                      fullWidth
                    />
                  </FormItem>
                </FormRow>
                <CreditCardFields
                  setRecord={setRecord}
                  validation={validationForm.creditCard}
                  record={record.creditCard}
                />
              </>
            ) : (
              <>
                <TextHeader title="Cash Payment" />
                <CreditCardFields
                  record={record.creditCard}
                  setRecord={setRecord}
                  validation={validationForm.creditCard}
                />
              </>
            )}
          </FormGrid>
        ) : (
          <>
            <IconButton style={{ marginTop: "-10px" }} size="small">
              <ArrowBackIosOutlinedIcon
                style={{
                  borderRadius: "100%"
                }}
                onClick={() => {
                  setOrderSummary(false);
                  // setformSubmitted(false);
                }}
              />
            </IconButton>
            <FormGrid
              validationUtils={validationUtils}
              actionButton="BUY PLOT"
              title="PLOT PURCHASE"
              style={{ marginTop: "-10px" }}
              model={modelBuyPlot}
              record={record}
            >
              <FormRow>
                <FormItem col="6">
                  <OrderSummary rows={orderSummaryRows} />
                </FormItem>
              </FormRow>
            </FormGrid>
          </>
        )}
      </ModalBox>
    </Modal>
  );
};

export default ModalBuyPlot;
