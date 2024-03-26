import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Offers from "./pages/Offers";
import TestSkills from "./pages/TestSkills";
import AddOffer from "./pages/AddOffer";
import Keywords from "./pages/Keywords";
import { Keyword } from "./pages/Keyword";
import { Offer } from "./pages/Offer";
import AddResumer from "./pages/AddResumer";
import Profile from "./pages/Profile";

import TestContext from "./pages/TestContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test" element={<TestContext />} />
          <Route path="/testc" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addresumer" element={<AddResumer />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/offers/:id" element={<Offer />} />
          <Route path="/skills/:id" element={<Keyword />} />
          <Route path="/skills" element={<Keywords />} />
          <Route
            path="/tests/:id/advanced/:advanced"
            element={<TestSkills />}
          />
          <Route path="/newoffer" element={<AddOffer />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
