import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Offers from "./pages/Offers";
import TestSkills from "./pages/TestSkills";
import AddOffer from "./pages/AddOffer";
import Keywords from "./pages/Keywords"
import { Keyword } from "./pages/Keyword";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Offers" element={<Offers />} />
          <Route path="/skills/:id" element={<Keyword/>} />
          <Route path="/skills" element={< Keywords />} />
          <Route path="/tests/:id" element={<TestSkills />} />
          <Route path="/newoffer" element={<AddOffer />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
