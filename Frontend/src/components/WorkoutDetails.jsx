import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContent";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { FaTrash } from "react-icons/fa";
import { useAuthContext } from "../hooks/authHook";
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const {user}=useAuthContext()
  const handleDelete = async () => {
    if(!user)
      {
        return
      }
    
    const response = await fetch(
      "http://localhost:4000/api/workouts/" + workout._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      }
    );
    if (response.ok) {
      const json = await response.json();
      dispatch({ type: "DELETE_WORKOUTS", payload: json });
    }
  };

  return (
    <>
      <div className="workout-details">
        <h4>{workout.title}</h4>
        <p>
          Reps:
          {workout.reps}
        </p>
        <p>
          Load(Kg): <strong />
          {workout.load}
        </p>
        <p>
          added&nbsp;
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
        <span onClick={handleDelete}><FaTrash/></span>
      </div>
    </>
  );
};

export default WorkoutDetails;
