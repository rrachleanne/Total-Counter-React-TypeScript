import React, { useState, useEffect } from "react";
import numeral from 'numeral'

export default function FirmCount(): any {
  const [firmCount, setFirmCount] = useState<any>();

  useEffect(() => {
    const apiCall = `./data.json`;
    fetch(apiCall).then((result) =>
      result.json().then((data) => {
        const count = numeral(data.length).format('0,0') ;
        setFirmCount(count);
      })
    );
  });

  return (
    <div>
      <p>Firms: {firmCount}</p>
    </div>
  );
}
