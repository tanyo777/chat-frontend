import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, CircularProgress, InputLabel, TextField } from "@mui/material";

import { useLoginMutation } from "../../api/authApi";
import FormHeading from "../../components/forms/formHeading/FormHeading";
import FormAlert from "../../components/forms/alert/FormAlert";
import { EAlertSeverity } from "../../types/componentProps";

const Login = () => {
  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    document.title = "Chat - Login";
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate("/chat");
    }
  }, [isSuccess]);

  const loginHandler = (data: any) => {
    login(data);
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit(loginHandler)}>
        <FormHeading title="Login" />

        <div className="formControlContainer">
          <InputLabel>Email</InputLabel>
          <TextField
            fullWidth
            {...register("email", { required: "Email is required" })}
            placeholder="Enter valid email..."
            size="small"
            helperText={errors.email && <p>{errors.email.message as string}</p>}
          />
        </div>

        <div className="formControlContainer">
          <InputLabel>Password</InputLabel>
          <TextField
            fullWidth
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Enter password..."
            size="small"
            helperText={
              errors.password && <p>{errors.password.message as string}</p>
            }
          />
        </div>

        <p>
          You don't have an acount? <NavLink to="/register">Register</NavLink>
        </p>

        {isLoading && <CircularProgress />}

        {!isLoading && (
          <Button type="submit" variant="contained">
            Login
          </Button>
        )}

        {/* errors */}
        {isError &&
          ((error as any).data as any).msg.map(
            (errorMessage: string, index: string) => (
              <FormAlert
                key={index}
                message={errorMessage}
                severity={EAlertSeverity.ERROR}
              />
            )
          )}
      </form>
    </div>
  );
};

export default Login;
