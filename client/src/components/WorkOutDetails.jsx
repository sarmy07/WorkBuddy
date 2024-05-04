import axios from "axios";
import React, { useContext } from "react";
// import { FaBeer } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import formatDistnaceToNow from 'date-fns/formatDistanceToNow'

const WorkOutDetails = ({ workout }) => {
  const { token } = useContext(AuthContext);

  const navigate = useNavigate();

  const deleteWorkout = async (_id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/workouts/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }``
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>{formatDistnaceToNow(new Date(workout.createdAt))}</p>
      <span className="rounded-4">
        <RiDeleteBin6Line onClick={() => deleteWorkout(workout._id)} />
      </span>
    </div>
  );
};

export default WorkOutDetails;
