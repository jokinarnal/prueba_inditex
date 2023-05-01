import React from "react";
import { AudioPlayer } from "./audio-player.jsx";
export const PodcastEpisodeContent = ({...props}) => (
	<div className="podcast-episode-cnt box-shadow">
		<h2 className="episode-name">{ props.episode.trackName }</h2>
		<div className="episode-description" dangerouslySetInnerHTML={{__html: props.episode.description}} />
		<AudioPlayer url={props.episode.episodeUrl}></AudioPlayer>	
	</div>);