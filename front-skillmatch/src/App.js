import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Offers from "./pages/Offers";
import TestSkills from "./pages/TestSkills";
import Keywords from "./pages/Keywords";
import DeleteKwd from "./pages/DeleteKeywords";
import { Keyword } from "./pages/Keyword";
import { Offer } from "./pages/Offer";
import AddResumer from "./pages/AddResumer";
import Profile from "./pages/Profile";
import AdminTestSkills from "./pages/AdminTestSkills";
import Resume from "./pages/Resume";


import TestContext from "./pages/TestContext";
//import Resume from "./pages/Resume";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test" element={<Resume />} />
          <Route path="/testc" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addresume" element={<AddResumer />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/offers/:id" element={<Offer />} />
          <Route path="/skills/:id" element={<Keyword />} />
          <Route path="/skills" element={<Keywords />} />
          <Route path="/skills/delete" element={<DeleteKwd />} />
          <Route
            path="/tests/:id/advanced/:advanced"
            element={<TestSkills />}
          />
          <Route path="/tests/:id/add" element={<AdminTestSkills />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
