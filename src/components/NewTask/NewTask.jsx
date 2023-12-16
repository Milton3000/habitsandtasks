import React, { useEffect, useState } from "react";
import styles from "./NewTask.module.css"

const NewTask = ({ tasks, setTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeEstimate, setTimeEstimate] = useState("");
  const [taskType, setTaskType] = useState("");
  const [suggestedActivity, setSuggestedActivity] = useState("");

  useEffect(() => {
    const fetchActivity = async () => {
      const response = await fetch("https://www.boredapi.com/api/activity");
      const data = await response.json();
      setSuggestedActivity(data.activity);
    };
    fetchActivity();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !timeEstimate || !taskType) {
      alert("Please fill in all required fields.");
      return;
    }

    const newTask = {
      title,
      description,
      timeEstimate,
      taskType,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleClearFields = () => {
    setTitle("");
    setDescription("");
    setTimeEstimate("");
    setTaskType("");
    setSuggestedActivity("");
  };

  return (
    <div className={styles.container}>
      <h2> Create New Task </h2>
      <form onSubmit={handleFormSubmit}>
        <label> Title: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label> Description: </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <label> Estimated Time: </label>
        <input
          type="number"
          value={timeEstimate}
          onChange={(e) => setTimeEstimate(e.target.value)}
        />
        <br />
        <label> Type of Task: </label>
        <select value={taskType} onChange={(e) => setTaskType(e.target.value)}>
          <option value=""> Select Type </option>
          <option value="Household">Household Chores</option>
          <option value="Social">Social Activity</option>
          <option value="Work">Work-related Task</option>
          <option value="School">School-related Task</option>
          <option value="Leisure">Leisure Activity</option>
        </select>
        <br />
        <button type="button" onClick={() => setTitle(suggestedActivity)}>
          Suggest Task
        </button>
        <button type="submit">Create Task</button>
        <button type="button" onClick={handleClearFields}>
          Clear Fields
        </button>
      </form>
    </div>
  );
};

export default NewTask;
