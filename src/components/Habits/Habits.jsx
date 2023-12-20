import React, { useState } from 'react';
import NewHabit from "./NewHabit";

const Habits = () => {
  let [habits, setHabits] = useState([
    { habit: "Baers", streak: 2, priority: "low" },
    { habit: "Jaern", streak: 2, priority: "high" },
    { habit: "Baers", streak: 3, priority: "high" },
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
    updatedHabits[index].priority = updatedHabits[index].priority === 'high' ? 'low' : 'high';
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

  let sortedHabits = habits.filter(filterByPriority).sort(compareStreaks);

  return (
    <>
      <h1>Habits</h1>
      <NewHabit onAddHabit={handleAddHabit} />
      <div>
        <label htmlFor="priorityFilter">Filter by Priority:</label>
        <select id="priorityFilter" value={priorityFilter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="high">High Priority</option>
          <option value="low">Low Priority</option>
        </select>

        <label htmlFor="sortOrder">Sort by Streaks:</label>
        <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
          <option value="none">None</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      
      {sortedHabits.map((habit, index) => (
        <div key={index}>
          <p>{habit.habit}</p>
          <p>
            Streak: {habit.streak}
            <button onClick={() => increaseStreak(index)}>+</button>
            <button onClick={() => decreaseStreak(index)}>-</button>
            <button onClick={() => resetStreak(index)}>Reset</button>
          </p>
          <p>
            Priority: {habit.priority}
            <button onClick={() => togglePriority(index)}>Switch Priority</button>
          </p>
        </div>
      ))}
    </>
  );
};

export default Habits;
