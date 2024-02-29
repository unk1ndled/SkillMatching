import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProvider } from './context/AuthContext';
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Offers from "./pages/Offers";
import TestSkills from "./pages/TestSkills";

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Offers" element={<Offers />} />
        <Route path="/Test" element={<TestSkills />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
