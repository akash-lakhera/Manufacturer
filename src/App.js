import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Modal from "./components/Modal";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Dashboard from "./Dashboard";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/curd" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
