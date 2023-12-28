import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import Habits from "./components/Habits/Habits";
import Friends from "./components/Friends/Friends";
import Navigation from "./components/Navigation";

function App() {
  const initialHabits = [
    { habit: "Morning Workout (15 min)", streak: 2, priority: "Low" },
    { habit: "50 Daily Push-ups", streak: 2, priority: "High" },
    { habit: "Early Morning", streak: 3, priority: "High" },
    { habit: "Evening Vitamins", streak: 3, priority: "High" },
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
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = new Intl.DateTimeFormat("sv-SE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(currentDateTime);

  const formattedTime = new Intl.DateTimeFormat("sv-SE", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Europe/Stockholm",
  }).format(currentDateTime);

  return (
    <>
      <Navigation />
      <div
  className="container position-relative"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1639056496887-3caaa605609b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "50vh",
    borderRadius: "10px",
  }}
>

<div
  className="card"
  style={{
    background: "rgba(255, 255, 255, 0.8)",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    position: "absolute",
    top: "20px",
    left: "20px",
    bottom: "20px",
    width: "auto",
    maxWidth: "180px",
  }}
>
  <h3 className="fw-bold mb-4">Today's Date:</h3>
  <p className="text-md">{formattedDate}</p>
  <h3 className="fw-bold mt-4 mb-4">Current Time:</h3>
  <p className="text-md">{formattedTime}</p>
</div>
</div>

      <Routes>
        <Route path="/" element={<Home tasks={tasks} habits={habits} />} />
        <Route
          path="/tasks/*"
          element={<Tasks tasks={tasks} setTasks={setTasks} />}
        />
        <Route
          path="/tasks/new"
          element={<NewTask tasks={tasks} setTasks={setTasks} />}
        />
        <Route
          path="/habits"
          element={<Habits habits={habits} setHabits={setHabits} />}
        />
        <Route path="/friends" element={<Friends />} />
      </Routes>
    </>
  );
}

export default App;
