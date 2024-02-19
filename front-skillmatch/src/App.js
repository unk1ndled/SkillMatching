import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Log-in";
import Register from "./pages/Register";
<<<<<<< Updated upstream
import Home from "./pages/Home";
=======
import Offers from "./pages/Offers";
>>>>>>> Stashed changes

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< Updated upstream
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
=======
        <Route exact path="/" element={<Landing />} />
        <Route path="/register" element={<Offers />} />
>>>>>>> Stashed changes
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
