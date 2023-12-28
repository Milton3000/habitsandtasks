import React, { useState } from "react";
import NewHabit from "./NewHabit";
import "./StyleHabits.css";

const Habits = ({ habits, setHabits }) => {

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
    updatedHabits[index].priority =
      updatedHabits[index].priority === "High" ? "Low" : "High";
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
    return habit.priority.toLowerCase() === priorityFilter.toLowerCase();
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
      <div
        className="container text-center mt-4 text-light"
        style={{
          background: "linear-gradient(to bottom right, #4b6cb7, #182848)",
          minHeight: "100vh",
        }}
      >
        <div className="container mt-4">
          <h1 className="monospace fw-bold text-center display-6">Habits</h1>
          <NewHabit onAddHabit={handleAddHabit} />
          <div className="d-flex justify-content-center mt-3">
            <div className="m-2">
              <label htmlFor="priorityFilter" className="form-label">
                Filter by Priority:
              </label>
              <select
                id="priorityFilter"
                value={priorityFilter}
                onChange={handleFilterChange}
                className="form-select"
              >
                <option value="all">All</option>
                <option value="High">High Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
            <div className="m-2">
              <label htmlFor="sortOrder" className="form-label">
                Sort by Streaks:
              </label>
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={handleSortChange}
                className="form-select"
              >
                <option value="none">None</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="container d-flex flex-wrap justify-content-center mt-3">
          {sortedHabits.map((habit, index) => (
            <div
              className="card m-2"
              key={index}
              style={{ width: "18rem", minWidth: "250px" }}
            >
              <div className="card-body">
                <h2 className="card-title">{habit.habit}</h2>
                <ul className="list-unstyled">
                  <li>Streak: {habit.streak}</li>
                  <li>Priority: {habit.priority}</li>
                </ul>
                <div className="d-flex justify-content-between">
                  <div className="btn-group">
                    <button
                      className="btn btn-secondary"
                      onClick={() => decreaseStreak(index)}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => increaseStreak(index)}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => resetStreak(index)}
                    >
                      Reset
                    </button>
                  </div>
                  <button
                    className="btn btn-warning"
                    onClick={() => togglePriority(index)}
                  >
                    Priority
                  </button>
                  <button
                    className="remove-button"
                    onClick={() => removeHabit(index)}
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Habits;