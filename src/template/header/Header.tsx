import { FlatLink } from "../../components/buttons/Buttons.styled";
import {
  WrapperRight,
  WrapperLeft,
  WrapperMain,
  BorderBottom,
  FlatLinkContainer
} from "./Header.styled";
import { Container } from "./Header.styled";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import IMenuItem from "../../interfaces/IMenuItem";
import Logo from "../../utils/Logo";
import { Button } from "../../components/buttons/Buttons";
import { authActions } from "../../redux/reducers/auth";
import { loadingActions } from "../../redux/reducers/loading";

function Header(props: any) {
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  localStorage.removeItem("user");

  var links = !user
    ? [
        // { title: "Home", path: "home", index: 0 }
        // { title: "About Us", path: "about", index: 1 },
        // { title: "Services", path: "services", index: 2 },
        // { title: "Support", path: "support", index: 3 },
        // { title: "Contact us", path: "contact", index: 4 }
      ]
    : [
        { title: "Home", path: "home", index: 0 },
        { title: "Menu", path: "user-menu", index: 1 }
        // { title: "About Us", path: "about", index: 2 },
        // { title: "Services", path: "services", index: 3 },
        // { title: "Support", path: "support", index: 4 },
        // { title: "Contact us", path: "contact", index: 5 }
      ];

  const [activeLink, setActiveLink] = useState<IMenuItem | null>(null);
  const [flatLinkWidthPercentages, setFlatLinkWidthPercentages] = useState<
    Array<number>
  >([]);
  const [flatLinkContainerWidth, setFlatLinkContainerWidth] = useState(0);
  const [borderLocation, setBorderLocation] = useState({
    width: 0,
    left: 0
  });

  // const elementsRef = useRef(links.map(() => createRef()));
  const elementsRef = useRef<Array<HTMLElement>>([]);
  const addRef = (el: any) => {
    if (el && !elementsRef.current.includes(el) && flatLinkContainerWidth) {
      elementsRef.current.push(el);
      setFlatLinkWidthPercentages((prev) => [
        ...prev,
        (el.getBoundingClientRect().width / flatLinkContainerWidth) * 100
      ]);
    }
  };

  const changePath = (el: IMenuItem) => {
    navigate(`/LandAssets/${el.path}`);
  };

  useEffect(() => {
    const calculateLeftProperty = (index: number) => {
      return flatLinkWidthPercentages.reduce(
        (accumulator, currentValue, currentIndex) => {
          if (currentIndex < index) {
            return accumulator + currentValue;
          } else {
            return accumulator;
          }
        },
        0
      );
    };

    setBorderLocation(() => {
      return {
        width: activeLink ? flatLinkWidthPercentages[activeLink.index] : 0,
        left: activeLink ? calculateLeftProperty(activeLink.index) : 0
      };
    });
  }, [activeLink, flatLinkWidthPercentages]);

  useEffect(() => {
    const menuPage = links.filter((v) => v.path == location.pathname.slice(1));
    !menuPage ? setActiveLink(null) : setActiveLink(menuPage[0]);
  }, [location.pathname]);

  const loginHandler = () => {
    navigate("/LandAssets/login");
  };

  const logoutHandler = () => {
    dispatch(loadingActions.beginLoading());
    dispatch(authActions.logout());
    setTimeout(() => {
      dispatch(loadingActions.finishLoading());
    }, 500);

    navigate("/LandAssets/home");
  };

  return (
    <Container>
      <WrapperMain>
        <WrapperLeft>
          <Logo />
        </WrapperLeft>
        <WrapperRight>
          <FlatLinkContainer
            ref={(el: HTMLElement) =>
              el && setFlatLinkContainerWidth(el.getBoundingClientRect().width)
            }
          >
            {links.map((v, index) => (
              <FlatLink
                ref={addRef}
                onClick={() => changePath(v)}
                className={
                  v.path === activeLink?.path ? "active border" : "inactive"
                }
                key={index}
              >
                {v.title}
              </FlatLink>
            ))}
            <BorderBottom
              left={borderLocation.left}
              width={borderLocation.width}
            />
          </FlatLinkContainer>
          <div
            style={{
              display: "flex",
              width: "270px",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            {!user ? (
              <Button type="unfilled" onClick={() => loginHandler()}>
                SIGN IN
              </Button>
            ) : (
              <Button type="unfilled" onClick={() => logoutHandler()}>
                SIGN OUT
              </Button>
            )}
            <Button
              disabled
              tooltip={[
                {
                  case: true,
                  text: "Funcionalidade não implementada"
                }
              ]}
              type="filled"
              style={{ height: "45px" }}
            >
              Become an Agent
            </Button>
          </div>
        </WrapperRight>
      </WrapperMain>
      {props.children}
    </Container>
  );
}

export default Header;
