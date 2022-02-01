import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFrownOpen } from "@fortawesome/free-solid-svg-icons";

const Anime = () => {
  const [loading, setLoading] = useState(false);
  const [anime, setAnime] = useState([]);
  const [animeapi, setAnimeapi] = useState(
    "https://kitsu.io/api/edge/anime?page[limit]=20&sort=-updatedAt"
  );
  const [search, setSearch] = useState("");

  const something = (e) => {
    if (e.keyCode === 13) {
      setSearch(e.target.value);
      console.log(search);
      handleUrl();
    }
  };

  const handlePage = (page) => {
    setAnimeapi(page);
  };

  const handleUrl = () => {
    if (search.length > 0) {
      setAnimeapi(
        `https://kitsu.io/api/edge/anime?filter[text]=${search}&page[limit]=20`
      );
    } else {
      setAnimeapi(
        "https://kitsu.io/api/edge/anime?page[limit]=20&sort=-updatedAt"
      );
    }
  };

  const fetchAnime = async (link) => {
    setLoading(true);
    try {
      const { data } = await axios.get(link);
      setAnime(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAnime(animeapi);
  }, [animeapi]);

  return (
    <div className="flex">
      {loading ? (
        <Loading type="bars" color="#17D6CA" />
      ) : (
        <div className="flex px-5 w-full">
          {/* Anime Container */}
          <div className="flex flex-col w-full">
            {/* Anime Top Bar */}

            <div className="flex flex-col space-y-3 md:flex-row justify-between w-full bg-teal-300 rounded-lg py-2 px-3 text-teal-700 items-center text-sm md:text-md lg:text-lg">
              <div className="flex space-x-2 items-center">
                <button
                  className="bg-teal-500 hover:bg-teal-600 rounded-lg px-2 py-1 text-white font-semibold"
                  onClick={handleUrl}
                >
                  <FontAwesomeIcon icon={faSearch} className="fa-lg" />
                </button>
                <input
                  className="outline-none rounded-full px-4 py-1"
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search anime..."
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => something(e)}
                />
                <div className="text-xs">
                  {!anime.meta ? "" : `${anime.meta.count} Anime found!`}
                </div>
              </div>

              {!anime.links ? (
                " "
              ) : (
                <div className="flex justify-end space-x-2">
                  {!anime.links.first ? (
                    ""
                  ) : (
                    <button
                      className="anime-page"
                      onClick={() => handlePage(anime.links.first)}
                    >
                      First
                    </button>
                  )}

                  {!anime.links.prev ? (
                    ""
                  ) : (
                    <button
                      className="anime-page"
                      onClick={() => handlePage(anime.links.prev)}
                    >
                      Prev
                    </button>
                  )}

                  {!anime.links.next ? (
                    ""
                  ) : (
                    <button
                      className="anime-page"
                      onClick={() => handlePage(anime.links.next)}
                    >
                      Next
                    </button>
                  )}

                  {!anime.links.last ? (
                    ""
                  ) : (
                    <button
                      className="anime-page"
                      onClick={() => handlePage(anime.links.last)}
                    >
                      Last
                    </button>
                  )}
                </div>
              )}
            </div>
            {/* Anime Card */}
            {!anime.data || anime.data.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full h-[60vh] m-auto font-display text-teal-600 space-y-2">
                <FontAwesomeIcon
                  icon={faFrownOpen}
                  className="fa-7x opacity-70"
                />
                <p>no data</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-5 mt-5">
                {anime.data.map((data) => (
                  <div
                    key={data.id}
                    className="relative cursor-pointer items-center overflow-hidden rounded-xl text-xs opacity-90 hover:opacity-100 transition-all duration-300 delay-100 "
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
                        className="absolute h-full w-full text-sm text-center opacity-0 hover:opacity-90 text-white border-b-4 border-teal-300 rounded-b-xl justify-center items-center overflow-clip"
                      >
                        <div
                          key={(data.id, "text")}
                          className="flex flex-col justify-end items-between h-full w-full"
                        >
                          <p className="absolute top-1 left-1 bg-teal-300 rounded-lg px-1">
                            {data.attributes.averageRating}
                          </p>
                          <p className="bg-teal-300 w-full">
                            {data.attributes.canonicalTitle}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* Anime Bottom Bar */}
            <div className="flex justify-center w-full bg-teal-300 rounded-lg py-2 px-3 my-5 text-teal-700 items-center">
              <p className="flex px-auto font-display justify-center text-lg md:text-xl lg:text-2xl">
                ANIME
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Anime;
