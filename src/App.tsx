import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "pages/Home";
import RequireAuth from "AuthProvider";
import Login from "pages/Login";
import { LOGIN_URL } from "pages/Login/constant";
import { useEffect } from "react";
import useStore, { IStateStores } from "stores";
import Invoices from "pages/Invoices";

const selector = ({ setNavigate }: IStateStores) => ({ setNavigate });

function App() {
  const navigate = useNavigate();
  const { setNavigate } = useStore(selector);

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate, setNavigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      >
        <Route index element={<Invoices />} />
      </Route>
      <Route path={LOGIN_URL} element={<Login />} />
    </Routes>
  );
}

export default App;
