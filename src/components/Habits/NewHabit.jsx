import React, { useState } from 'react';

const NewHabit = ({ onAddHabit }) => {
  const [habit, setHabit] = useState('');
  const [streak] = useState(0);
  const [priority, setPriority] = useState('High');

  const addHabit = () => {
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
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High Priority</option>
        <option value="Low">Low Priority</option>
      </select>
      <button onClick={addHabit}>Add New Habit</button>
    </>
  );
};

export default NewHabit;