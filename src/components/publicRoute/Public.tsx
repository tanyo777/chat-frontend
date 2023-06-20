import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

import { IChildrenProps } from "../../types/componentProps";

const Public = ({ children }: IChildrenProps) => {
  const accessToken = Cookies.get("access_token");

  if (accessToken) {
    return <Navigate to="/chat" replace />;
  }
  return children;
};

export default Public;
