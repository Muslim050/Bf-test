import React from "react";
function formatPhoneNumber(phoneNumber) {
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  if (cleaned.length === 12) {
    const countryCode = cleaned.slice(0, 3);
    const areaCode = cleaned.slice(3, 5);
    const firstPart = cleaned.slice(5, 8);
    const secondPart = cleaned.slice(8, 10);
    const thirdPart = cleaned.slice(10, 12);

    return `+${countryCode} (${areaCode}) ${firstPart}-${secondPart}-${thirdPart}`;
  }

  return phoneNumber;
}

function FormatterPhone({ phoneNumber }) {
  return <span>{formatPhoneNumber(phoneNumber)}</span>;
}

export default FormatterPhone;
