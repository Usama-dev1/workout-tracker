import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

export const workoutReducer = (state, action) => {
  switch (action.type) {
    case "GET_WORKOUTS":
      return {
        workouts: action.payload
      };
    case "SET_WORKOUTS":
      return {
        workouts: [action.payload, ...state.workouts]
      };
    case "DELETE_WORKOUTS":
      return {
        workouts:state.workouts.filter((work)=>work._id!==action.payload._id)
      };
    default:
      return state;
  }
};

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: null,
  });
  return (
    <WorkoutsContext.Provider value={{...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
