import React, { useState } from "react";

const Tasks = ({ tasks, setTasks }) => {
  const [filterCategory, setFilterCategory] = useState("");
  const [sortTitleOrder, setSortTitleOrder] = useState("asc");
  const [sortTimeOrder, setSortTimeOrder] = useState("asc");

  const handleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmDelete) {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
    }
  };

  const handleEditTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTask };
    setTasks(updatedTasks);
  };

  const handleFilterCategory = (category) => {
    setFilterCategory(category);
  };

  const handleSortTitle = () => {
    const sortedTasks = [...tasks].sort((a, b) =>
      sortTitleOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
    setTasks(sortedTasks);
    setSortTitleOrder(sortTitleOrder === "asc" ? "desc" : "asc");
  };

  const handleSortTime = () => {
    const sortedTasks = [...tasks].sort((a, b) =>
      sortTimeOrder === "asc"
        ? a.timeEstimate - b.timeEstimate
        : b.timeEstimate - a.timeEstimate
    );
    setTasks(sortedTasks);
    setSortTimeOrder(sortTimeOrder === "asc" ? "desc" : "asc");
  };

  const ongoingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div>
      <h2>Task List</h2>
      <div>
        <label>Filter by Category:</label>
        <select onChange={(e) => handleFilterCategory(e.target.value)}>
          <option value="">All</option>
          <option value="household">Household Chores</option>
          <option value="social">Social Activity</option>
          <option value="work">Work-related Task</option>
          <option value="school">School-related Task</option>
          <option value="leisure">Leisure Activity</option>
        </select>
      </div>
      <div>
        <label>Sort by Title:</label>
        <button onClick={handleSortTitle}>Toggle</button>
      </div>
      <div>
        <label>Sort by Time Estimate:</label>
        <button onClick={handleSortTime}>Toggle</button>
      </div>
      <div>
        <h3>Ongoing Tasks</h3>
        <ul>
          {ongoingTasks.map((task, index) => (
            <li key={index}>
              <strong>Title: {task.title}</strong>
              <p>Description: {task.description}</p>
              <p>Time Estimate: {task.timeEstimate}</p>
              <p>Type: {task.taskType}</p>
              {task.completed ? (
                <p>Completed</p>
              ) : (
                <>
                  <button onClick={() => handleCompleteTask(index)}>
                    Toggle Complete
                  </button>
                  <button onClick={() => handleDeleteTask(index)}>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      const updatedTask = prompt(
                        "Edit task:",
                        JSON.stringify(task)
                      );
                      if (updatedTask) {
                        handleEditTask(index, JSON.parse(updatedTask));
                      }
                    }}
                  >
                    Edit
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Completed Tasks</h3>
        <ul>
          {completedTasks.map((task, index) => (
            <li key={index}>
              <strong>Title: {task.title}</strong>
              <p>Description: {task.description}</p>
              <p>Time Estimate: {task.timeEstimate}</p>
              <p>Type: {task.taskType}</p>
              <p>Completed</p>
              <button onClick={() => handleDeleteTask(index)}>Delete</button>
              <button
                onClick={() => {
                  const updatedTask = prompt(
                    "Edit task:",
                    JSON.stringify(task)
                  );
                  if (updatedTask) {
                    handleEditTask(index, JSON.parse(updatedTask));
                  }
                }}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tasks;
