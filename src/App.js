import React, { useState } from "react";
import Home from "./components/Home/Home";
import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";

function App() {

  const initialTasks = [
    {
      title: "Coding",
      description: "Reviewing Hooks & Props",
      timeEstimate: 60,
      taskType: "School-related Task",
      completed: false,
    },
    {
      title: "MealPrep",
      description: "Prepare meals for the upcoming week",
      timeEstimate: 90,
      taskType: "Household Chores",
      completed: false,
    },
    {
      title: "Group Meeting",
      description: "Project meeting to coordinate and update about the process",
      timeEstimate: 10,
      taskType: "work",
      completed: true, 
    },
  ];

  const [tasks, setTasks] = useState(initialTasks);

  return (
    <>
      <Home />
      <Tasks tasks={tasks} setTasks={setTasks} />
      <NewTask tasks={tasks} setTasks={setTasks} />
    </>
  );
}

export default App;
