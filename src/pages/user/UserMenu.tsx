import { useNavigate } from "react-router-dom";
import User from "./userUtils/User";
import { FlexContainerRow, OptionContainer } from "./userUtils/User.styled";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const UserMenu = () => {
  const navigate = useNavigate();
  const options = [
    {
      title: "My plots",
      path: "user-plots",
      iconComponent: (
        <PushPinOutlinedIcon
          sx={{
            color: (theme) => theme.palette.primary.main
          }}
        />
      )
    },
    // { title: "Pending Payments", path: "", iconComponent: <PaymentsIcon /> },
    // { title: "Booked Plots", path: "", iconComponent: <PaymentsIcon /> },
    {
      title: "My Wish List",
      path: "user-wish-list",
      iconComponent: (
        <FavoriteBorderOutlinedIcon
          sx={{
            color: (theme) => theme.palette.primary.main
          }}
        />
      )
    }
    // { title: "Plots on Resale", path: "", iconComponent: <PaymentsIcon /> },
  ];
  return (
    <User>
      <FlexContainerRow>
        {options.map((v) => (
          <OptionContainer onClick={() => navigate(`/LandAssets/${v.path}`)}>
            {v.iconComponent}
            <div>
              <span>{v.title}</span>
            </div>
          </OptionContainer>
        ))}
      </FlexContainerRow>
    </User>
  );
};

export default UserMenu;
