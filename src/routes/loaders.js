export const fetchPodcastList = async () => {
    
	const podcastListLastQuery = localStorage.getItem("podcastListLastQuery");
	const podcastList = localStorage.getItem("podcastList");
	
	localStorage.setItem("podcastListLastQuery", new Date() );
	
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

export const fetchPodcastDetails = async (podcastId = 1000) => {
    
	const podcastDetails = localStorage.getItem("podcastDetails");
	const podcastDetailsObject = podcastDetails === null ? {} : JSON.parse(podcastDetails);
	const hasToFetchPodcastDetails = podcastDetailsObject.hasOwnProperty(`${podcastId}`) ? isOutOfDate(podcastDetailsObject.lastQuery) : true;

	return new Promise((resolveDetails, rejectDetails) => {

		if ( hasToFetchPodcastDetails ) {
			fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`)}`)
				.then(response => {
					if ( response ) {
						return response.json()
					} else {	
						rejectDetails();
						throw new Error('Network response was not ok.')
					}	
				})
				.then(	data => {

					const dataObject = escapeJsonString(data.contents);
					
					const details = {
						resultsCount: dataObject.resultCount,
						generalInfo: dataObject.results[0],
						episodes: dataObject.results.filter( (dataItem, index ) => index !== 0 ),
						lastQuery: new Date()
					};

					const podcastDetailsObjectToStore = { ...podcastDetailsObject, [`${podcastId}`]: details };
					
					localStorage.setItem("podcastDetails", JSON.stringify(podcastDetailsObjectToStore) );
					resolveDetails(podcastDetailsObjectToStore[`${podcastId}`]);
				});
		}	else {
			resolveDetails(podcastDetailsObject[`${podcastId}`]);
		}

	}); 

}

/*export const fetchPodcastDetails = async (podcastId = 1000 ) => {
    return fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`)}`)
}*/

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

	return daysDiff === 0 ? false : true;

}

const escapeJsonString = jsonString => {
	let unescapedJSON = jsonString;
	var escapedJSONString = unescapedJSON
														.replace(/\\n/g, "\\n")
														.replace(/\\'/g, "\\'")
														.replace(/\\"/g, '\\"')
														.replace(/\\&/g, "\\&")
														.replace(/\\r/g, "\\r")
														.replace(/\\t/g, "\\t")
														.replace(/\\b/g, "\\b")
														.replace(/\\f/g, "\\f");
	return JSON.parse(escapedJSONString);

}