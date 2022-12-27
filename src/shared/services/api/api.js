// https://www.themoviedb.org/documentation/api
const API_KEY = "d56b930fc2dce779e65e8da8f4beda41";
const API_BASE_URL = "https://api.themoviedb.org/3";
const LOCAL_API_BASE_URL = "http://localhost:3001/api/movie";

const basicFetch = async (endpoint, db) => {
  let req = await fetch(`${db === 'Local' ? LOCAL_API_BASE_URL : API_BASE_URL}${endpoint}`);
  let json = await req.json();
  if (db === 'Local') {
    let shapedResponse = { results: json[0] }
    console.log("Response Of Only Local Api Endpoint : ",shapedResponse)
    return shapedResponse
  }
  return json;
};

export default {
  getHomeList: async () => {
    return [
      {
        slug: "Local Database",
        title: "Local Database",
        itens: await basicFetch(
          ``, 'Local'
        ),
      },
      {
        slug: "originals",
        title: "Netflix Originals",
        itens: await basicFetch(
          `/discover/tv?with_network=213&api_key=${API_KEY}`, 'Live'
        ),
      },
      {
        slug: "trending",
        title: "Trending",
        itens: await basicFetch(
          `/trending/all/week?api_key=${API_KEY}`, 'Live'
        ),
      },
      {
        slug: "top-rated",
        title: "Top Rated",
        itens: await basicFetch(
          `/movie/top_rated?api_key=${API_KEY}`, 'Live'
        ),
      },
      {
        slug: "action",
        title: "Action",
        itens: await basicFetch(
          `/discover/movie?with_genres=28&api_key=${API_KEY}`, 'Live'
        ),
      },
      {
        slug: "comedy",
        title: "Comedy",
        itens: await basicFetch(
          `/discover/movie?with_genres=35&api_key=${API_KEY}`, 'Live'
        ),
      },
      {
        slug: "horror",
        title: "Horror",
        itens: await basicFetch(
          `/discover/movie?with_genres=27&api_key=${API_KEY}`, 'Live'
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
