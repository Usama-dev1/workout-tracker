import React, { useState } from "react";
import SignupHook from "../hooks/SignupHook";

const SignupForm = () => {
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const {isLoading,error,signup}=SignupHook()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };
const handleSubmit=async (e)=>{
  e.preventDefault()
  const { email, password } = data;
  await signup(email,password)
}


  return (
    <>
      <form className="signup" onSubmit={handleSubmit}>
        <h2>Sign Up Form</h2>
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
        <button type="submit" disabled={isLoading}>Submit</button>
        {error&&<div className="error">{error}</div>}
      </form>
    </>
  );
};

export default SignupForm;
