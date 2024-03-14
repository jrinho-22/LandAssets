import { Typography } from "@mui/material";
import moneyConverter from "../../../../utils/moneyConverter";

const OrderSummary = ({
  rows,
  ...props
}: {
  title?: string;
  rows: { value: number | null; description: string }[];
}) => {
  return (
    <div>
      <Typography mb={"20px"} fontSize={"17px"} fontWeight={600} variant="h6">
        {props.title ? props.title : "Order Summary"}
      </Typography>
      {rows.map((v: any) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span> {v.description}</span>
            <span> {moneyConverter(v.value)}</span>
          </div>
        );
      })}
    </div>
  );
};

export default OrderSummary;
