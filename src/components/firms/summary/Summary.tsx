import react from "react";
import FirmCount from "./FirmCount";
import UserCount from "./UserCount";
import AvgUserCount from './AvgUsers'
import FirmEnabled from './FirmEnabled'
import CombindCount from './CombindCounters'

export default function Summary(): any {
  return (
    <div>
      <h1>Summary</h1>
      <h4>Firm Count:</h4>
      <FirmCount />
      <h4>User Count</h4>
      <UserCount />
      <h4>Average Users</h4>
      <AvgUserCount />
      <h4>Enabled Accounts</h4>
      <FirmEnabled />
      <h4>Combind Accounts</h4>
      <CombindCount />
    </div>
  );
}
