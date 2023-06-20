import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useLoginMutation } from "../../api/authApi";

const Login = () => {
  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isSuccess) {
      navigate("/chat");
    }
  }, [isSuccess]);

  const loginHandler = (data: any) => {
    login(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(loginHandler)}
        style={{ display: "flex", flexDirection: "column", width: "400px" }}
      >
        <label>Email</label>
        <input {...register("email", { required: true })} />
        {errors.email && <p>Email is required</p>}

        <label>Password</label>
        <input {...register("password", { required: true })} type="password" />
        {errors.password && <p>Password is required</p>}

        <p>
          You don't have an acount? <NavLink to="/register">Register</NavLink>
        </p>

        <input type="submit" value={isLoading ? "Loading..." : "Login"} />
        {isError &&
          ((error as any).data as any).msg.map(
            (errorMessage: string, index: string) => (
              <p key={index}>{errorMessage}</p>
            )
          )}
      </form>
    </div>
  );
};

export default Login;
