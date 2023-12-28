import React, { useState } from 'react';

const NewHabit = ({ onAddHabit }) => {
  const [habit, setHabit] = useState('');
  const [streak] = useState(0);
  const [priority, setPriority] = useState('High');

  const addHabit = (e) => {
    e.preventDefault();
    if (!habit.trim()) {
      alert('Please enter an activity before adding.');
      return;
    }

    const newHabit = {
      habit,
      streak,
      priority,
    };
    onAddHabit(newHabit);
    setHabit('');
    setPriority('High');
  };

  return (
    <>
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Activity"
              value={habit}
              onChange={(e) => setHabit(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select mb-2"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">High Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
          <div className="col-md-3">
            <button className="btn btn-success w-100" onClick={addHabit}>
              Add New Habit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHabit;
