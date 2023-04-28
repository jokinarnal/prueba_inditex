export const fetchPodcastList = async () => {
    
	localStorage.setItem("podcastListLastQuery", new Date() );
	
	const podcastListLastQuery = localStorage.getItem("podcastListLastQuery");
	const podcastList = localStorage.getItem("podcastList");
	
	return new Promise((resolveList, rejectList) => {

		if ( podcastList === null || podcastListLastQuery === null || isOutOfDate(podcastListLastQuery) ) {
			fetch("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json")
				.then(response => {
					if (response.ok) {
						return response.json()
					} else {	
						rejectList();
						throw new Error('Network response was not ok.')
					}	
				})
				.then(	data => {
					localStorage.setItem("podcastList", JSON.stringify(data) );
					resolveList(data);
				});
		}	else {
			resolveList(JSON.parse(podcastList));
		}

	}); 

}

export const fetchPodcastDetails = async (podcastId = 1000 ) => {
    return fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`)}`)
}

export const fetchPodcastEpisodeDetails = async (episodeId = 1000 ) => {
    return fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${episodeId}&media=podcast&entity=podcastEpisode&limit=20`)}`)
}

const isOutOfDate = ( date ) => {
	
	const storedDate = new Date(date);
	const currentDate = new Date();

	const millisecondsDiff = currentDate.getTime() - storedDate.getTime();

	const daysDiff = Math.floor( 
		millisecondsDiff / (24 * 60 * 60 * 60)
	)
	
	return daysDiff === 0 ? true : true;

}