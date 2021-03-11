import React, { useState, useEffect } from "react";
import numeral from "numeral";

export default function CombindCount(): any {
  const [firmCount, setFirmCount] = useState<any>();
  const [userCount, setUserCount] = useState<any>();
  const [avgCount, setAvgCount] = useState<any>();
  const [enabledCount, setEnabledCount] = useState<any>();

  useEffect(() => {
    const apiCall = `./data.json`;
    fetch(apiCall).then((result) =>
      result.json().then((data) => {
        //FIRM COUNT
        const countFirms = numeral(data.length).format("0,0");
        setFirmCount(countFirms);
        //USER COUNT
        const userCount = data.reduce(
          (accumulator: any, currentValue: any) =>
            accumulator + currentValue.numberOfUsers,
          0
        );
        const formatUser = numeral(userCount).format("0,0");
        setUserCount(formatUser);
        // AVERAGE USER COUNT
        const firmTotal = data.length;

        const avgUser = data.reduce(
          (accumulator: any, currentValue: any) =>
            accumulator + currentValue.numberOfUsers,
          0
        );
        const average = numeral(avgUser / firmTotal).format("0.0");

        setAvgCount(average);
        //ENABLED USER COUNT
        let counterEnabled = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].statusDescription === "Enabled") counterEnabled++;
        }
        console.log(counterEnabled);

        const formatEnabled = numeral(counterEnabled).format("0,0");

        setEnabledCount(formatEnabled);

      })
    );
  });

  return (
    <div>
      <p>Firms: {firmCount}</p>
      <p>Users: {userCount}</p>
      <p>Users: {avgCount}</p>
      <p>Firms Enabled: {enabledCount}</p>
    </div>
  );
}
