import UserTable from "../../components/table/UserTable";

const UserPayments = () => {
  const items = [
    {
      id: 1,
      plotNo: "37",
      estate: "SP",
      nextInstallment: "24 November 2023",
      amount: "Tsh. 9,000,000",
      remainingBalance: "Tsh. 1,000,000",
      status: "paid"
    },
    {
      id: 2,
      plotNo: "37",
      estate: "SP",
      nextInstallment: "24 November 2023",
      amount: "Tsh. 9,000,000",
      remainingBalance: "Tsh. 1,000,000",
      status: "overDue"
    },
    {
      id: 3,
      plotNo: "37",
      estate: "SP",
      nextInstallment: "24 November 2023",
      amount: "Tsh. 9,000,000",
      remainingBalance: "Tsh. 1,000,000",
      status: "pending"
    }
  ];
  const header = [
    { title: "Plot No.", field: "plotNo" },
    { title: "Estate", field: "estate" },
    { title: "Next Installment", field: "nextInstallment" },
    { title: "Amount", field: "amount" },
    { title: "Remaining Balance", field: "remainingBalance" },
    { title: "Status", field: "status" }
  ];
  return (
    <UserTable
      plotDetailButton={true}
      payNowButton={["pending", "overDue"]}
      header={header}
      items={items}
      title="PAYMENTS"
    />
  );
};

export default UserPayments;
