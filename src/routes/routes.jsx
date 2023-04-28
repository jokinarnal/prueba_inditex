import {
	RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { fetchPodcastList, fetchPodcastDetails, fetchPodcastEpisodeDetails } from "./loaders.js";

import { PodcastContext } from "./../PodcastContext.jsx";

export const router = createBrowserRouter([
    {
      path: "/",
      loader: ({ request }) => {
				return fetchPodcastList()
			},
      lazy: () => import("../pages/podcast-list/podcast-list.jsx"),
    },
    {
      path: "/podcast/:podcastId",
      loader: ({ request, params }) => fetchPodcastDetails(params.podcastId),
      lazy: () => import("../pages/podcast-details/podcast-details.jsx"),
      children: [
        {
          path: "episode/:episodeId",
        	loader: ({ request, params }) => fetchPodcastEpisodeDetails(params.podcastId, params.episodeId),
        	lazy: () => import("./../pages/podcast-episode-details.jsx"),
				},    
      ]
    },
  ]);

export const Router = () => {
	return (
    <RouterProvider router={router} /> 
	)
}	