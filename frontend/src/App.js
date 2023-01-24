import { Routes, Route } from "react-router-dom";
import './App.css';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} ></Route>
        <Route path="/register" element={<Register />} ></Route>
        <Route path="/home" element={<Home />} ></Route>
        <Route path="/profile" element={<Profile />} ></Route>
      </Routes>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
