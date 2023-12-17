import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./Tasks.module.css";

const Tasks = ({ tasks, setTasks }) => {
  const [filterCategory, setFilterCategory] = useState("");
  const [sortTitleOrder, setSortTitleOrder] = useState("asc");
  const [sortTimeOrder, setSortTimeOrder] = useState("asc");

  const handleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleUntoggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = false;
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmation) {
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

  const filteredTasks = filterCategory
    ? tasks.filter((task) => task.taskType === filterCategory)
    : tasks;

  return (
      <div className="container text-center mt-4">
        {/* OUTLET HÄR, ANVÄNDS I PARENT ROUTE FÖR ATT RENDERA CHILD ROUTE ELEMENTS */}
        <div>
          <Outlet />
        </div>

        <div>
          <h2> Task List </h2>
        </div>
        <nav className="text-center mt-4">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link to="/tasks/new" className="nav-link fs-4">New Task</Link>
          </li>
        </ul>
      </nav>
      
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="form-floating">
              <select
                className="form-select"
                id="floatingSelect"
                onChange={(e) => handleFilterCategory(e.target.value)}
              >
                <option value="">All</option>
                <option value="Household">Household Chores</option>
                <option value="Social">Social Activity</option>
                <option value="Work">Work-related Task</option>
                <option value="School">School-related Task</option>
                <option value="Leisure">Leisure Activity</option>
              </select>
              <label htmlFor="floatingSelect">Filter by Category</label>
            </div>
          </div>

          <div className="col-md-4">
            <button
              className="btn btn-sm btn-outline-info m-2"
              onClick={handleSortTitle}
            >
              Sort by Title
            </button>
            <button
              className="btn btn-sm btn-outline-info m-2"
              onClick={handleSortTime}
            >
              Sort by Time
            </button>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-6">
            <h3> Ongoing Tasks </h3>
            <ul>
              {filteredTasks
                .filter((task) => !task.completed)
                .map((task, index) => (
                  <li key={index}>
                    <strong> Title: {task.title}</strong>
                    <p> Description: {task.description}</p>
                    <p>Estimated Time: {task.timeEstimate} minutes</p>
                    <p> Type: {task.taskType}</p>
                    <button
                      className={
                        task.completed ? "text-success" : "text-danger"
                      }
                      onClick={() => handleCompleteTask(index)}
                    >
                      {task.completed ? "Completed" : "Not Completed"}
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
                  </li>
                ))}
            </ul>
          </div>

          <div className="col-md-6">
            <h3>Completed Tasks</h3>
            <ul>
              {filteredTasks
                .filter((task) => task.completed)
                .map((task, index) => (
                  <li key={index}>
                    <strong> Title: {task.title}</strong>
                    <p> Description: {task.description}</p>
                    <p> Estimated Time: {task.timeEstimate} minutes</p>
                    <p> Type: {task.taskType}</p>
                    <button
                      className="text-success"
                      onClick={() => handleUntoggleTask(index)}
                    >
                      Completed
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
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

  );
};

export default Tasks;
