import { useEffect, useState } from "react";
import IEstate from "../../../interfaces/IEstate";
import NumericFormatCustom from "../../inputs/NumberFormat";
import StyledTextField from "./BaseTextField";

const EstateFields = (props: any) => {
  const [record, setRecord] = useState<IEstate>(props.activeEstate);

  useEffect(() => {
    setRecord(props.activeEstate);
  }, [props.activeEstate]);

  return (
    <>
      <StyledTextField label="Estate name:" value={record.name} />
      <StyledTextField label="Estate Size:" value={record.size} />
      <StyledTextField
        label="Number of plots available"
        value={record.plotsAvailable}
      />
      <StyledTextField label="Population" value={record.population} />
      <StyledTextField label="Conties" value={record.counties} />
      <StyledTextField label="Payment term:" value={record.paymentTerm} />
      <StyledTextField
        label="Average price Per SQM :"
        InputProps={{
          inputComponent: NumericFormatCustom
        }}
        value={record.averagePricePerSQM}
      />
      <StyledTextField
        InputProps={{
          inputComponent: NumericFormatCustom
        }}
        label="Average partial payment price:"
        value={record.averagePartialPaymentPrice}
      />
    </>
  );
};

export default EstateFields;
