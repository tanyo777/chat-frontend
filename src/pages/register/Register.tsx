import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { TextField, InputLabel, CircularProgress, Button } from "@mui/material";

import { useRegisterMutation } from "../../api/authApi";
import FormHeading from "../../components/forms/formHeading/FormHeading";
import { EAlertSeverity } from "../../types/componentProps";
import FormAlert from "../../components/forms/alert/FormAlert";

const Register = () => {
  const [
    registerHandler,
    {
      isSuccess: isRegistrationSuccess,
      isError: isRegistrationError,
      error,
      isLoading: isRegistrationLoading,
    },
  ] = useRegisterMutation();

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (isRegistrationSuccess) {
      navigate("/");
    }
  }, [isRegistrationSuccess]);

  const submitRegistrationFormHandler = (data: any) => {
    registerHandler(data);
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit(submitRegistrationFormHandler)}>
        <FormHeading title="Register" />

        <div className="formControlContainer">
          <InputLabel>First name</InputLabel>
          <TextField
            fullWidth
            {...register("firstName", { required: "First name is required" })}
            placeholder="Enter first name..."
            size="small"
            helperText={
              errors.firstName && <p>{errors.firstName.message as string}</p>
            }
          />
        </div>

        <div className="formControlContainer">
          <InputLabel>Last name</InputLabel>
          <TextField
            fullWidth
            {...register("lastName", { required: "Last name is required" })}
            placeholder="Enter last name..."
            size="small"
            helperText={
              errors.lastName && <p>{errors.lastName.message as string}</p>
            }
          />
        </div>

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
            placeholder="Enter password..."
            size="small"
            type="password"
            helperText={
              errors.password && <p>{errors.password.message as string}</p>
            }
          />
        </div>

        <div className="formControlContainer">
          <InputLabel>Confirm password</InputLabel>
          <TextField
            fullWidth
            {...register("rePassword", {
              required: "Password confirmation is required",
            })}
            placeholder="Confirm password..."
            size="small"
            type="password"
            helperText={
              errors.rePassword && <p>{errors.rePassword.message as string}</p>
            }
          />
        </div>

        <p>
          Already have an account? <NavLink to="/">Login</NavLink>
        </p>
        {isRegistrationLoading && <CircularProgress />}

        {!isRegistrationLoading && (
          <Button type="submit" variant="contained">
            Login
          </Button>
        )}

        {isRegistrationError &&
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

export default Register;
