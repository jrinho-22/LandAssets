import { TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormGrid, {
  FormItem,
  FormRow
} from "../../components/formGrid/FormGrid";
import useUsers from "../../hooks/crudApis/useUsers";
import useValidation, {
  requiredIf,
  validEmail
} from "../../hooks/useValidation";
import Logo from "../../utils/Logo";
import { Background, Container } from "./Login.styled";

const Signin = (props: any) => {
  const onChangeHandler = (v: string, e: any) => {
    props.setrecord((prev: any) => ({
      ...prev,
      signin: { ...prev.signin, [v]: e.target.value }
    }));
  };

  return (
    <>
      <FormRow style={{ marginLeft: "-24px" }}>
        <FormItem col="12">
          <TextField
            error={
              Object.keys(props.validationForm).length
                ? !props.validationForm.signinEmail
                : false
            }
            helperText={
              Object.keys(props.validationForm).length &&
              !props.validationForm.signinEmail &&
              "Email invalido"
            }
            value={props.record.email}
            size="small"
            color="secondary"
            variant="outlined"
            label="Email"
            fullWidth
            onChange={(e) => onChangeHandler("email", e)}
          ></TextField>
        </FormItem>
      </FormRow>
      <FormRow style={{ marginLeft: "-24px" }}>
        <FormItem col="12">
          <TextField
            error={
              Object.keys(props.validationForm).length
                ? !props.validationForm.signinPassword
                : false
            }
            helperText={
              Object.keys(props.validationForm).length &&
              !props.validationForm.signinPassword &&
              "Campo obrigatório"
            }
            onChange={(e) => onChangeHandler("password", e)}
            value={props.record.password}
            type="password"
            size="small"
            color="secondary"
            variant="outlined"
            label="Password"
            fullWidth
          ></TextField>
        </FormItem>
      </FormRow>
      <FormRow
        style={{
          marginBottom: "-40px",
          marginLeft: "-24px"
        }}
      >
        <FormItem col="12">
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              color: (theme) => theme.palette.primary.dark
            }}
            variant="h6"
          >
            Haven't registered yet?
            {
              <Typography
                onClick={() => props.setlayout("signup")}
                sx={{
                  cursor: "pointer",
                  color: (theme) => theme.palette.primary.main
                }}
                variant="h6"
              >
                &nbsp;Sign up here
              </Typography>
            }
          </Typography>
        </FormItem>
      </FormRow>
    </>
  );
};

const SignUp = (props: any) => {
  const onChangeHandler = (v: string, e: any) => {
    props.setrecord((prev: any) => ({
      ...prev,
      signup: { ...prev.signup, [v]: e.target.value }
    }));
  };
  return (
    <>
      <FormRow style={{ marginLeft: "-24px" }}>
        <FormItem col="12">
          <TextField
            error={!props.validationForm.signupFullName}
            onChange={(e) => onChangeHandler("fullName", e)}
            value={props.record.fullName}
            size="small"
            color="secondary"
            variant="outlined"
            label="Full Name"
            fullWidth
          />
        </FormItem>
      </FormRow>
      <FormRow style={{ marginLeft: "-24px" }}>
        <FormItem col="12">
          <TextField
            error={!props.validationForm.signupEmail}
            value={props.record.email}
            size="small"
            color="secondary"
            variant="outlined"
            label="Email"
            fullWidth
            onChange={(e) => onChangeHandler("email", e)}
          />
        </FormItem>
      </FormRow>
      <FormRow style={{ marginLeft: "-24px" }}>
        <FormItem col="12">
          <TextField
            error={!props.validationForm.signupPassword}
            onChange={(e) => onChangeHandler("password", e)}
            value={props.record.password}
            type="password"
            size="small"
            color="secondary"
            variant="outlined"
            label="Password"
            fullWidth
          />
        </FormItem>
      </FormRow>
      <FormRow style={{ marginLeft: "-24px" }}>
        <FormItem col="12">
          <TextField
            error={!props.validationForm.signupPhoneNumber}
            onChange={(e) => onChangeHandler("phoneNumber", e)}
            value={props.record.phoneNumber}
            type="number"
            size="small"
            color="secondary"
            variant="outlined"
            label="Phone Number"
            fullWidth
          />
        </FormItem>
      </FormRow>
      <FormRow
        style={{
          marginBottom: "-40px",
          marginLeft: "-24px"
        }}
      >
        <FormItem col="12">
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              color: (theme) => theme.palette.primary.dark
            }}
            variant="h6"
          >
            Return to
            {
              <Typography
                onClick={() => props.setlayout("signin")}
                sx={{
                  cursor: "pointer",
                  color: (theme) => theme.palette.primary.main
                }}
                variant="h6"
              >
                &nbsp;Sign in
              </Typography>
            }
          </Typography>
        </FormItem>
      </FormRow>
    </>
  );
};

const Login = () => {
  const modelUsers = useUsers();
  const [layout, setlayout] = useState("signin");
  const navigate = useNavigate();

  const emptyRecord = {
    signin: {
      email: "",
      password: ""
    },
    signup: {
      fullName: "",
      email: "",
      password: "",
      phoneNumber: ""
    }
  };
  const [record, setrecord] = useState(emptyRecord);

  const { validationUtils, validationForm } = useValidation(record, {
    signinEmail: [
      requiredIf(layout == "signin", record.signin.email),
      validEmail(record.signin.email)
    ].every((v) => v == true),
    signinPassword: requiredIf(layout == "signin", record.signin.password),
    signupFullName: requiredIf(layout == "signup", record.signup.fullName),
    signupEmail: requiredIf(layout == "signup", record.signup.email),
    signupPassword: requiredIf(layout == "signup", record.signup.password),
    signupPhoneNumber: requiredIf(layout == "signup", record.signup.phoneNumber)
  });

  useEffect(() => {
    validationUtils.resetForm();
    setrecord(emptyRecord);
  }, [layout]);

  const login = async () => {
    try {
      if (layout == "signin") {
        await modelUsers.checkLogin(record.signin);
      } else if (layout == "signup") {
        await modelUsers.post(record.signup);
        window.alert("usuario cadastrado");
      }
      navigate("/LandAssets/home");
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <Background>
      <Container>
        <Logo color="green" />
        <FormGrid
          validationUtils={validationUtils}
          actionButton={layout == "signin" ? "SIGN IN" : "SIGN UP"}
          customAction={() => login()}
          style={{ marginTop: "0px" }}
        >
          {layout == "signin" ? (
            <>
              <Signin
                validationForm={validationForm}
                record={record.signin}
                setrecord={setrecord}
                setlayout={setlayout}
              />
            </>
          ) : (
            <SignUp
              setlayout={setlayout}
              validationForm={validationForm}
              record={record.signup}
              setrecord={setrecord}
            />
          )}
        </FormGrid>
      </Container>
    </Background>
  );
};

export default Login;
