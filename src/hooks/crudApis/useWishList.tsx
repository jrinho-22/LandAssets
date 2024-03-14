import moment from "moment";
import { useSelector } from "react-redux";
import api from "../../axios-config/wishList";
import IPlot from "../../interfaces/IPlot";

const useWishList = () => {
  //   const [isSaving, setIsSaving] = useState(false);
  const selector = useSelector((v: any) => v.auth);

  const get = async () => {
    try {
      const res: any = await api.get("");
      if (res.status === 200) {
        return res;
      }
    } catch (e) {
      return Promise.reject(`Error: ${e}`);
    }
  };

  const getByUser = async () => {
    try {
      const res: any = await api.get(`?userId=${selector.user.id}`);
      if (res.status === 200) {
        return res;
      }
    } catch (e) {
      return Promise.reject(`Error: ${e}`);
    }
  };

  type IPlotNoRequiredId = Omit<IPlot, "id"> & { id?: string };
  const post = async (plot: IPlotNoRequiredId) => {
    const today = moment();
    try {
      // delete plot.id;
      const newplot = {
        userId: selector.user.id,
        dayAdded: today.format("MM-DD-YYYY"),
        status: "available",
        plot: { ...plot },
        plotNumber: plot.number
      };
      const res: any = await api.post("", newplot);
      if (res.status === 200) {
        return res;
      }
    } catch (e) {
      return Promise.reject(`Error: ${e}`);
    }
  };

  const del = async (ids: number[]) => {
    try {
      ids.map(async (id: number) => {
        await api.delete(`${id}`);
      });
    } catch (e) {
      return Promise.reject(`Error: ${e}`);
    }
  };

  return { getByUser, get, post, del };
};

export default useWishList;
