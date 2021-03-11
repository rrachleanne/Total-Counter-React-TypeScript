import React, { useState, useEffect } from "react";
import numeral from "numeral";

export default function FirmEnabled(): any {
  const [enabledCount, setEnabledCount] = useState<any>();

  useEffect(() => {
    const apiCall = `./data.json`;
    fetch(apiCall).then((result) =>
      result.json().then((data) => {
        let counter = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].statusDescription === "Enabled") counter++;
        }
        console.log(counter);

        const format = numeral(counter).format("0,0");

        setEnabledCount(format);
      })
    );
  });

  return (
    <div>
      <p>Firms Enabled: {enabledCount}</p>
    </div>
  );
}
