import { useState } from "react";
import { useAuthContext } from "./authHook";

const SignupHook = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setError(false);
    setLoading(true);

    const response = await fetch("http://localhost:4000/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      console.log(json);
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setLoading(false);
    }
  };
  return { isLoading, error, signup };
};

export default SignupHook;
