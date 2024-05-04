import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const Signup = () => {
  const { signup } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ email, password });
  };

  return (
    <form className="signup bg-body-tertiary" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label htmlFor="">Email</label>
      <input
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />

      <label htmlFor="">Password</label>
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />

      <button>Sign up</button>
    </form>
  );
};

export default Signup;
