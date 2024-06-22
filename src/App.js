import React from "react";
import Home from "./Component/Home";
import Pricing from "./Component/Pricing";
import About from "./Component/About";
import Dashboard from "./Component/Dashboard";
import NotFoundPage from "./Component/NotFoundPage";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import { Protected } from "./utils/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext"; // Import the provider
import StreamKeys from "./Component/StreamKeys";

function App() {
  return (
    <DarkModeProvider>
      <div>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Protected />}>
            <Route path="keys" exact element={<StreamKeys/>}></Route>
            <Route path="" exact element={<Dashboard/>}></Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </DarkModeProvider>
  );
}

export default App;
