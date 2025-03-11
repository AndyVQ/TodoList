import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registro from "../pages/Registro";
import Login from "../pages/Login";
import Home from "../pages/Home";
function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}
export default Routing;
