import Routes from "./routes/Routes";
import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

function App() {
  const isLoading = useSelector((state: any) => state.loading.isLoading);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Routes />
    </>
  );
}

export default App;
