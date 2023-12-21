import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup } from "react-bootstrap";

const Home = ({ tasks }) => {
  return (
    <div className="justify-content-center">
      <h2 className="mt-4 mb-4"> Home </h2>
      <ListGroup>
        {tasks.map((task, index) => (
          <ListGroup.Item key={index} className="mb-3">
            <h4 className="mb-2">Title: {task.title}</h4>
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
    </div>
  );
};

export default Home;
