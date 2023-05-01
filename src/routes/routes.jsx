import {
	RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

// Loaders de los datos en diferido que los compoentes de rutas deben visualizar
import { fetchPodcastList, fetchPodcastDetails } from "./loaders.js";

import { Layout } from "./../pages/common/layout.jsx";

// Routes definidas para carga de las diferentes vistas.
// La carga es en diferido, paralelamente los componentes a renderizar y los datos a consultar
export const router = createBrowserRouter([
  { 
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        loader: ({ request }) => fetchPodcastList(),
        lazy: () => import("../pages/podcast-list-view/podcast-list.jsx"),
      },
      {
        path: "/podcast/:podcastId",
        loader: ({ request, params }) => fetchPodcastDetails(params.podcastId),
        lazy: () => import("../pages/podcast-view/podcast-main.jsx"),
      },    
      {     
        path: "/podcast/:podcastId/episode/:episodeId",
        loader: ({ request, params }) => fetchPodcastDetails(params.podcastId, params.episodeId),
        lazy: () => import("./../pages/episode-view/episode-main.jsx"),
      },
    ]
  }        
]);

export const Router = () => {
	return (
    <RouterProvider router={router} /> 
	)
}	