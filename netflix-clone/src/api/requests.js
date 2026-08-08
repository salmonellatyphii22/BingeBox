const API_KEY = "b08495e471a0c57502d24e7dfb8f4165";

const requests = {
  // ==========================
  // HOME
  // ==========================

  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,

  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,

  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,

  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,

  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,

  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,

  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,

  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,

  // ==========================
  // TV SHOWS
  // ==========================

  fetchPopularTV: `/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,

  fetchTopRatedTV: `/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`,

  fetchNetflixOriginalsTV: `/discover/tv?api_key=${API_KEY}&with_networks=213`,

  fetchCrimeTV: `/discover/tv?api_key=${API_KEY}&with_genres=80`,

  fetchComedyTV: `/discover/tv?api_key=${API_KEY}&with_genres=35`,

  fetchSciFiTV: `/discover/tv?api_key=${API_KEY}&with_genres=10765`,

  fetchRecentlyAddedTV: `/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`,

  fetchContinueWatchingTV: `/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`,

  // ==========================
  // SEARCH
  // ==========================

  // Drama
    fetchDramaTV: `/discover/tv?api_key=${API_KEY}&with_genres=18`,

    // Animation (includes anime & western animation)
    fetchAnimationTV: `/discover/tv?api_key=${API_KEY}&with_genres=16`,

    // Mystery
    fetchMysteryTV: `/discover/tv?api_key=${API_KEY}&with_genres=9648`,

    // Kids
    fetchKidsTV: `/discover/tv?api_key=${API_KEY}&with_genres=10762`,

    // Movies Page
    fetchTrendingMovies: `/trending/movie/week?api_key=${API_KEY}&language=en-US`,

    fetchAnimationMovies:
    `/discover/movie?api_key=${API_KEY}&with_genres=16`,

    fetchUpcomingMovies:
    `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,

    // Highly-rated movies as a stand-in for "Oscar Winners"
    fetchOscarWinners:
    `/discover/movie?api_key=${API_KEY}&sort_by=vote_average.desc&vote_count.gte=1000`,

    // ==========================
    // ANIME
    // ==========================

    // Trending Anime
    fetchTrendingAnime:
    `/trending/tv/week?api_key=${API_KEY}&with_genres=16`,

    // Popular Anime
    fetchPopularAnime:
    `/discover/tv?api_key=${API_KEY}&with_genres=16&sort_by=popularity.desc`,

    // Top Rated Anime
    fetchTopRatedAnime:
    `/discover/tv?api_key=${API_KEY}&with_genres=16&sort_by=vote_average.desc&vote_count.gte=200`,

    // Action & Adventure
    fetchActionAdventureAnime:
    `/discover/tv?api_key=${API_KEY}&with_genres=16,10759`,

    // Fantasy
    fetchFantasyAnime:
    `/discover/tv?api_key=${API_KEY}&with_genres=16,10765`,

    // Romance
    fetchRomanceAnime:
    `/discover/tv?api_key=${API_KEY}&with_genres=16,10749`,

    // Comedy
    fetchComedyAnime:
    `/discover/tv?api_key=${API_KEY}&with_genres=16,35`,

    // Sci-Fi
    fetchSciFiAnime:
    `/discover/tv?api_key=${API_KEY}&with_genres=16,10765`,

    // Recently Airing
    fetchRecentlyAiringAnime:
    `/tv/on_the_air?api_key=${API_KEY}&with_genres=16`,

  fetchSearch: (query) =>
    `/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
      query
    )}`,
};

export default requests;