import React from "react";

function NotFound() {
  return (
    <div
      style={{
        height: "100vh",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontSize: "48px",
          fontWeight: "600",
          lineHeight: "58px",
          textAlign: "center",
        }}
      >
        404 Not Found
        <div style={{ fontSize: "14px", fontWeight: "400", color: "#8d8c8c" }}>
          Извините, мы не можем найти эту страницу.
        </div>
      </div>
    </div>
  );
}

export default NotFound;
