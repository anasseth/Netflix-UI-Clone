// https://www.themoviedb.org/documentation/api
const API_KEY = "d56b930fc2dce779e65e8da8f4beda41";
const API_BASE_URL = "https://api.themoviedb.org/3";

const basicFetch = async (endpoint) => {
  const req = await fetch(`${API_BASE_URL}${endpoint}`);
  const json = await req.json();
  return json;
};

export default {
  getHomeList: async () => {
    return [
      {
        slug: "originals",
        title: "Netflix Originals",
        itens: await basicFetch(
          `/discover/tv?with_network=213&api_key=${API_KEY}`
        ),
      },
      {
        slug: "trending",
        title: "Trending",
        itens: await basicFetch(
          `/trending/all/week?api_key=${API_KEY}`
        ),
      },
      {
        slug: "top-rated",
        title: "Top Rated",
        itens: await basicFetch(
          `/movie/top_rated?api_key=${API_KEY}`
        ),
      },
      {
        slug: "action",
        title: "Action",
        itens: await basicFetch(
          `/discover/movie?with_genres=28&api_key=${API_KEY}`
        ),
      },
      {
        slug: "comedy",
        title: "Comedy",
        itens: await basicFetch(
          `/discover/movie?with_genres=35&api_key=${API_KEY}`
        ),
      },
      {
        slug: "horror",
        title: "Horror",
        itens: await basicFetch(
          `/discover/movie?with_genres=27&api_key=${API_KEY}`
        ),
      },
    ];
  },


  getMoveInfo: async (movieId, type) => {
    let info = {};
    if (movieId) {
      switch (type) {
        case "movie":
          info = await basicFetch(
            `/movie/${movieId}?api_key=${API_KEY}`
          );
          break;
        case "tv":
          info = await basicFetch(
            `/tv/${movieId}?api_key=${API_KEY}`
          );
          break;
      }
    }
    return info;
  },
};
