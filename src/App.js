import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import Habits from "./components/Habits/Habits";
import Friends from "./components/Friends/Friends"; // Import Friends component

function App() {
  const initialHabits = [
    { habit: "Programmera", streak: 2, priority: "Low" },
    { habit: "Prokrastinera", streak: 2, priority: "High" },
    { habit: "Praktisera", streak: 3, priority: "High" },
    { habit: "Panta mera", streak: 3, priority: "High" },
  ];

  const [habits, setHabits] = useState(initialHabits);

  const initialTasks = [
    {
      id: 0,
      title: "Coding",
      description: "Reviewing Hooks & Props",
      timeEstimate: 60,
      taskType: "School",
      completed: false,
    },
    {
      id: 1,
      title: "MealPrep",
      description: "Prepare meals for the upcoming week",
      timeEstimate: 90,
      taskType: "Household",
      completed: false,
    },
    {
      id: 2,
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
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ marginLeft: "auto", marginRight: "auto", display: "table" }}>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/tasks" className="nav-link">
                Tasks
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/habits" className="nav-link">
                Habits
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/friends" className="nav-link">
                Friends
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div style={{ backgroundImage: "url('https://images.unsplash.com/photo-1639056496887-3caaa605609b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", backgroundSize: "50%", backgroundRepeat: "no-repeat", backgroundPosition: "center", minHeight: "50vh", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "10px" }}></div>
      <Routes>
      <Route path="/" element={<Home tasks={tasks} habits={habits} />} />
        <Route path="/tasks/*" element={<Tasks tasks={tasks} setTasks={setTasks} />} />
        <Route path="/tasks/new" element={<NewTask tasks={tasks} setTasks={setTasks} />} />
        <Route path="/habits" element={<Habits habits={habits} setHabits={setHabits} />} />
        <Route path="/friends" element={<Friends />} />
      </Routes>
    </>
  );
}

export default App;
