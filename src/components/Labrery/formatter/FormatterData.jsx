import React from "react";

function FormatterData(props) {
  const dateStr = props.data;

  // Check if dateStr is not a string or is null/empty
  if (typeof dateStr !== "string" || !dateStr.trim()) {
    return <div>No valid date provided.</div>;
  }

  const dateParts = dateStr.split("/");

  // Check if the split operation resulted in three parts
  if (dateParts.length !== 3) {
    return <div>Invalid date format.</div>;
  }

  const day = dateParts[0];
  const month = dateParts[1];
  const year = dateParts[2];

  const formattedDate = `${day}.${month}.${year}`;

  return (
    <div>
      <div>{formattedDate}</div>
    </div>
  );
}

export default FormatterData;
