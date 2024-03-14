import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import IPlot from "../../../interfaces/IPlot";
import NumericFormatCustom from "../../inputs/NumberFormat";
import BaseTextField from "./BaseTextField";

const PLotFields = (props: any) => {
  const [record, setRecord] = useState<IPlot>();

  useEffect(() => {
    setRecord(props.activePlot);
  }, [props.activePlot]);

  return (
    <>
      <BaseTextField label="Plot Number" value={record?.number} />
      <BaseTextField
        label="Total Cash Price"
        InputProps={{
          inputComponent: NumericFormatCustom
        }}
        value={record?.totalCashPrice}
      />
      <BaseTextField
        label="Total Partial Payment Price"
        value={record?.totalPartialPaymentPrice}
        InputProps={{
          inputComponent: NumericFormatCustom
        }}
      />
      <BaseTextField
        label="1st Installment"
        value={record?.firstInstallment}
        InputProps={{
          inputComponent: NumericFormatCustom
        }}
      />
      <BaseTextField label="Plot Size (SQM)" value={record?.size} />
      <BaseTextField
        label="Price/SQM (Cash Sale)"
        InputProps={{ inputComponent: NumericFormatCustom }}
        value={record?.pricePerSQM}
      />
      <BaseTextField
        label="Price/SQM (Partial Payment)"
        InputProps={{
          inputComponent: NumericFormatCustom
        }}
        value={record?.priceSQMPartialPayment}
      />
    </>
  );
};

export default PLotFields;
