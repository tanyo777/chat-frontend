import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useLazyLogoutQuery } from "../../api/authApi";

const Chat = () => {
  const [logout, { isSuccess: isLogoutSuccess }] = useLazyLogoutQuery();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLogoutSuccess) {
      navigate("/", { replace: true });
    }
  }, [isLogoutSuccess]);

  const logoutHandler = async () => {
    logout("test");
  };

  return (
    <div>
      <h1>Chat</h1>
      <button onClick={logoutHandler}>logout</button>
    </div>
  );
};

export default Chat;
