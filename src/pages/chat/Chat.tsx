import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { io } from "socket.io-client";

import { useLazyLogoutQuery } from "../../api/authApi";
import { toMiliSeconds } from "../../utils/dateAndTime.util";
import { envVariables } from "../../config/envVars";
import { IUser } from "../../types/users";
import { IMessage } from "../../types/messages";

const socket = io(envVariables.backendUrl, {
  withCredentials: true,
  autoConnect: false,
});

const Chat = () => {
  socket.connect();
  const [
    logout,
    { isSuccess: isLogoutSuccess, isError: isLogoutError, isLoading },
  ] = useLazyLogoutQuery();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [connected, setConnected] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const accessTokenInterval = setInterval(() => {
      const accessToken = Cookies.get("access_token");
      if (!accessToken) {
        logout();
      }
    }, toMiliSeconds(0, 0, 10));

    return () => {
      clearInterval(accessTokenInterval);
    };
  }, []);

  useEffect(() => {
    if (isLogoutSuccess || isLogoutError) {
      Cookies.remove("access_token");
      navigate("/");
    }
  }, [isLogoutSuccess, isLogoutError]);

  const logoutHandler = async () => {
    await logout();
  };

  useEffect(() => {
    socket.on("connect", (): void => {
      setConnected(true);
    });

    socket.on("broadcastNewMessage", (message: IMessage) => {
      setMessages((prevState: any) => [...prevState, message]);
    });

    socket.on("user", (user: IUser) => {
      setLoggedInUser(user);
    });

    socket.on("userJoins", (joinMessage: IMessage) => {
      setMessages((prevState: any) => [...prevState, joinMessage]);
    });

    socket.on("userDisconnected", (leaveMessage: IMessage) => {
      setMessages((prevState: any) => [...prevState, leaveMessage]);
    });

    socket.on("sendAllMessages", (messages: IMessage[]) => {
      setMessages(messages);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const onEnterSendHandler = (e: any) => {
    if (e.code === "Enter") {
      socket.emit("sendMessage", e.target.value);
      e.target.value = "";
    }
  };

  return (
    <div>
      <h1>
        Chat (
        {connected
          ? `Connected as ${(loggedInUser as any).email}`
          : "Not connected"}
        )
      </h1>
      <button onClick={logoutHandler}>logout</button>

      <div>
        {messages.length === 0 && <p>No messages yet</p>}
        {messages.map((message: IMessage) => (
          <p key={message.id}>{message.text}</p>
        ))}
      </div>
      <input placeholder="Send message..." onKeyDown={onEnterSendHandler} />
    </div>
  );
};

export default Chat;
