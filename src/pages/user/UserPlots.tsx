import { useEffect, useState } from "react";
import UserTable from "../../components/table/UserTable";
import usePlotsUser from "../../hooks/crudApis/usePlotsUser";
import IUserPlot from "../../interfaces/IUserPlot";

const UserPlots = () => {
  const [plots, setPlots] = useState<(IUserPlot & { status: string })[]>();
  const plotsUserRequest = usePlotsUser();

  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    setIsLoading(true);
    try {
      const res: IUserPlot[] | undefined =
        await plotsUserRequest.getUsersPlot();
      const data: (IUserPlot & { status: string })[] | undefined = res
        ? checkNextPaymentDate(res)
        : undefined;
      data && setPlots(data);
    } catch (e) {
      console.error(e);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  const checkNextPaymentDate = (data: IUserPlot[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const paidStatusCheck = (date: Date) => {
      const copyDate = new Date(date);
      return new Date(copyDate.setMonth(copyDate.getMonth() + 1));
    };

    return data.map((v: IUserPlot) => {
      var paymentDueDate = v.nextPaymentDue && new Date(v.nextPaymentDue);

      if (paymentDueDate && today > paymentDueDate) {
        return { ...v, status: "overDue" };
      } else if (paymentDueDate && paidStatusCheck(today) < paymentDueDate) {
        return { ...v, status: "paid" };
      } else if (v.fullyPaid) {
        return { ...v, status: "fullyPaid" };
      } else {
        return { ...v, status: "pending" };
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const header = [
    { title: "Plot No.", field: "plotNo" },
    { title: "Estate", field: "estate" },
    { title: "Total Price", field: "price" },
    { title: "Total Pending Payment", field: "pendingPrice" },
    { title: "Installment Price", field: "monthlyPayment" },
    { title: "Payment Due Date", field: "nextPaymentDue" },
    { title: "Current Installment", field: "status" }
  ];

  return (
    <UserTable
      plotDetailButton={true}
      payNowButton={["pending", "overDue"]}
      header={header}
      items={plots}
      title="MY PLOTS"
      loading={isLoading}
    />
  );
};

export default UserPlots;
