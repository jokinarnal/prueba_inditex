import React, { useState } from "react";

import { Router } from "./routes/routes.jsx";

import { PodcastContext } from "./PodcastContext.jsx";

import "./App.css";

const App = () => {
  
  const [ loading, setLoading ] = useState(false)
  
  return (
    <div className="pc-main-container">
      <PodcastContext.Provider value={{loading, setLoading}}>
        <Router />
      </PodcastContext.Provider>    
    </div>  
  );
}

export default App;
