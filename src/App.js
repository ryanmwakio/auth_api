import "./App.css";
import { Helmet } from "react-helmet";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Error from "./components/Error";
import ResetPassword from "./components/ResetPassword";
import { UserContext } from "./store/userContext";
import { useState, useMemo } from "react";

function App() {
  let [user, setUser] = useState(null);

  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login & Registration</title>
      </Helmet>
      <UserContext.Provider value={providerValue}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
