import React from "react";
import style from "./CircularBadge.module.scss";

function CircularBadge({ count = "", style: badgeStyle }) {
  return (
    <div className={style.circularBadge} style={badgeStyle}>
      {count}
    </div>
  );
}

export default CircularBadge;
