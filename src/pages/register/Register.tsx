import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../api/authApi";
import { useEffect } from "react";

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
    <div>
      <form
        onSubmit={handleSubmit(submitRegistrationFormHandler)}
        style={{ display: "flex", flexDirection: "column", width: "400px" }}
      >
        <label>First name</label>
        <input {...register("firstName", { required: true })} />
        {errors.firstName && <p>First name is required</p>}

        <label>Last name</label>
        <input {...register("lastName", { required: true })} />
        {errors.lastName && <p>Last name is required</p>}

        <label>Email</label>
        <input {...register("email", { required: true })} />
        {errors.email && <p>Email is required</p>}

        <label>Password</label>
        <input {...register("password", { required: true })} type="password" />
        {errors.password && <p>Password is required</p>}

        <label>Confirm password</label>
        <input
          {...register("rePassword", { required: true })}
          type="password"
        />
        {errors.rePassword && <p>Password confirmation is required</p>}

        {isRegistrationError &&
          ((error as any).data as any).msg.map(
            (errorMessage: string, index: string) => (
              <p key={index}>{errorMessage}</p>
            )
          )}

        <p>
          Already have an account? <NavLink to="/">Login</NavLink>
        </p>

        <input
          type="submit"
          value={isRegistrationLoading ? "Loading..." : "Register"}
        />
      </form>
    </div>
  );
};

export default Register;
