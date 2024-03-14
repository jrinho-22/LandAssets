import { useEffect, useState } from "react";
import Subheader from "./subheader/Subheader";
import Table from "./Table";
import User from "../../pages/user/userUtils/User";
import { TableContainer } from "./Table.styled";
import IPlot from "../../interfaces/IPlot";

interface IUserTable {
  header: Array<Object>;
  items: Array<Object>;
  title: string;
  style?: Object;
  removeButton?: Boolean;
  plotDetailButton?: Boolean;
  shareButton?: Boolean;
  buyNowButton?: Array<string> | null;
  payNowButton?: Array<string> | null;
}

const UserTable: React.FC<IUserTable> = (props: any) => {
  const [activeChecked, setActiveChecked] = useState<IPlot[]>([]);

  return (
    <User>
      <TableContainer>
        <Subheader
          payNowButton={props.payNowButton}
          buyNowButton={props.buyNowButton}
          shareButton={props.shareButton}
          plotDetailButton={props.plotDetailButton}
          removeButton={props.removeButton}
          title={props.title}
          activeChecked={activeChecked}
        />
        <Table
          loading={props.loading}
          activeChecked={activeChecked}
          setActiveChecked={setActiveChecked}
          items={props.items}
          header={props.header}
          style={props.style}
        />
      </TableContainer>
    </User>
  );
};

UserTable.defaultProps = {
  removeButton: false,
  plotDetailButton: false,
  shareButton: false,
  buyNowButton: null,
  payNowButton: null,
  title: "",
  items: [],
  header: [],
  style: { marginTop: "30px" }
};

export default UserTable;
