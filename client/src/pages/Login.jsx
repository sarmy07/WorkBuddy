import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <form className="login bg-body-tertiary" onSubmit={handleSubmit}>
      <h3>Login</h3>

      <label>Email</label>
      <input
        type="email"
        // placeholder="Please provide email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />

      <label>Password</label>
      <input
        type="password"
        // placeholder="Please provide password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />

      <button>Login</button>
    </form>
  );
};

export default Login;
