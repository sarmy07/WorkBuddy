import React, { useContext, useState } from "react";
import { useEffect } from "react";

import WorkOutDetails from "../components/WorkOutDetails";
import WorkOutForm from "../components/WorkOutForm";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const { token } = useContext(AuthContext);
  // console.log(token)

  const [workouts, setWorkouts] = useState([]);

  const getData = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/workouts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      setWorkouts(data.works);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [token, workouts]);

  return (
    <div>
      <div className="home">
        <div className="workouts">
          {workouts &&
            workouts.map((workout) => (
              <WorkOutDetails key={workout._id} workout={workout} />
            ))}
        </div>
        <WorkOutForm />
      </div>
    </div>
  );
};

export default Home;
