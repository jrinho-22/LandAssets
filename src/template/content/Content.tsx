import Header from "../header/Header";
import { Outlet } from "react-router-dom";

function Content() {
  return (
    <Header>
      <Outlet />
    </Header>
  );
}

export default Content;
