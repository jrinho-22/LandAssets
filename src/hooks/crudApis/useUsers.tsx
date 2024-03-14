import { useDispatch } from "react-redux";
import api from "../../axios-config/users";
import IUsers from "../../interfaces/IUsers";
import { authActions } from "../../redux/reducers/auth";

const useWishList = () => {
  const dispatch = useDispatch();
  //   const [isSaving, setIsSaving] = useState(false);

  const get = async (): Promise<IUsers[] | undefined> => {
    try {
      const res: any = await api.get("");
      if (res.status === 200) {
        return res;
      }
    } catch (e) {
      return Promise.reject(`Error: ${e}`);
    }
  };

  const checkLogin = async (record: any) => {
    try {
      const res: any = await get();
      if (res.data) {
        const user = res.data.filter(
          (v: IUsers) =>
            v.email == record.email && v.password == record.password
        );
        if (user.length) {
          dispatch(authActions.login(user[0]));
        } else {
          return Promise.reject(`Error: UserNotFound`);
        }
      }
    } catch (e) {
      return Promise.reject(`Error: ${e}`);
    }
  };

  const post = async (user: IUsers) => {
    try {
      const res: any = await api.post("", user);
      if (res.status === 201) {
        dispatch(authActions.login(user));
        return res;
      }
    } catch (e) {
      return Promise.reject(`Error: ${e}`);
    }
  };

  const del = async (ids: number[]) => {
    try {
      console.log("delll", ids);
      var res = ids.map(async (id: number) => {
        await api.delete(`${id}`);
      });
      console.log(res);
      // if (res.status === 200) {
      //   return res;
      // }
    } catch (e) {
      return Promise.reject(`Error: ${e}`);
    }
  };

  return { checkLogin, get, post, del };
};

export default useWishList;
