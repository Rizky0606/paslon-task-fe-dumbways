import { Navigate } from "react-router-dom";
import Home from "../pages/Home";

const PrivateRoute = () => {
  const isLogin = false;

  return isLogin ? <Home /> : <Navigate to="/login" />;
};

export default PrivateRoute;
