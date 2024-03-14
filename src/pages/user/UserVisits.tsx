import UserTable from "../../components/table/UserTable";

const UserPayments = () => {
  const items = [
    {
      id: 1,
      plotNo: "37",
      estate: "SP",
      size: "Sqm 528",
      price: "Tsh. 13,000,000",
      bookingDate: "24 November 2023",
      dayToVisit: "24 January 2024",
      status: "sold"
    },
    {
      id: 2,
      plotNo: "37",
      estate: "SP",
      size: "Sqm 528",
      price: "Tsh. 13,000,000",
      bookingDate: "24 November 2023",
      dayToVisit: "24 January 2024",
      status: "sold"
    },
    {
      id: 3,
      plotNo: "37",
      estate: "SP",
      size: "Sqm 528",
      price: "Tsh. 13,000,000",
      bookingDate: "24 November 2023",
      dayToVisit: "24 January 2024",
      status: "available"
    }
  ];
  const header = [
    { title: "Plot No.", field: "plotNo" },
    { title: "Estate", field: "estate" },
    { title: "Size", field: "size" },
    { title: "Price", field: "price" },
    { title: "Booking Date", field: "bookingDate" },
    { title: "Day to Visit", field: "dayToVisit" },
    { title: "Status", field: "status" }
  ];
  return (
    <UserTable
      plotDetailButton={true}
      removeButton={true}
      buyNowButton={["available"]}
      header={header}
      items={items}
      title="SITE VISIT BOOKINGS"
    />
  );
};

export default UserPayments;
