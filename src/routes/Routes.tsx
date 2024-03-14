import {
  Routes,
  Route,
  HashRouter,
  BrowserRouter,
  Navigate
} from "react-router-dom";
import Home from "../pages/home/Home";
import Content from "../template/content/Content";
import AboutUs from "../pages/aboutUs/AboutUs";
import UserMenu from "../pages/user/UserMenu";
import UserTable from "../components/table/UserTable";
import UserPlots from "../pages/user/UserPlots";
import UserPayments from "../pages/user/UserPayments";
import UserVisits from "../pages/user/UserVisits";
import UserPlotsResale from "../pages/user/UserPLotsResale";
import UserWishList from "../pages/user/UserWishList";
import Login from "../pages/login/login";
import { useSelector } from "react-redux";

function Router() {
  const selector = useSelector((state: any) => state.auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Content />}>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          {selector.user && (
            <>
              <Route path="user-plots" element={<UserPlots />} />
              <Route path="user-payments" element={<UserPayments />} />
              <Route path="user-visits" element={<UserVisits />} />
              <Route path="user-menu" element={<UserMenu />} />
              <Route path="user-plots-resale" element={<UserPlotsResale />} />
              <Route path="user-wish-list" element={<UserWishList />} />
            </>
          )}
          <Route path="*" element={<Navigate to="home" replace />} />
          <Route path="/" element={<Navigate to="home" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
