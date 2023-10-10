import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Partai from "./pages/Partai";
import Paslon from "./pages/Paslon";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Votes from "./pages/Votes";
import Profile from "./pages/Profile";
// import PrivateRoute from "./components/PrivateRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/voter" element={<Votes />} />
      <Route path="/partai" element={<Partai />} />
      <Route path="/paslon" element={<Paslon />} />
      <Route path="/profile" element={<Profile />} />
      {/* <Route path="/" element={<PrivateRoute />}>
        <Route path="/voter" element={<Votes />} />
        <Route path="/partai" element={<Partai />} />
        <Route path="/paslon" element={<Paslon />} />
      </Route> */}
    </Routes>
  );
}

export default App;
