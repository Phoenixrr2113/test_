import React from "react";
import PhysiciansList from "./components/Physicians";
import Appointments from "./components/Appointments";
import {Grid } from "@material-ui/core";

function App() {
  return (
    <div className="App">
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <PhysiciansList />
        </Grid>
        <Grid item md={6} xs={12}>
          <Appointments />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
