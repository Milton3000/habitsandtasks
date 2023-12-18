import React, { useState } from "react";
import "./Friends.css";

const FriendInfo = ({ friend, showMoreInfo, showHideInfo }) => (
  <div className="friend" onClick={showHideInfo}>
    <img
      className="avatar"
      src={friend.picture}
      alt={`${friend.firstName} ${friend.lastName}`}
    />
    <span className="name">
      {friend.firstName} {friend.lastName}
    </span>
    {showMoreInfo && (
      <div className="details">
        <p>
          <strong>Kön:</strong> {friend.gender}
        </p>
        <p>
          <strong>Email:</strong> {friend.email}
        </p>
        <p>
          <strong>Födelsedatum:</strong>{" "}
          {new Date(friend.dob).toLocaleDateString()}
        </p>
      </div>
    )}
  </div>
);

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const [filters, setFilters] = useState({
    gender: "",
    minAge: "",
    maxAge: "",
  });

  const fetchRandomUser = async () => {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();
    const randomUser = data.results[0];
    const newFriend = {
      firstName: randomUser.name.first,
      lastName: randomUser.name.last,
      email: randomUser.email,
      dob: randomUser.dob.date,
      gender: randomUser.gender,
      picture: randomUser.picture.large,
    };
    setFriends([...friends, newFriend]);
  };

  const callSetFilters = () => {
    setFilters({
      ...filters,
      gender: document.querySelector("#gender").value,
      minAge: document.querySelector("#minAge").value,
      maxAge: document.querySelector("#maxAge").value,
    });
  };

  const showHideInfo = (index) =>
    setSelectedFriend(selectedFriend === index ? null : index);

  const filteredFriends = friends.filter((friend) => {
    const friendAge =
      new Date().getFullYear() - new Date(friend.dob).getFullYear();
    return (
      (filters.gender === "" || friend.gender === filters.gender) &&
      (filters.minAge === "" || friendAge >= parseInt(filters.minAge)) &&
      (filters.maxAge === "" || friendAge <= parseInt(filters.maxAge))
    );
  });

  return (
    <div>
      <button onClick={fetchRandomUser}>Lägg till ny vän</button>

      <div>
        <label>kön:</label>
        <select id="gender">
          <option value="">Alla</option>
          <option value="male">Man</option>
          <option value="female">Kvinna</option>
        </select>
        <label>Min ålder:</label>
        <input id="minAge" type="number" />
        <label>Max ålder:</label>
        <input id="maxAge" type="number" />
        <button onClick={callSetFilters}>Filter</button>
      </div>

      <ul>
        {filteredFriends.map((friend, index) => (
          <li key={index}>
            <FriendInfo
              friend={friend}
              showMoreInfo={selectedFriend === index}
              showHideInfo={() => showHideInfo(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
