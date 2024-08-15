import React, { useEffect} from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/workoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutContent";
import { useAuthContext } from "../hooks/authHook";
const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const {user}=useAuthContext()
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        console.log(user.token)
        const response = await fetch("http://localhost:4000/api/workouts",{
          headers:{
            'Authorization':`Bearer ${user.token}`
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: "GET_WORKOUTS", payload: json });
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };
    if(user){
    fetchWorkouts();}
  }, []);

  return (
    <>
      <div className="home">
        <div className="workouts">
          <h2>Workouts</h2>
          {workouts &&
            workouts.map((workout) => (
              <WorkoutDetails key={workout._id} workout={workout} />
            ))}
        </div>
        <div>
          <h2>Add New Workouts</h2>
          <WorkoutForm />
        </div>
      </div>
    </>
  );
};

export default Home;
