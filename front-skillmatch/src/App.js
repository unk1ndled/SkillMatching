import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Log-in";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Offers from "./pages/Offers";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Offers" element={<Offers />} />
      </Routes>
    </Router>
  );
}

export default App;
