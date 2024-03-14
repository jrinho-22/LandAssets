import api from "../../axios-config/plots";

const usePlotsUser = () => {
  //   const [isSaving, setIsSaving] = useState(false);

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

  const getByState = async (state: string) => {
    try {
      const res: any = await api.get(`?estate=${state}`);
      if (res.status === 200) {
        return res;
      }
    } catch (e) {
      return Promise.reject(`Error: ${e}`);
    }
  };
  return { get, getByState };
};

export default usePlotsUser;
