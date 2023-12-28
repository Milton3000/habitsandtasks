import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const Tasks = ({ tasks, setTasks }) => {
  const [filterCategory, setFilterCategory] = useState("");
  const [sortTitleOrder, setSortTitleOrder] = useState("asc");
  const [sortTimeOrder, setSortTimeOrder] = useState("asc");
  const [editedTask, setEditedTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleCompleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  const handleUntoggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: false } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmation) {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    }
  };

  const handleEditTask = (task) => {
    setEditedTask(task);
    setShowEditModal(true);
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

  const handleEditTaskField = (field, value) => {
    setEditedTask((prevTask) => ({ ...prevTask, [field]: value }));
  };

  const handleSaveEditedTask = () => {
    if (editedTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editedTask.id ? { ...editedTask } : task
        )
      );
      handleCloseEditModal();
    }
  };

  const filteredTasks = filterCategory
    ? tasks.filter((task) => task.taskType === filterCategory)
    : tasks;

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditedTask(null);
  };

  return (
    <div
      className="container text-center mt-4 text-light"
      style={{
        background: "linear-gradient(to bottom right, #4b6cb7, #182848)",
        minHeight: "100vh",
      }}
    >
      <div>
        <Outlet />
      </div>

      <div>
        <h2 className="monospace fw-bold display-6"> Task List </h2>
      </div>
      <nav className="text-center mt-4">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link to="/tasks/new" className="btn btn-primary">
              Add New Task
            </Link>
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
            className="btn btn-sm btn-outline-light m-2"
            onClick={handleSortTitle}
          >
            Sort by Title
          </button>
          <button
            className="btn btn-sm btn-outline-light m-2"
            onClick={handleSortTime}
          >
            Sort by Time
          </button>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <h3 className="monospace fw-bold"> Ongoing Tasks </h3>
          <ul className="list-group">
            {filteredTasks
              .filter((task) => !task.completed)
              .map((task) => (
                <li key={task.id} className="list-group-item">
                  <strong>{task.title}</strong>
                  <p> Description: {task.description}</p>
                  <p>Estimated Time: {task.timeEstimate} minutes</p>
                  <p> Type: {task.taskType}</p>
                  <button
                    className={
                      task.completed
                        ? "btn btn-success btn-sm"
                        : "btn btn-dark mx-2 btn-sm"
                    }
                    onClick={() => handleCompleteTask(task.id)}
                  >
                    {task.completed ? "Completed" : "Click to Complete"}
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-warning mx-2 btn-sm"
                    onClick={() => handleEditTask(task)}
                  >
                    Edit
                  </button>
                </li>
              ))}
          </ul>
        </div>

        <div className="col-md-6">
          <h3 className="monospace fw-bold">Completed Tasks</h3>
          <ul className="list-group">
            {filteredTasks
              .filter((task) => task.completed)
              .map((task) => (
                <li key={task.id} className="list-group-item">
                  <strong> {task.title}</strong>
                  <p> Description: {task.description}</p>
                  <p> Estimated Time: {task.timeEstimate} minutes</p>
                  <p> Type: {task.taskType}</p>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleUntoggleTask(task.id)}
                  >
                    Completed
                  </button>
                  <button
                    className="btn btn-danger mx-2 btn-sm"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEditTask(task)}
                  >
                    Edit
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="editTitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="editTitle"
              value={editedTask ? editedTask.title : ""}
              onChange={(e) => handleEditTaskField("title", e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="editDescription" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="editDescription"
              value={editedTask ? editedTask.description : ""}
              onChange={(e) =>
                handleEditTaskField("description", e.target.value)
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="editTimeEstimate" className="form-label">
              Estimated Time (minutes)
            </label>
            <input
              type="number"
              className="form-control"
              id="editTimeEstimate"
              value={editedTask ? editedTask.timeEstimate : 0}
              onChange={(e) =>
                handleEditTaskField(
                  "timeEstimate",
                  parseInt(e.target.value, 10) || 0
                )
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEditedTask}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Tasks;
