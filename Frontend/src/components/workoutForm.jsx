import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContent";
import { useAuthContext } from "../hooks/authHook";
const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const {user}=useAuthContext()
  const [data, setData] = useState({ title: "", load: "", reps: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!user)
      {
        setError('you must be logged in')
      }
    try {
      const response = await fetch("http://localhost:4000/api/workouts/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
        },
      });
      const jsonData = await response.json();
      if (!response.ok) {
        setError(jsonData.error);
      } else {
        dispatch({type: "SET_WORKOUTS",payload:jsonData})
        setData({ title: "", load: "", reps: "" });
        setError(null);
        console.log("Data posted:", jsonData);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while submitting the form.");
    }
  };

  return (
    <div>
      <form className="create" onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={data.title}
          onChange={handleChange}
          required
        />
        <label htmlFor="load">Load(kg):</label>
        <input
          type="number"
          name="load"
          id="load"
          value={data.load}
          onChange={handleChange}
          required
        />
        <label htmlFor="reps">Reps:</label>
        <input
          type="number"
          name="reps"
          id="reps"
          value={data.reps}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default WorkoutForm;
