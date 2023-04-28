import React from "react";
import {
  useLoaderData,
} from "react-router-dom";

import { PodcastSidebar } from "./../common/podcast-sidebar.jsx";
import { PodcastDetailsContent } from "./podcast-details-content.jsx";

export function Component() {
        
    const data = useLoaderData();
    
    return(
			<div className="podcast-page-container">				
				<PodcastSidebar podcastInfo={data.generalInfo} />
				<PodcastDetailsContent episodes={data.episodes} resultsCount={data.resultsCount} />
			</div>
    );
}
