import React, { useState } from "react";

import { Router } from "./routes/routes.jsx";

import { PodcastContext } from "./PodcastContext.jsx";

const App = () => {
  
  const [ loading, setLoading ] = useState(false)
  
  return (
    <PodcastContext.Provider value={{loading, setLoading}}>
      <Router />
    </PodcastContext.Provider>    
  );
}

export default App;
