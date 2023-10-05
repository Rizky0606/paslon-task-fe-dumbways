import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Partai from "./pages/Partai";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Votes from "./pages/Votes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/voter" element={<Votes />} />
      <Route path="/partai" element={<Partai />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
    </Routes>
  );
}

export default App;
