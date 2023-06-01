import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import {LandingPage}  from "./pages/LandingPage"
import FilePage from "./FilePage";
import App from "./App";
import AdminHome from "./AdminHome";
import LoginPage from "./LoginPage";
import AddLoi from "./AddLoi";
import AddAdmin from "./AddAdmin";
// import NotFound from "./pages/NotFound"

export const Router = () => {
  return (
    <div style={{ height: "100% ", width: "100%" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<App />} />
          <Route path="/file" element={<FilePage />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/add" element={<AddLoi />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/addadmin" element={<AddAdmin />} />
          {/* <Route Component={NotFound} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};
