import axios from "axios";
import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const WorkOutForm = () => {
  const { token } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/workouts",
        {
          title,
          load,
          reps,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setLoad("");
      setReps("");
      setEmptyFields([]);
      console.log(data);
    } catch (error) {
      // setError(json.error);
      // setEmptyFields(json.emptyFields);
      console.log(error);
    }
  };

  return (
    <div className="">
      <div>
        <form className="create details-form" onSubmit={handleSubmit} action="">
          <h3 className="fw-bold">Add a New Workout</h3>

          <label htmlFor="">Exercise Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className={emptyFields.includes("title") ? "error" : ""}
          />

          <label htmlFor="">Load (kg):</label>
          <input
            type="number"
            value={load}
            onChange={(e) => {
              setLoad(e.target.value);
            }}
            className={emptyFields.includes("load") ? "error" : ""}
          />

          <label htmlFor="">Reps:</label>
          <input
            type="number"
            value={reps}
            onChange={(e) => {
              setReps(e.target.value);
            }}
            className={emptyFields.includes("reps") ? "error" : ""}
          />

          <button>Add Workout</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default WorkOutForm;
