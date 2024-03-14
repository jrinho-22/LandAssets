import React from "react";
import UserTable from "../../components/table/UserTable";

const UserPlotsResale = () => {
  const items = [
    {
      id: 1,
      plotNo: "37",
      estate: "SP",
      size: "Sqm 528",
      price: "Tsh. 13,000,000",
      dayAdded: "24 November 2023",
      status: "available"
    },
    {
      id: 2,
      plotNo: "37",
      estate: "SP",
      size: "Sqm 528",
      price: "Tsh. 13,000,000",
      dayAdded: "24 November 2023",
      status: "sold"
    },
    {
      id: 3,
      plotNo: "37",
      estate: "SP",
      size: "Sqm 528",
      price: "Tsh. 13,000,000",
      dayAdded: "24 November 2023",
      status: "available"
    }
  ];
  const header = [
    { title: "Plot No.", field: "plotNo" },
    { title: "Estate", field: "estate" },
    { title: "Size", field: "size" },
    { title: "Price", field: "price" },
    { title: "Day Added", field: "dayAdded" },
    { title: "Status", field: "status" }
  ];
  return (
    <UserTable
      removeButton={true}
      shareButton={true}
      header={header}
      items={items}
      title="PLOTS ON RESALE"
    />
  );
};

export default UserPlotsResale;
