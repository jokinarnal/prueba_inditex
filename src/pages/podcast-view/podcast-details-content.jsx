import React from "react";
import { PodcastEpisodesTable } from "./podcast-episodes-table";

export const PodcastDetailsContent = ({...props}) => 
	(<>
		<div className="podcast-episodes-count box-shadow">
			{`Episodes: ${props.resultsCount - 1}`}
		</div>
		<div className="podcast-episodes-list box-shadow">
			<PodcastEpisodesTable episodes={props.episodes} />
		</div>
	</> );