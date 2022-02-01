import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [anime, setAnime] = useState([]);
  const [manga, setManga] = useState([]);
  const [animeapi, setAnimeapi] = useState(
    "https://kitsu.io/api/edge/trending/anime"
  );
  const [mangaapi, setMangaapi] = useState(
    "https://kitsu.io/api/edge/trending/manga"
  );

  const fetchAnime = async (link) => {
    try {
      const { data } = await axios.get(link);
      setAnime(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchManga = async (link) => {
    try {
      const { data } = await axios.get(link);
      setManga(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAnime(animeapi);
    return () => {
      setAnimeapi({});
    };
  }, [animeapi]);

  useEffect(() => {
    fetchManga(mangaapi);
  }, [mangaapi]);

  console.log(anime);
  console.log(manga);
  console.log("link");
  console.log(anime.links);

  return (
    <div className="flex">
      {loading ? (
        <Loading type="bars" color="teal" />
      ) : (
        // ANIBU Containter
        <div className="flex flex-col mx-5 mb-5 justify-center">
          {/* Anime Container */}
          <div className="flex flex-col">
            {/* Anime Top Bar */}
            <div className="flex justify-between w-full bg-teal-300 rounded-lg py-2 px-3 text-teal-700 items-center">
              <p className="flex px-auto font-display justify-center text-lg md:text-xl lg:text-2xl">
                TRENDING ANIME
              </p>
              <Link
                className="bg-teal-500 hover:bg-teal-600 rounded-lg px-2 py-1 text-white font-semibold"
                to="/anime"
              >
                Show all anime
              </Link>
            </div>
            {/* Anime Card */}
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-5">
              {anime.data.map((data) => (
                //ANIME Content
                <div
                  key={data.id}
                  className="anime-content flex flex-col cursor-pointer items-center overflow-hidden rounded-xl text-xs hover:scale-105 opacity-90 hover:opacity-100 transition-all duration-300 delay-100 "
                >
                  <Link
                    key={(data.id, "link")}
                    to={`/detail/${data.type}/${data.id}`}
                    className="flex flex-col w-full h-full border-r-2 border-teal-300 rounded-r-xl"
                  >
                    <img
                      key={(data.id, "img")}
                      src={data.attributes.posterImage.original}
                      alt={data.attributes.canonicalTitle}
                      className="h-full w-full object-cover object-center shadow-xl"
                    />

                    <div
                      key={(data.id, "title")}
                      className="flex flex-col w-full h-12 text-sm text-center py-auto text-teal-800 border-b-4 border-teal-300 rounded-b-xl justify-center overflow-clip pb-1"
                    >
                      <h1 key={(data.id, "text")} className="font-semibold">
                        {data.attributes.canonicalTitle}
                      </h1>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            {/* Anime Bottom Bar */}
            {/* <div className="flex justify-between w-full bg-teal-200 rounded-lg py-2 px-3 text-teal-700 items-center mt-10 text-sm md:text-md lg:text-lg">
              <div className="flex space-x-2">
                <button
                  className="bg-teal-500 hover:bg-teal-600 rounded-lg px-2 py-1 text-white font-semibold"
                  onClick={() =>
                    setAnimeapi("https://kitsu.io/api/edge/trending/anime")
                  }
                >
                  Trending
                </button>
                <Link
                  to="/anime"
                  className="bg-teal-500 hover:bg-teal-600 rounded-lg px-2 py-1 text-white font-semibold"
                >
                  See More
                </Link>
              </div>

              {!anime.links ? (
                <div className="flex justify-end space-x-2"></div>
              ) : (
                <div className="flex justify-end space-x-2">
                  <button
                    className="anime-page"
                    onClick={() => setAnimeapi(anime.links.first)}
                  >
                    First
                  </button>
                  <button
                    className="anime-page"
                    onClick={() => setAnimeapi(anime.links.prev)}
                  >
                    Prev
                  </button>
                  <button
                    className="anime-page"
                    onClick={() => setAnimeapi(anime.links.next)}
                  >
                    Next
                  </button>
                  <button
                    className="anime-page"
                    onClick={() => setAnimeapi(anime.links.last)}
                  >
                    Last
                  </button>
                </div>
              )}
            </div> */}
          </div>
          {/* Manga Container */}
          <div className="flex flex-col mt-10">
            {/* Manga Top Bar */}
            <div className="flex justify-between w-full bg-teal-300 rounded-lg py-2 px-3 text-teal-700 items-center">
              <p className="flex px-auto font-display justify-center text-lg md:text-xl lg:text-2xl">
                TRENDING MANGA
              </p>
              <Link
                className="bg-teal-500 hover:bg-teal-600 rounded-lg px-2 py-1 text-white font-semibold"
                to="/manga"
              >
                Show all manga
              </Link>
            </div>
            {/* Manga Card */}
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-5">
              {manga.data.map((data) => (
                //Manga Content

                <div
                  key={data.id}
                  className="manga-content flex flex-col cursor-pointer items-center overflow-hidden rounded-xl text-xs hover:scale-105 opacity-90 hover:opacity-100 transition-all duration-300 delay-100 "
                >
                  <Link
                    key={(data.id, "link")}
                    to={`/detail/${data.type}/${data.id}`}
                    className="flex flex-col w-full h-full"
                  >
                    <img
                      key={(data.id, "img")}
                      src={data.attributes.posterImage.original}
                      alt={data.attributes.canonicalTitle}
                      className="h-full w-full object-cover object-center shadow-xl"
                    />

                    <div
                      key={(data.id, "title")}
                      className="flex flex-col w-full h-12 text-sm text-center py-auto text-teal-800 border-b-2 border-teal-300 rounded-b-xl justify-center  "
                    >
                      <h1 key={(data.id, "text")} className="font-semibold">
                        {data.attributes.canonicalTitle}
                      </h1>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            {/* Manga Bottom Bar */}
            {/* <div className="flex justify-between w-full bg-teal-200 rounded-lg py-2 px-3 text-teal-700 items-center mt-10 text-sm md:text-md lg:text-lg">
              <div className="flex space-x-2">
                <button
                  className="bg-teal-500 hover:bg-teal-600 rounded-lg px-2 py-1 text-white font-semibold"
                  onClick={() =>
                    setMangaapi("https://kitsu.io/api/edge/trending/manga")
                  }
                >
                  Trending
                </button>
                <Link
                  to="/manga"
                  className="bg-teal-500 hover:bg-teal-600 rounded-lg px-2 py-1 text-white font-semibold"
                >
                  See More
                </Link>
              </div>

              {!manga.links ? (
                <div className="flex w-1/3 justify-end space-x-2"></div>
              ) : (
                <div className="flex w-1/3 justify-end space-x-2">
                  <button
                    className="manga-page"
                    onClick={() => setMangaapi(manga.links.first)}
                  >
                    First
                  </button>
                  <button
                    className="manga-page"
                    onClick={() => setMangaapi(manga.links.prev)}
                  >
                    Prev
                  </button>
                  <button
                    className="manga-page"
                    onClick={() => setMangaapi(manga.links.next)}
                  >
                    Next
                  </button>
                  <button
                    className="manga-page"
                    onClick={() => setMangaapi(manga.links.last)}
                  >
                    Last
                  </button>
                </div>
              )}
            </div> */}
          </div>
        </div>
      )}

      {/* <div className="flex flex-col items-center mt-5 w-full overflow-hidden rounded-xl ">
        <div className="grid h-40 w-full">
          <p>
            Rated : {data.attributes.ageRating} (
            {data.attributes.ageRatingGuide})
          </p>
          <p>Ratings : {data.attributes.averageRating}</p>
          <p>Popularity : {data.attributes.popularityRank}</p>
          <p>
            Total Episodes :{" "}
            {data.attributes.episodeLength
              ? data.attributes.episodeLength
              : "-"}
          </p>
          <p>Start Date : {data.attributes.startDate}</p>
          <p>End Date : {data.attributes.endDate}</p>
          <p>Status : {data.attributes.status}</p>
        </div>
      </div>
      <p className="bg-teal-400 text-white rounded-full px-2 py-1">
        {data.type}
      </p>
      <article key={data.id} className="space-y-2">
        <p>Desctiption : {data.attributes.description}</p>
        <p>
          Synopsis :{" "}
          {data.attributes.synopsis !== "" ? data.attributes.synopsis : "gaada"}
        </p>
      </article> */}
    </div>
  );
};

export default Home;
