import React from "react";
import {
  useLoaderData,
} from "react-router-dom";

import { PodcastSidebar } from "../common/podcast-sidebar.jsx";
import { PodcastDetailsContent } from "./podcast-details-content.jsx";

// Componente principal de la vista de Detalles de Podcast
export function Component() {
        
    const data = useLoaderData();
    
    return(
			<div className="podcast-page-container">			
        <PodcastSidebar podcastInfo={data.generalInfo} />
        <div className="podcast-details-cnt">
          <PodcastDetailsContent episodes={data.episodes} resultsCount={data.resultsCount} />
        </div>
      </div>
    );
}
