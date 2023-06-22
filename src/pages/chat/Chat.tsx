import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { useLazyLogoutQuery } from "../../api/authApi";
import { toMiliSeconds } from "../../utils/dateAndTime.util";

const Chat = () => {
  const [
    logout,
    { isSuccess: isLogoutSuccess, isError: isLogoutError, error },
  ] = useLazyLogoutQuery();

  const navigate = useNavigate();

  useEffect(() => {
    const accessTokenInterval = setInterval(() => {
      const accessToken = Cookies.get("access_token");
      if (!accessToken) {
        logout();
      }
    }, toMiliSeconds(0, 1, 0));

    return () => {
      clearInterval(accessTokenInterval);
    };
  }, []);

  useEffect(() => {
    if (isLogoutSuccess || isLogoutError) {
      navigate("/", { replace: true });
    }
  }, [isLogoutSuccess, isLogoutError]);

  const logoutHandler = async () => {
    logout();
  };

  return (
    <div>
      <h1>Chat</h1>
      <button onClick={logoutHandler}>logout</button>
    </div>
  );
};

export default Chat;
