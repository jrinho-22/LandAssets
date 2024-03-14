import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import PlotInfo from "../../components/plot/PlotInfo";
import { LowerWrapper } from "../../styles/styledComponets";
import {
  Img,
  InfoBar,
  Items,
  UpperWrapper,
  ButtonsWrapper,
  TypoItem,
  Description
} from "./Home.styled";
import theme from "../../styles/CustomizingTheme";
import { Button } from "../../components/buttons/Buttons";
import useEstates from "../../hooks/crudApis/useEstates";
import IEstate from "../../interfaces/IEstate";

const Home = () => {
  const { get: getEstates } = useEstates();
  const [estates, setEstates] = useState<IEstate[]>([]);
  const plotInfoContainer = useRef<HTMLDivElement>(null);
  const [activeState, setactiveState] = useState<IEstate>();
  const [touch, settouch] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await handleGetEstates();
    };
    getData();
  }, []);

  const handleGetEstates = async () => {
    try {
      const res = await getEstates();
      setactiveState(res.data[0]);
      setEstates(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (e: any) => {
    if (plotInfoContainer.current) {
      settouch(true);
      setactiveState(e.target.value);
      const rect = plotInfoContainer.current.getBoundingClientRect(); // Accessing bounding client rectangle
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const offsetTop = rect.top + scrollTop;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <React.Fragment>
      <UpperWrapper>
        <Img src="recep.png" />
        <Description>
          <Typography
            variant="h1"
            color="white"
            sx={{
              fontSize: "60px",
              fontWeight: "800"
            }}
          >
            Find it. Own it
          </Typography>
          <Typography variant="h6" color="white">
            Wheather you need a residential or commercial plot of any size and
            garanteed title deed. We've got you covered.
          </Typography>
          <ButtonsWrapper>
            <FormControl sx={{ width: 150 }}>
              <InputLabel
                style={{ color: "white", fontSize: "14px" }}
                id="demo-simple-select-label"
              >
                ESTATES
              </InputLabel>
              <Select
                color="secondary"
                sx={{
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white"
                  },
                  "&.MuiInputBase-formControl": {
                    fontSize: "14px",
                    color: "white",
                    fieldset: {
                      borderColor: theme.palette.secondary.main
                    },
                    "&:hover > fieldset": {
                      borderColor: "white"
                    }
                  }
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={touch ? activeState : ""}
                label="ESTATES"
                onChange={(e: any) => handleChange(e)}
              >
                {estates.map((v) => (
                  <MenuItem value={v.name}>{v.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              disabled
              tooltip={[
                {
                  case: true,
                  text: "Funcionalidade não implementada"
                }
              ]}
              type="unfilled"
            >
              START SELLING
            </Button>
          </ButtonsWrapper>
        </Description>
        <InfoBar style={{ marginBottom: "-100px" }}>
          <Items>
            <TypoItem fontSize="40px" fontWeight="800">
              1400+
            </TypoItem>
            <TypoItem style={{ marginTop: "-10px" }}>Available Plots</TypoItem>
          </Items>
          <Items>
            <TypoItem fontSize="40px" fontWeight="800">
              107+
            </TypoItem>
            <TypoItem style={{ marginTop: "-10px" }}>Customers</TypoItem>
          </Items>
          <Items>
            <TypoItem fontSize="40px" fontWeight="800">
              22+
            </TypoItem>
            <TypoItem style={{ marginTop: "-10px" }}>Estates</TypoItem>
          </Items>
        </InfoBar>
      </UpperWrapper>
      <LowerWrapper>
        <PlotInfo
          setselectedState={(e: IEstate) => setactiveState(e)}
          selectedState={activeState}
          ref={plotInfoContainer}
        />
      </LowerWrapper>
    </React.Fragment>
  );
};

export default Home;
