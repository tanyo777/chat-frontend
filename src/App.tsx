import { Route, Routes } from "react-router-dom";

import Login from "./pages/login/Login";
import Chat from "./pages/chat/Chat";
import Protected from "./components/protectedRoute/Protected";
import Public from "./components/publicRoute/Public";
import Register from "./pages/register/Register";
import NotFoundPage from "./pages/404/404Page";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Public>
            <Login />
          </Public>
        }
      />

      <Route
        path="register"
        element={
          <Public>
            <Register />
          </Public>
        }
      />
      <Route
        path="chat"
        element={
          <Protected>
            <Chat />
          </Protected>
        }
      />

      <Route
        path="*"
        element={
          <Public>
            <NotFoundPage />
          </Public>
        }
      />
    </Routes>
  );
}

export default App;
