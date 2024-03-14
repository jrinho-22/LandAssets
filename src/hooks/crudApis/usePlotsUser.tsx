import { useSelector } from "react-redux";
import api from "../../axios-config/userPlots";
import moment, { Moment } from "moment";
import IUserPlot from "../../interfaces/IUserPlot";
import { AxiosResponse } from "axios";

const usePlotUser = () => {
  //   const [isSaving, setIsSaving] = useState(false);
  const selector = useSelector((v: any) => v.auth);

  const get = async (
    id?: number
  ): Promise<IUserPlot[] | IUserPlot | undefined> => {
    try {
      const res: AxiosResponse = id
        ? await api.get(`${id}`)
        : await api.get("");
      if (res.status == 200) {
        return res.data;
      }
    } catch (e) {
      return Promise.reject(`Error: ${e}`);
    }
  };

  const getUsersPlot = async (): Promise<IUserPlot[] | undefined> => {
    try {
      const res: AxiosResponse = await api.get(`?userId=${selector.user.id}`);
      if (res.status == 200) {
        return res.data;
      }
    } catch (e) {
      return Promise.reject(`Error: ${e}`);
    }
  };

  const put = async (id?: number) => {
    try {
      const plot: IUserPlot | IUserPlot[] | undefined = await get(id);
      console.log(plot, "plottt");
      if (plot !== undefined) {
        var nextPaymentDue: Moment | string = moment(
          (plot as IUserPlot).nextPaymentDue
        );
        nextPaymentDue = nextPaymentDue.add(1, "month").format("MM-DD-YYYY");
        const record = {
          ...plot,
          fullyPaid: (plot as IUserPlot).installments == 1 ? true : false,
          installments:
            (plot as IUserPlot).installments == 1 ||
            (plot as IUserPlot).installments == null
              ? null
              : (plot as IUserPlot).installments! - 1,
          nextPaymentDue:
            (plot as IUserPlot).installments == 1 ||
            (plot as IUserPlot).installments == null
              ? null
              : nextPaymentDue,
          pendingPrice:
            (plot as IUserPlot).installments == 1 ||
            (plot as IUserPlot).installments == null
              ? null
              : (plot as IUserPlot).pendingPrice! -
                (plot as IUserPlot).monthlyPayment!
          // id: 3
        };
        console.log(record);
        const res: any = await api.put(`${id}`, record);
        if (res.status === 200) {
          return res;
        }
      }
    } catch (e) {
      return Promise.reject(`Error: ${e}`);
    }
  };

  const post = async (record: any) => {
    try {
      var fullyPaid: boolean;
      var today = moment();
      fullyPaid = record.paymentMethod == "finance" ? false : true;

      const newRecord: IUserPlot = {
        fullyPaid: fullyPaid,
        size: record.size,
        pricePerSQM: record.pricePerSQM,
        userId: selector.user.id,
        plotId: String(record.plotId),
        price: record.totalPrice,
        monthlyPayment: record.monthlyPayment,
        estate: record.estate,
        plotNo: record.number,
        installments: record.installments,
        downPayment: record.firstInstallment,
        pendingPrice: null,
        nextPaymentDue: null
      };

      if (record.paymentMethod == "finance") {
        newRecord.nextPaymentDue = today.add(1, "month").format("MM-DD-YYYY");
        newRecord.pendingPrice = record.totalPrice - record.firstInstallment;
      } else {
        newRecord.nextPaymentDue = null;
        newRecord.downPayment = null;
        newRecord.installments = null;
        newRecord.monthlyPayment = null;
      }

      const res: any = await api.post("", newRecord);
      if (res.status === 200) {
        return res;
      }
    } catch (e) {
      return Promise.reject(`Error: ${e}`);
    }
  };

  return { getUsersPlot, get, post, put };
};

export default usePlotUser;
