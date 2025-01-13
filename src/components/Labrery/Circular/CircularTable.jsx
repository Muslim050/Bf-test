import React from "react";
import style from "./CircularBadge.module.scss";

function CircularTable({ count, style: badgeStyle }) {
  return (
    <div className={style.circularTable} style={badgeStyle}>
      {count}
    </div>
  );
}

export default CircularTable;
