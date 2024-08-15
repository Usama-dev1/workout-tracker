import React, { useState } from "react";
import useLogin from '../hooks/useLogin'
const LoginForm = () => {
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const { isLoading, error, login } = useLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    const {email,password}=data
    await login(email,password)
  };


  return (
    <>
      <form className="login" onSubmit={handleSubmit}>
        <h2>Login Form</h2>

        <label htmlFor="email">Email</label>
        <input
          type="text"
          onChange={handleChange}
          name="email"
          value={data.email}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          onChange={handleChange}
          name="password"
          value={data.password}
        />
        <button type="submit" disabled={isLoading}>
          Login
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};

export default LoginForm;
