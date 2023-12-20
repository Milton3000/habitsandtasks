import React, { useState } from 'react';
import NewHabit from "./NewHabit";
import './StyleHabits.css';


const Habits = () => {
  let [habits, setHabits] = useState([
    { habit: "Programmera", streak: 2, priority: "Low" },
    { habit: "Prokrastinera", streak: 2, priority: "High" },
    { habit: "Praktisera", streak: 3, priority: "High" },
    { habit: "Panta mera", streak: 3, priority: "High" },
  ]);

  const handleAddHabit = (newHabit) => {
    setHabits((prevHabits) => [...prevHabits, newHabit]);
  };

  let [priorityFilter, setPriorityFilter] = useState("all");
  let [sortOrder, setSortOrder] = useState("none");

  let increaseStreak = (index) => {
    let updatedHabits = [...habits];
    updatedHabits[index].streak += 1;
    setHabits(updatedHabits);
  };

  let decreaseStreak = (index) => {
    let updatedHabits = [...habits];
    if (updatedHabits[index].streak > 0) {
      updatedHabits[index].streak -= 1;
    }
    setHabits(updatedHabits);
  };

  let resetStreak = (index) => {
    let updatedHabits = [...habits];
    updatedHabits[index].streak = 0;
    setHabits(updatedHabits);
  };

  let togglePriority = (index) => {
    let updatedHabits = [...habits];
    updatedHabits[index].priority = updatedHabits[index].priority === 'High' ? 'Low' : 'High';
    setHabits(updatedHabits);
  };

  let handleFilterChange = (event) => {
    setPriorityFilter(event.target.value);
  };

  let handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  let filterByPriority = (habit) => {
    if (priorityFilter === "all") {
      return true;
    }
    return habit.priority === priorityFilter;
  };

  let compareStreaks = (a, b) => {
    if (sortOrder === "asc") {
      return a.streak - b.streak;
    } else if (sortOrder === "desc") {
      return b.streak - a.streak;
    }
    return 0;
  };

  let removeHabit = (index) => {
    let updatedHabits = [...habits];
    updatedHabits.splice(index, 1);
    setHabits(updatedHabits);
  };

  let sortedHabits = habits.filter(filterByPriority).sort(compareStreaks);

  return (
    <>
      <h1>Habits</h1>
      <NewHabit onAddHabit={handleAddHabit} />
      <div>
        <label htmlFor="priorityFilter">Filter by Priority:</label>
        <select id="priorityFilter" value={priorityFilter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="High">High Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        <label htmlFor="sortOrder">Sort by Streaks:</label>
        <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
          <option value="none">None</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className='habits-container'>
      {sortedHabits.map((habit, index) => (
        <div style={
          {
            border: '2px solid black', width: '30rem'
          }
        } key={index}>
          <h2>{habit.habit}</h2>
          <p>
            Streak: {habit.streak}
            <button onClick={() => decreaseStreak(index)}>-</button>
            <button onClick={() => increaseStreak(index)}>+</button>
            <button onClick={() => resetStreak(index)}>Reset</button>
          </p>
          <p>
            Priority: {habit.priority}
            <button onClick={() => togglePriority(index)}>Switch Priority</button>
          </p>
          <button onClick={() => removeHabit(index)}>Remove</button>

        </div>
      ))}
      </div>
    </>
  );
};

export default Habits;
