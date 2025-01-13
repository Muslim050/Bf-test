import React from "react";

function FormatterTime({ data }) {
  const formatTime = (data) => {
    const hours = Math.floor(data / 3600);
    const paddedHours = String(hours).padStart(2, "0");
    const minutes = Math.floor((data % 3600) / 60);
    const paddedMinutes = String(minutes).padStart(2, "0");
    const seconds = data % 60;
    const paddedSeconds = String(seconds).padStart(2, "0");
    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  };
  return <div>{formatTime(data)}</div>;
}

export default FormatterTime;
