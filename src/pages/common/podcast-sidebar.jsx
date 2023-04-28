import React from "react";
import {
  useLoaderData,
} from "react-router-dom";

export const PodcastSidebar = ({...props}) => {
        
	const data = useLoaderData();
	
	return(
		<div className="podcast-sidebar-container">
			<div className="podcast-sidebar box-shadow">
				<img className="podcast-sidebar-img" src={props.podcastInfo.artworkUrl600} alt={props.podcastInfo.artistName} width="100" height="100"/>
				<div className="podcast-sidebar-content">
					<p className="podcast-sidebar-item">
						<strong className="podcast-sidebar-name">{props.podcastInfo.collectionName}</strong>
						<span className="podcast-sidebar-artist">by {props.podcastInfo.artistName}</span>
					</p>
					{ props.podcastInfo.hasOwnProperty('description') && 
						<p className="podcast-sidebar-item">
							<strong className="podcast-sidebar-name">Description</strong>
							<span className="podcast-sidebar-artist">{props.podcastInfo.description}</span>
						</p> }				
				</div>
			</div>	
			{ JSON.stringify() 
			}
		</div>
	);
}