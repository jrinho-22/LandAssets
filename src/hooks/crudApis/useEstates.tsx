import api from "../../axios-config/estates";

const useEstates = () => {
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
  return { get };
};

export default useEstates;
