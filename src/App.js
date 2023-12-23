import Friends from "./components/Friends/Friends";
import Habits from "./components/Habits/Habits";
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";

function App() {
  const initialTasks = [
    {
      title: "Coding",
      description: "Reviewing Hooks & Props",
      timeEstimate: 60,
      taskType: "School",
      completed: false,
    },
    {
      title: "MealPrep",
      description: "Prepare meals for the upcoming week",
      timeEstimate: 90,
      taskType: "Household",
      completed: false,
    },
    {
      title: "Group Meeting",
      description: "Project meeting to coordinate and update about the process",
      timeEstimate: 10,
      taskType: "Work",
      completed: true,
    },
  ];

  const [tasks, setTasks] = useState(initialTasks);

  return (
    <>
      <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ marginLeft: 'auto', marginRight: 'auto', display: 'table' }}>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to="/" className="nav-link">Home</Link>
      </li>
      <li className="nav-item">
        <Link to="/tasks" className="nav-link">Tasks</Link>
      </li>
      <li className="nav-item">
        <Link to="/habits" className="nav-link">Habits</Link>
      </li>
    </ul>
  </div>
</nav>





        <Routes>
          <Route path="/" element={<Home tasks={tasks} />} />
          <Route
            path="/tasks/*"
            element={<Tasks tasks={tasks} setTasks={setTasks} />}
          />
          <Route
            path="/tasks/new"
            element={<NewTask tasks={tasks} setTasks={setTasks} />}
          />
          <Route path="/habits" element={<Habits />} />
        </Routes>
      </div>
      <br/>
      <Friends />
    </>
  );
}

export default App;
