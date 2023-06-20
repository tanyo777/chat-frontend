import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import { IChildrenProps } from "../../types/componentProps";

const Protected = ({ children }: IChildrenProps) => {
  const accessToken = Cookies.get("access_token");

  if (!accessToken) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Protected;
