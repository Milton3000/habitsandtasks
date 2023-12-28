import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import Habits from "./components/Habits/Habits";
import Friends from "./components/Friends/Friends";
import Navigation from "./components/Navigation";
import DateTimeDisplay from "./components/DateTimeDisplay";
import BackgroundImage from "./components/BackgroundImage";

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

  return (
    <>
      <Navigation />
      <BackgroundImage>
        <DateTimeDisplay dateTime={currentDateTime} />
        </BackgroundImage>
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
