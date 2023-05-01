import React, { useEffect, useState } from "react";
import {
  useLoaderData,
} from "react-router-dom";

import { PodcastSidebar } from "./../common/podcast-sidebar.jsx";
import { PodcastEpisodeContent } from "./podcast-episode-content.jsx";

// Componente principal de la vista de Detalles de Episodio
export function Component() {
        
	const data = useLoaderData();
	const [ episode, setEpisode ] = useState(null)
	
	useEffect( () => {
		if ( data !== undefined  ) {
			let currentEpisode = data.episodes.find( episode => episode.trackId === parseInt(data.episodeId) );
			if ( currentEpisode !== undefined ) {
				setEpisode(currentEpisode);
			} else {
				throw new Error('Episode not found.')
			}
		}		
	}, [data]);


	return(
		<div className="podcast-page-container">			
			<PodcastSidebar podcastInfo={data.generalInfo} />
			<div className="podcast-details-cnt">
				{  episode !== null && <PodcastEpisodeContent episode={episode} /> }
			</div>
		</div>
	);

}
