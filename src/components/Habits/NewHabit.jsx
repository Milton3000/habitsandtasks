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
    };

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
  <input
  type="text"
  placeholder="Activity"
  value={habit}
  onChange={(e) => setHabit(e.target.value)}
  required
/>

      <select className="mx-2" value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High Priority</option>
        <option value="Low">Low Priority</option>
      </select>
      <button className="mx-2" onClick={addHabit}>Add New Habit</button>
    </>
  );
};

export default NewHabit;
