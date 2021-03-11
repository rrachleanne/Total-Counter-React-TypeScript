import React, { useState, useEffect } from "react";
import numeral from "numeral";

export default function UserCount(): any {
  const [userCount, setUserCount] = useState<any>();

  useEffect(() => {
    const apiCall = `./data.json`;
    fetch(apiCall).then((result) =>
      result.json().then((data) => {
        const user = data.reduce(
          (accumulator: any, currentValue: any) =>
            accumulator + currentValue.numberOfUsers,
          0
        );
        const format = numeral(user).format('0,0')
        // console.log(user)
        // console.log(userCount)
        // const count = data.numberOfUsers.length
        setUserCount(format);
      })
    );
  });

  return (
    <div>
      <p>Users: {userCount}</p>
    </div>
  );
}
