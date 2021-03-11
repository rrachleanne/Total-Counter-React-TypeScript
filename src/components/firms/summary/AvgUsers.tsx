import React, { useState, useEffect } from "react";
import numeral from "numeral";

export default function AvgUserCount(): any {
  const [avgCount, setAvgCount] = useState<any>();

  useEffect(() => {
    const apiCall = `./data.json`;
    fetch(apiCall).then((result) =>
      result.json().then((data) => {
        const firms = data.length;

        const user = data.reduce(
          (accumulator: any, currentValue: any) =>
            accumulator + currentValue.numberOfUsers,
          0
        );
        const average = numeral(user / firms).format("0.0");

        setAvgCount(average);
      })
    );
  });

  return (
    <div>
      <p>Users: {avgCount}</p>
    </div>
  );
}
