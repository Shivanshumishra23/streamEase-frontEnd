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
function App() {
  return (
    <>
      <div className="">
        <Routes>
          <Route path="" element={<Home />} />

          <Route path="/pricing" element={<Pricing />} />

          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<Protected />}>
            <Route path="" exact element={<Dashboard />}></Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
