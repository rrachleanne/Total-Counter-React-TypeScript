import React from "react";

import FirmList from "./Firms";
import Summary from "./summary/Summary";


export default function ViewFirms() {
  return (

      <div className="wrapper">
        <div className="outer-div">
          <h3>Firms</h3>
          <div className="grid-wrapper">
            <Summary/>
            <FirmList />
          </div>
        </div>
      </div>

  );
}
