import React, { useEffect, useState } from "react";

const NewTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeEstimate, setTimeEstimate] = useState("");
  const [taskType, setTaskType] = useState("");
  const [suggestedActivity, setSuggestedActivity] = useState("");
  const [tasks, setTasks] = useState([]); // New state för task storage.

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
    <div>
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
          <option value="household">Household Chores</option>
          <option value="social">Social Activity</option>
          <option value="work">Work-related Task</option>
          <option value="school">School-related Task</option>
          <option value="leisure">Leisure Activity</option>
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

      <div>
        <h2> Tasks </h2>
        {tasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                <strong>{task.title}</strong>
                <p>{task.description}</p>
                <p>Time Estimate: {task.timeEstimate}</p>
                <p>Type: {task.taskType}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NewTask;
