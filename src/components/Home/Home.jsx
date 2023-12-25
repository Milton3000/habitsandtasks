import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup } from "react-bootstrap";
import Friends from "../Friends/Friends";


const Home = ({ tasks }) => {
  return (
    <div
      className="container text-center mt-4 text-light"
      style={{
        background: "linear-gradient(to bottom right, #4b6cb7, #182848)",
        minHeight: "100vh",
      }}
    >
      <h2 className="mt-4 mb-4 text-center monospace fw-bold">Habits & Tasks</h2>
      <ListGroup>
        {tasks.map((task, index) => (
          <ListGroup.Item
            key={index}
            className="mb-3 p-4"
            style={{ background: "rgba(255, 255, 255, 0.8)" }}
          >
            <h4 className="mb-2">{task.title}</h4>
            <p>Description: {task.description}</p>
            <p>Estimated Time: {task.timeEstimate} minutes</p>
            <p>Type: {task.taskType}</p>
            {task.completed ? (
              <p className="text-success">Completed</p>
            ) : (
              <p className="text-danger">Not Completed</p>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h2> Newly Added Friends ❤️ </h2>
      <Friends showButtons={false} />
    </div>
  );
};

export default Home;
