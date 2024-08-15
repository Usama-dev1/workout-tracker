import { useContext } from "react";
import { WorkoutsContext } from "./WorkoutContext";

export const useWorkoutsContext=()=>{
    const context=useContext(WorkoutsContext)
    if(!context)
        {throw Error('useWorkoutContext must be used inside WorkoutsContextProvider')}


return context
}

