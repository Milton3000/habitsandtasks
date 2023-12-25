import React, { useState, useEffect } from "react";
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

const Friends = ({ showButtons = true }) => {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [filters, setFilters] = useState({
    gender: "",
    minAge: "",
    maxAge: "",
  });
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    const fetchInitialFriends = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=5");
        const data = await response.json();
        const initialFriends = data.results.map((randomUser) => ({
          firstName: randomUser.name.first,
          lastName: randomUser.name.last,
          email: randomUser.email,
          dob: randomUser.dob.date,
          gender: randomUser.gender,
          picture: randomUser.picture.large,
        }));
        setFriends(initialFriends);
      } catch (error) {
        console.error("Error fetching initial friends:", error);
      }
    };

    fetchInitialFriends();
  }, []);

  const fetchRandomUser = async () => {
    try {
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
    } catch (error) {
      console.error("Error fetching random user:", error);
    }
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

  const doSort = (sortItem) => setSortBy(sortBy === sortItem ? null : sortItem);

  const filteredFriends = friends
    .filter((friend) => {
      const friendAge =
        new Date().getFullYear() - new Date(friend.dob).getFullYear();
      return (
        (filters.gender === "" || friend.gender === filters.gender) &&
        (filters.minAge === "" || friendAge >= parseInt(filters.minAge)) &&
        (filters.maxAge === "" || friendAge <= parseInt(filters.maxAge))
      );
    })
    .sort((a, b) => {
      if (sortBy === "firstName") return a.firstName.localeCompare(b.firstName);
      else if (sortBy === "lastName")
        return a.lastName.localeCompare(b.lastName);
      else if (sortBy === "age")
        return new Date(a.dob).getFullYear() - new Date(b.dob).getFullYear();
      return 0;
    });

  const resetFilters = () => {
    setFilters({
      gender: "",
      minAge: "",
      maxAge: "",
    });
    document.querySelector("#gender").value = "";
    document.querySelector("#minAge").value = "";
    document.querySelector("#maxAge").value = "";
  };

  return (
    <div>
      {showButtons && (
        <button onClick={fetchRandomUser} className="customButton">
          Lägg till ny vän
        </button>
      )}

      {showButtons && (
        <div>
          <label className="label">Kön:</label>
          <select id="gender" className="select">
            <option value="">Alla</option>
            <option value="male">Man</option>
            <option value="female">Kvinna</option>
          </select>
          <label className="label">Min ålder:</label>
          <input id="minAge" type="number" className="input" />
          <label className="label">Max ålder:</label>
          <input id="maxAge" type="number" className="input" />
          <button onClick={callSetFilters} className="customButton">
            Filter
          </button>
          <button onClick={resetFilters} className="customButton">
            Reset
          </button>
        </div>
      )}

      {showButtons && (
        <div>
          <button onClick={() => doSort("firstName")} className="customButton">
            Sortera efter förnamn
          </button>
          <button onClick={() => doSort("lastName")} className="customButton">
            Sortera efter efternamn
          </button>
          <button onClick={() => doSort("age")} className="customButton">
            Sortera efter ålder
          </button>
        </div>
      )}

      <ul>
        {filteredFriends.map((friend, index) => (
          <div key={index}>
            <FriendInfo
              friend={friend}
              showMoreInfo={selectedFriend === index}
              showHideInfo={() => showHideInfo(index)}
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
