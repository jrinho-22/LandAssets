import { useSelector } from "react-redux";
import IUsers from "../../../interfaces/IUsers";
import { LowerWrapper } from "../../../styles/styledComponets";
import { FlexContainerColumn } from "./User.styled";

const User = (props: any) => {
  const user: IUsers = useSelector((state: any) => state.auth.user);
  return (
    <>
      <FlexContainerColumn>
        <h1>{user && user.fullName}</h1>
        <h1 style={{ color: "#32b14d", fontWeight: 200 }}>
          {user && `${user.email}  |  ${user.phoneNumber}`}
        </h1>
        <h1>Welcome back</h1>
      </FlexContainerColumn>
      <LowerWrapper padding="40px 130px">{props.children}</LowerWrapper>
    </>
  );
};

export default User;
