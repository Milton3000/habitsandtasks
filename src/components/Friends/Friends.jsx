import React, { useState } from "react";
import "./Friends.css";

const FriendDetails = ({ friend, showMoreInfo, showHideInfo }) => (
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

  const showHideInfo = (index) =>
    setSelectedFriend(selectedFriend === index ? null : index);

  return (
    <div>
      <button onClick={fetchRandomUser}>Lägg till ny vän</button>
      <ul>
        {friends.map((friend, index) => (
          <li key={index}>
            <FriendDetails
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
