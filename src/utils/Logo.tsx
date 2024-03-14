import { Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Logo = (props: any) => {
  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex"
      }}
    >
      <LocationOnIcon
        sx={{
          "&.MuiSvgIcon-root": {
            fontSize: "43px"
          },
          color: (theme) => theme.palette.secondary.dark
        }}
      />
      <Typography
        variant="h4"
        sx={{
          color: (theme) =>
            props.color == "green" ? theme.palette.secondary.dark : "white"
        }}
      >
        LandAssests
      </Typography>
    </div>
  );
};

export default Logo;
