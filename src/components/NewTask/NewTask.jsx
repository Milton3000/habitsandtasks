import React, { useEffect, useState } from "react";
import styles from "../NewTask/NewTask.css"

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
    alert("Task created successfully!");
    handleClearFields();
  };

  const handleClearFields = () => {
    setTitle("");
    setDescription("");
    setTimeEstimate("");
    setTaskType("");
    setSuggestedActivity("");
  };

  return (
    <div className="newtask-container">
      <h2> Create New Task </h2>
      <form className="newtask-form" onSubmit={handleFormSubmit}>
        <label className="newtask-label">Title:</label>
        <input className="newtask-title-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="newtask-label">Description:</label>
        <textarea className="newtask-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="newtask-label">Estimated Time:</label>
        <input className="newtask-time-input"
          type="number"
          value={timeEstimate}
          onChange={(e) => setTimeEstimate(e.target.value)}
        />

        <label className="newtask-label">Type of Task:</label>
        <select className="newtask-select"
          value={taskType}
          onChange={(e) => setTaskType(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="Household">Household Chores</option>
          <option value="Social">Social Activity</option>
          <option value="Work">Work-related Task</option>
          <option value="School">School-related Task</option>
          <option value="Leisure">Leisure Activity</option>
        </select>

        <button className="newtask-button" type="button" onClick={() => setTitle(suggestedActivity)}>
          Suggest Task
        </button>
        <button className="newtask-button" type="submit">Create Task</button>
        <button className="newtask-button" type="button" onClick={handleClearFields}>
          Clear Fields
        </button>
      </form>
    </div>
  );
};

export default NewTask;
