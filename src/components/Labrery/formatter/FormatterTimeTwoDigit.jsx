import React from "react";
function FormatterTimeTwoDigit({ data }) {
  const formatTime = (data) => {
    const minutes = Math.floor(data / 60);
    const paddedMinutes = String(minutes).padStart(2, "0");
    const seconds = data % 60;
    const paddedSeconds = String(seconds).padStart(2, "0");
    return `${paddedSeconds}:${paddedMinutes}`;
  };
  return <div>{formatTime(data)}</div>;
}

export default FormatterTimeTwoDigit;
