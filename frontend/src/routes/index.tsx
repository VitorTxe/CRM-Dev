import { BrowserRouter, Route, Routes } from "react-router";
import { Authprovider } from "../context/AuthContext";
import AppLayout from "../layout/AppLayout";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Authprovider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* <Route element={<PrivateRoutes />}> */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          {/* </Route> */}

          <Route path="*" element={<h2>Pagina não encontrada</h2>} />
        </Routes>
      </Authprovider>
    </BrowserRouter>
  );
};

export default AppRoutes;
