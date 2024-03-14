import { CircularProgress, Typography, useTheme } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { Button } from "../buttons/Buttons";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  EstateImg,
  EstateInfo,
  EstateMap,
  HorizontalLine,
  Scrollable,
  Container,
  UpperContainer,
  FooterContainer
} from "./Plot.styled";
import EstateFields from "./fields/EstateFields";
import PLotFields from "./fields/PlotFields";
import IEstate from "../../interfaces/IEstate";
import IPlot from "../../interfaces/IPlot";
import ModalBuyPlot from "./modals/modalBuyPlot/ModalBuyPlot";
import ModalWishList from "./modals/ModalWishList";
import usePlots from "../../hooks/crudApis/usePlots";
import Carousel from "../carousel/Carousel";
import { useSelector } from "react-redux";
import useEstates from "../../hooks/crudApis/useEstates";
import usePlotUser from "../../hooks/crudApis/usePlotsUser";
import IUserPlot from "../../interfaces/IUserPlot";
import IWishList from "../../interfaces/IWishList";
import useWishList from "../../hooks/crudApis/useWishList";

const PlotInfo = forwardRef<any, any>((props, ref) => {
  const user = useSelector((state: any) => state.auth.user);
  const { getByState: getPlots } = usePlots();
  const { get: getEstates } = useEstates();
  const { getByUser } = useWishList();
  const { getUsersPlot } = usePlotUser();
  const [usersPlots, setUsersPlots] = useState<IUserPlot[] | undefined>([]);
  const [usersWishList, setUsersWishList] = useState<IWishList[] | undefined>(
    []
  );
  const theme = useTheme();
  const [layout, setLayout] = useState("estate");
  const [isLoading, setIsLoading] = useState(false);
  const [isPlotSearchLoading, setPlotSearchLoading] = useState(false);
  // const carouselRef = useRef<CarouselRef>(null);
  const [plots, setPlots] = useState<IPlot[]>([]);
  const [estates, setEstates] = useState<IEstate[]>([]);
  const [validButton, setValidButtons] = useState({
    buyPlot: true,
    addWishList: true
  });
  const [activeEstate, setActiveEstate] = useState<IEstate>();
  const [activePlot, setActivePlot] = useState<IPlot | undefined>(undefined);
  // const [modalBookVisitVisibility, setModalBookVisitVisibility] =
  useState(false);
  const [modalBuyPlotVisibility, setModalBuyPlotVisibility] = useState(false);
  // const [modalReservePlotVisibility, setModalReservePlotVisibility] =
  useState(false);
  const [modalWishList, setModalWishList] = useState(false);

  const handleGetPLots = async (activeState: IEstate | undefined) => {
    if (activeState) {
      try {
        const res = await getPlots(activeState.name);
        setPlots(res.data);
        console.log(res, "resssk");
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleGetWishList = async () => {
    try {
      const res = await getByUser();
      setUsersWishList(res.data);
    } catch (e) {
      console.error(e);
    }
  };
  const handleGetEstates = async () => {
    try {
      const res = await getEstates();
      setActiveEstate(res.data[0]);
      setEstates(res.data);
    } catch (e) {
      console.error(e);
    }
  };
  const handleGetUsersPlots = async () => {
    try {
      const res = await getUsersPlot();
      setUsersPlots(res);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setPlotSearchLoading(true);
      await handleGetPLots(activeEstate);
      setPlotSearchLoading(false);
    };

    fetchData();
  }, [activeEstate]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // await handleGetPLots();
      await handleGetEstates();
      await handleGetUsersPlots();
      await handleGetWishList();
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter" || event.type == "click") {
      console.log("g=fellll", event);
      setPlotSearchLoading(true);
      setLayout("plot");
      const plot = plots.find((plot) => plot.number == searchValue);
      plot ? setActivePlot(plot) : setActivePlot(undefined);
      setTimeout(() => {
        setPlotSearchLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    if (layout == "plot") {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth"
      });
      //   carouselRef.current?.translatePropertyHandler("forward");
      // } else if (layout == "estate") {
      //   carouselRef.current?.translatePropertyHandler("back");
    }
  }, [layout]);

  useEffect(() => {
    setLayout("estate");
    props.setselectedState(activeEstate?.name);
  }, [activeEstate]);

  useEffect(() => {
    const activeState = estates.find((v: any) => v.name == props.selectedState);
    setActiveEstate(activeState || estates[0]);
  }, [props.selectedState]);

  useEffect(() => {
    const validBuyPlot: boolean =
      (usersPlots &&
        activePlot &&
        usersPlots.some((v: IUserPlot) => {
          return v.plotId === activePlot!.id;
        })) ??
      false;
    const addWishList: boolean =
      (usersWishList &&
        activePlot &&
        usersWishList.some((v: IWishList) => {
          return v.plot.id == activePlot!.id;
        })) ??
      false;
    setValidButtons({ buyPlot: validBuyPlot, addWishList: addWishList });
  }, [usersPlots, usersWishList, activePlot]);

  const [searchValue, setsearchValue] = useState("");
  function handleSearchChange(e: any): void {
    setsearchValue(e.target.value);
  }

  return (
    <>
      {/* <ModalBookVisit
        setModalBookVisitVisibility={setModalBookVisitVisibility}
        open={modalBookVisitVisibility}
        theme={theme}
      /> */}
      <ModalWishList
        setModalWishList={setModalWishList}
        open={modalWishList}
        theme={theme}
        plot={activePlot}
      />
      <ModalBuyPlot
        plot={activePlot}
        setModalBuyPlotVisibility={setModalBuyPlotVisibility}
        open={modalBuyPlotVisibility}
      />
      {/* <ModalReservePlot
        setModalReservePlotVisibility={setModalReservePlotVisibility}
        open={modalReservePlotVisibility}
        theme={theme}
      /> */}
      <Container
        translate={layout !== "estate"}
        ref={ref}
        style={{
          marginTop: "160px"
        }}
      >
        <UpperContainer>
          {!isLoading && activeEstate ? (
            <>
              <EstateMap>
                <Carousel
                  itemsUtils={{
                    items: estates,
                    activeValue: activeEstate,
                    setActiveValue: (v: any) => setActiveEstate(v)
                  }}
                  length={estates.length}
                  forwardButton={
                    <ArrowForwardIosOutlinedIcon
                      fontSize="small"
                      style={{
                        padding: "10px",
                        backgroundColor: "rgb(223 251 239)",
                        borderRadius: "100%",
                        margin: "auto 20px auto 10px",
                        color: theme.palette.secondary.dark
                      }}
                    />
                  }
                  backButton={
                    <ArrowBackIosOutlinedIcon
                      fontSize="small"
                      style={{
                        margin: "auto 20px auto 0px",
                        padding: "10px",
                        borderRadius: "100%",
                        color: theme.palette.secondary.dark,
                        backgroundColor: "rgb(223 251 239)"
                      }}
                    />
                  }
                >
                  {estates.map((v, index) => {
                    return (
                      <div>
                        <Typography
                          variant={"h5"}
                          color={"#454545"}
                          fontWeight={800}
                          mb={5}
                          ml={2}
                          key={index}
                        >
                          {v.name}
                        </Typography>
                        <EstateImg src={v.src} />
                      </div>
                    );
                  })}
                </Carousel>
              </EstateMap>
              <HorizontalLine />
              <EstateInfo>
                <div style={{ marginBottom: "15px" }}>
                  <span style={{ fontSize: "16px" }}>
                    Enter Desired Plot number
                  </span>
                  <input
                    onChange={(e: any) => handleSearchChange(e)}
                    onKeyDown={handleKeyPress}
                    type="number"
                  />
                  <Button
                    onClick={(e: any) => handleKeyPress(e)}
                    type="filled"
                    size="small"
                  >
                    search
                  </Button>
                </div>
                {isPlotSearchLoading ? (
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      backgroundColor: theme.palette.background.paper
                    }}
                  >
                    <CircularProgress style={{ margin: "auto" }} />
                  </div>
                ) : (
                  <Scrollable>
                    {layout == "plot" ? (
                      activePlot ? (
                        <PLotFields activePlot={activePlot} />
                      ) : (
                        <div
                          style={{
                            position: "relative",
                            height: "100%",
                            backgroundColor: theme.palette.background.paper
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)"
                            }}
                          >
                            No plots found
                          </span>
                        </div>
                      )
                    ) : (
                      layout == "estate" && (
                        <EstateFields activeEstate={activeEstate} />
                      )
                    )}
                  </Scrollable>
                )}
              </EstateInfo>
            </>
          ) : (
            <div
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                backgroundColor: theme.palette.background.paper
              }}
            >
              <CircularProgress style={{ margin: "auto" }} />
            </div>
          )}
        </UpperContainer>
        <FooterContainer translate={layout! !== "estate"}>
          <div>
            <Button
              type="filled"
              disabled={
                (!user || !activePlot || validButton.addWishList) && true
              }
              onClick={() => setModalWishList(true)}
              bg={"#e5e5e5"}
              tooltip={[
                {
                  case: !user,
                  text: "Faça login no sistema para efetuar essa ação"
                },
                {
                  case: !activePlot,
                  text: "Plot valido precisa ser selecionado"
                },
                {
                  case: validButton.addWishList,
                  text: "Plot já adicionado a Wish List"
                }
              ]}
            >
              <div style={{ position: "relative" }}>
                <FavoriteBorderIcon
                  sx={{
                    marginRight: "9px",
                    color: "#0c3119",
                    "&.MuiSvgIcon-root": {
                      fontSize: "28px"
                    }
                  }}
                />
                <ControlPointIcon
                  sx={{
                    position: "absolute",
                    bottom: "15%",
                    right: "20%",
                    backgroundColor: "#e5e5e5",
                    color: "#0c3119",
                    "&.MuiSvgIcon-root": {
                      fontSize: "15px"
                    }
                  }}
                />
              </div>
              <Typography
                sx={{ textShadow: "0 0 #051a30" }}
                color={"#0c3119"}
                variant={"h6"}
              >
                Add to Wish List
              </Typography>
            </Button>
          </div>
          <div style={{ display: "flex" }}>
            <Button
              type="filled"
              disabled={(!user || !activePlot || validButton.buyPlot) && true}
              onClick={() => setModalBuyPlotVisibility(true)}
              bg={theme.palette.primary.dark}
              border={theme.palette.primary.main}
              tooltip={[
                {
                  case: !user,
                  text: "Faça login no sistema para efetuar essa ação"
                },
                {
                  case: !activePlot,
                  text: "Plot valido precisa ser selecionado"
                },
                {
                  case: validButton.buyPlot,
                  text: "Compra desse plot já realizada"
                }
              ]}
            >
              Buy PLot
            </Button>
            {/* </Tooltip> */}
            {/* <ButtonFilled
              disabled={(!user || !activePlot) && true}
              onClick={() => setModalReservePlotVisibility(true)}
              bg={theme.palette.primary.dark}
              border={theme.palette.primary.main}
            >
              Reserve PLot
            </ButtonFilled> */}
            {/* <Button
              type="filled"
              disabled={(!user || !activePlot) && true}
              onClick={() => setModalBookVisitVisibility(true)}
              bg={theme.palette.primary.dark}
              border={theme.palette.primary.main}
              tooltip={[
                {
                  case: !user,
                  text: "Faça login no sistema para efetuar essa ação"
                },
                {
                  case: !activePlot,
                  text: "Plot valido precisa ser selecionado"
                }
              ]}
            >
              Book Visit
            </Button> */}
          </div>
        </FooterContainer>
      </Container>
    </>
  );
});

export default PlotInfo;
// export default forwardRef(PlotInfo);
