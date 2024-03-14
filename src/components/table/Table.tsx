import { Checkbox, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Status, TableStyled, TableRow } from "./Table.styled";

interface ITable {
  items: Array<Object>;
  header: Array<{ title: String; field: String }>;
  style?: Object | null;
  activeChecked: Object[];
  setActiveChecked: Function;
  loading: boolean;
  // status?: "overDue" | "pending" | "Paid " | null;
}

const Table: React.FC<ITable> = (props: any) => {
  Table.defaultProps = {
    items: [],
    header: [],
    style: null
    // status: "overDue"
  };
  const [headerCheck, setHeaderCheck] = useState(false);

  useEffect(() => {
    !props.activeChecked.length && setHeaderCheck(false);
  }, [props.activeChecked]);

  const headercheckBoxHandler = (e: any) => {
    setHeaderCheck((prev) => !prev);
    e.target.checked
      ? props.setActiveChecked(props.items)
      : props.setActiveChecked([]);
  };

  const checkBoxHandler = (el: any) => {
    if (el && !props.activeChecked.some((v: any) => v.id == el.id)) {
      props.setActiveChecked((prev: any) => [...prev, el]);
    } else if (el && props.activeChecked.some((v: any) => v.id == el.id)) {
      props.setActiveChecked((prev: any) =>
        prev.filter((item: any) => item.id !== el.id)
      );
    }
  };

  const getProperties = (index: number, value: string) => {
    const separatedStrings = value.split(".");
    return separatedStrings[index];
  };

  const getStatusText = (status: String) => {
    switch (status) {
      case "overDue":
        return "Over Due";
        break;
      case "pending":
        return "Pending";
        break;
      case "paid":
        return "Paid";
        break;
      case "available":
        return "Available";
        break;
      case "fullyPaid":
        return "Fully Paid";
        break;
      case "sold":
        return "Sold";
        break;
      default:
        return "Undefined";
    }
  };

  return (
    <>
      {!props.loading ? (
        <TableStyled style={{ ...props.style }}>
          <thead>
            <tr>
              <th>
                <Checkbox
                  checked={props.activeChecked.length && headerCheck}
                  color="secondary"
                  onChange={(e) => headercheckBoxHandler(e)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </th>
              {props.header.map((v: any) => (
                <th>{v.title}</th>
              ))}
              {props.status && <th>Status</th>}
            </tr>
          </thead>
          <tbody>
            {props.items.length ? (
              props.items.map((vItem: any) => {
                return (
                  <TableRow
                    active={props.activeChecked.some(
                      (v: any) => v.id == vItem.id
                    )}
                  >
                    <td>
                      <Checkbox
                        checked={props.activeChecked.some(
                          (v: any) => v.id == vItem.id
                        )}
                        color="secondary"
                        onChange={() => checkBoxHandler(vItem)}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </td>
                    {props.header.map((vHeader: any) =>
                      vHeader.field == "status" ? (
                        <td>
                          <Status status={vItem.status}>
                            <span>{getStatusText(vItem.status)}</span>
                          </Status>
                        </td>
                      ) : vHeader.field.includes(".") ? (
                        <td>
                          {
                            vItem[getProperties(0, vHeader.field)][
                              getProperties(1, vHeader.field)
                            ]
                          }
                        </td>
                      ) : (
                        <td>{vItem[vHeader.field]}</td>
                      )
                    )}
                  </TableRow>
                );
              })
            ) : (
              <td style={{ height: "100px" }} colSpan={props.header.length + 1}>
                No elements
              </td>
            )}
          </tbody>
        </TableStyled>
      ) : (
        <div
          style={{
            height: "200px",
            width: "100%",
            display: "flex"
            // backgroundColor: theme.palette.background.paper
          }}
        >
          <CircularProgress style={{ margin: "auto" }} />
        </div>
      )}
    </>
  );
};

export default Table;
