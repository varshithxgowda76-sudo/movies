import { useState } from "react";
import { AUTH } from "../api";
import "./Auth.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await AUTH.post("/register", { name, email, password });
      window.location.href = "/login";
    } catch {
      alert("User already exists");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Sign Up</h1>
        <input placeholder="Name" onChange={e => setName(e.target.value)} />
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button onClick={register}>Sign Up</button>
      </div>
    </div>
  );
}

export default Register;
