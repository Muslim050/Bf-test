import React from "react";

function FormatterView(props) {
  const number = props.data;
  const formattedNumber = number ? number.toLocaleString("ru-RU") : "";
  return (
    <div>
      <div>{formattedNumber}</div>
    </div>
  );
}

export default FormatterView;
