// Loader de datos de la vista del listado de podcast 
export const fetchPodcastList = async () => {
    
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
					localStorage.setItem("podcastListLastQuery", new Date() );
					localStorage.setItem("podcastList", JSON.stringify(data) );
					resolveList(data);
				});
		}	else {
			resolveList(JSON.parse(podcastList));
		}

	}); 

}

// Loader de datos de las vista de detalles de podcast y episodio
export const fetchPodcastDetails = async ( podcastId = 1000, episodeId = -1 ) => {
    
	const podcastDetails = localStorage.getItem("podcastDetails");
	const podcastDetailsObject = podcastDetails === null ? {} : JSON.parse(podcastDetails);
	const hasToFetchPodcastDetails = podcastDetailsObject.hasOwnProperty(`${podcastId}`) ? isOutOfDate(podcastDetailsObject[`${podcastId}`].lastQuery) : true;

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
				.then( data => {

					const dataObject = escapeJsonString(data.contents);
					
					let details = {
						resultsCount: dataObject.resultCount,
						generalInfo: dataObject.results[0],
						episodes: dataObject.results.filter( (dataItem, index ) => index !== 0 ),
						lastQuery: new Date(),
					};

					let podcastDetailsObjectToStore = { ...podcastDetailsObject, [`${podcastId}`]: details };

					localStorage.setItem("podcastDetails", JSON.stringify(podcastDetailsObjectToStore) );
			
					let podcastDetailsObjectForView = { ...{}, ...podcastDetailsObjectToStore[`${podcastId}`] };

					if ( episodeId !== -1 ) {
						podcastDetailsObjectForView.episodeId = episodeId;
					}

					resolveDetails(podcastDetailsObjectForView);
				});

		}	else {
			
			let podcastDetailsObjectForView = { ...{}, ...podcastDetailsObject[`${podcastId}`] };
			
			if ( episodeId !== -1 ) {
				podcastDetailsObjectForView.episodeId = episodeId;
			}

			resolveDetails(podcastDetailsObjectForView);
		}

	}); 

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