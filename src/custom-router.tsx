import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import history from "./utils/history";

import ViewFirms from './components/firms/FirmPage'

export default function CustomRouter(): any {
    return (
      <Router history={history}>
        <div className="App">
       
            <div>
              <Switch>
                <Route path="/" exact component={ViewFirms} />
            
             
              </Switch>
            </div>
       
        </div>
      </Router>
    );
  }