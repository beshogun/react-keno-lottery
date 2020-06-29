import React from "react";
import KenoGrid from "./components/keno_grid/kenogrid.component";
import GridState from "./context/grid/gridState";
import "./App.styles.scss";

function App() {
  return (
    <GridState>
        <div className="App">
          <div className="container">
            <KenoGrid />
          </div>
        </div>
    </GridState>
  );
}

export default App;
