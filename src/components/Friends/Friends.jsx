import React, { useState, useEffect } from "react";
import "./Friends.css";

// Component to display friend less/more information
const FriendInfo = ({ friend, showMoreInfo, showHideInfo }) => (
  <div className="friend" onClick={showHideInfo}>
    {/* Display basic friend information */}
    <img
      className="avatar"
      src={friend.picture}
      alt={`${friend.firstName} ${friend.lastName}`}
    />
    <span className="name">
      {friend.firstName} {friend.lastName}
    </span>
    {/* Show additional information if 'showMoreInfo' is true */}
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

// Friends list components
const Friends = ({ showButtons = true, maxFriends }) => {
  // State hooks to manage friends, selected friend, filters, and sorting
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [filters, setFilters] = useState({
    gender: "",
    minAge: "",
    maxAge: "",
  });
  const [sortBy, setSortBy] = useState(null);

  // Fetch and store friends from local storage and then get (e.g. 5) recently added friends which will be shown on home page
  useEffect(() => {
    const savedFriends = localStorage.getItem("friends");
    const parsedFriends = savedFriends ? JSON.parse(savedFriends) : [];
    const limitedFriends = parsedFriends.slice(
      Math.max(parsedFriends.length - maxFriends, 0)
    );
    setFriends(limitedFriends);
  }, [maxFriends]);

  // Fetch a random user from an API and add to the friends list
  const fetchRandomUser = async () => {
    try {
      // Fetch data
      const response = await fetch("https://randomuser.me/api");
      const data = await response.json();
      const randomUser = data.results[0];

      // Create new friend object
      const newFriend = {
        firstName: randomUser.name.first,
        lastName: randomUser.name.last,
        email: randomUser.email,
        dob: randomUser.dob.date,
        gender: randomUser.gender,
        picture: randomUser.picture.large,
      };

      // Update friends list and local storage
      const updatedFriends = [...friends, newFriend];
      setFriends(updatedFriends);
      localStorage.setItem("friends", JSON.stringify(updatedFriends));
    } catch (error) {
      console.error("Error fetching random user:", error);
    }
  };

  // Set filters based on user input
  const callSetFilters = () => {
    setFilters({
      ...filters,
      gender: document.querySelector("#gender").value,
      minAge: document.querySelector("#minAge").value,
      maxAge: document.querySelector("#maxAge").value,
    });
  };

  // Toggle visibility of friend details
  const showHideInfo = (index) =>
    setSelectedFriend(selectedFriend === index ? null : index);

  // Sort friends based on selected criteria
  const doSort = (sortItem) => setSortBy(sortBy === sortItem ? null : sortItem);

  // Filter and sort friends based on user-defined criteria
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

  // Clear filter values
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

  // Render friend list with filtered and sorted data
  return (
    <div className="friends-container">
      {/* Button to fetch a random user */}
      {showButtons && (
        <button onClick={fetchRandomUser} className="customButton">
          Lägg till ny vän
        </button>
      )}

      {/* Filter options */}
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

      {/* Sorting options */}
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

      {/* Reverse the friends list and then render the list, so the last added friend will be shown on top  */}
      <ul>
        {filteredFriends.reverse().map((friend, index) => (
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
