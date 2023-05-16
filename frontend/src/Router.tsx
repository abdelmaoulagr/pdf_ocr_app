import React from "react"
import { BrowserRouter,Routes, Route } from "react-router-dom"
// import {LandingPage}  from "./pages/LandingPage"
import FilePage  from "./FilePage"
import App from "./App"
// import NotFound from "./pages/NotFound"

export const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                <Route path="/"  element={<App/>} />
                <Route path="/file"  element={<FilePage/>} />
                {/* <Route path="/post_flask"  element={<RegisterPage/>} /> */}
                {/* <Route Component={NotFound} /> */}
                </Routes>
            </BrowserRouter>
        </div>
    )
}