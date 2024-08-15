import { useAuthContext } from "./authHook";
import { useWorkoutsContext} from'./useWorkoutContent'

const useLogout = () => {
  //remove user from storage
  const { dispatch } = useAuthContext();
  const {dispatch:workoutdispatch}=useWorkoutsContext()
  

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    workoutdispatch({type:"GET_WORKOUTS",payload:null})
  };

  return {logout};
};

export default useLogout;
