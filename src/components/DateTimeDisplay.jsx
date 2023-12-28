import React from "react";

const DateTimeDisplay = ({ dateTime }) => {
  const formattedDate = new Intl.DateTimeFormat("sv-SE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateTime);

  const formattedTime = new Intl.DateTimeFormat("sv-SE", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Europe/Stockholm",
  }).format(dateTime);

  return (
    <div
      className="card"
      style={{
        background: "rgba(255, 255, 255, 0.8)",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
        position: "absolute",
        top: "20px",
        left: "20px",
        bottom: "20px",
        width: "auto",
        maxWidth: "180px",
      }}
    >
      <h3 className="fw-bold mb-4">Today's Date:</h3>
      <p className="text-md">{formattedDate}</p>
      <h3 className="fw-bold mt-4 mb-4">Current Time:</h3>
      <p className="text-md">{formattedTime}</p>
    </div>
  );
};

export default DateTimeDisplay;
