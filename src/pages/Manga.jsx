import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFrownOpen } from "@fortawesome/free-solid-svg-icons";

const Manga = () => {
  const [loading, setLoading] = useState(false);
  const [manga, setmanga] = useState([]);
  const [mangaapi, setmangaapi] = useState(
    "https://kitsu.io/api/edge/manga?page[limit]=20&sort=-updatedAt"
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
    setmangaapi(page);
  };

  const handleUrl = () => {
    if (search.length > 0) {
      setmangaapi(
        `https://kitsu.io/api/edge/manga?filter[text]=${search}&page[limit]=20`
      );
    } else {
      setmangaapi(
        "https://kitsu.io/api/edge/manga?page[limit]=20&sort=-updatedAt"
      );
    }
  };

  const fetchmanga = async (link) => {
    setLoading(true);
    try {
      const { data } = await axios.get(link);
      setmanga(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchmanga(mangaapi);
  }, [mangaapi]);

  return (
    <div className="flex">
      {loading ? (
        <Loading type="bars" color="#17D6CA" />
      ) : (
        <div className="flex px-5 w-full">
          {/* manga Container */}
          <div className="flex flex-col w-full">
            {/* manga Top Bar */}

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
                  placeholder="Search manga..."
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => something(e)}
                />
                <div className="text-xs">
                  {!manga.meta ? "" : `${manga.meta.count} manga found!`}
                </div>
              </div>

              {!manga.links ? (
                " "
              ) : (
                <div className="flex justify-end space-x-2">
                  {!manga.links.first ? (
                    ""
                  ) : (
                    <button
                      className="manga-page"
                      onClick={() => handlePage(manga.links.first)}
                    >
                      First
                    </button>
                  )}

                  {!manga.links.prev ? (
                    ""
                  ) : (
                    <button
                      className="manga-page"
                      onClick={() => handlePage(manga.links.prev)}
                    >
                      Prev
                    </button>
                  )}

                  {!manga.links.next ? (
                    ""
                  ) : (
                    <button
                      className="manga-page"
                      onClick={() => handlePage(manga.links.next)}
                    >
                      Next
                    </button>
                  )}

                  {!manga.links.last ? (
                    ""
                  ) : (
                    <button
                      className="manga-page"
                      onClick={() => handlePage(manga.links.last)}
                    >
                      Last
                    </button>
                  )}
                </div>
              )}
            </div>
            {/* manga Card */}
            {!manga.data || manga.data.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full h-[60vh] m-auto font-display text-teal-600 space-y-2">
                <FontAwesomeIcon
                  icon={faFrownOpen}
                  className="fa-7x opacity-70"
                />
                <p>no data</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-5 mt-5">
                {manga.data.map((data) => (
                  <div
                    key={data.id}
                    className="manga-content flex flex-col cursor-pointer items-center overflow-hidden rounded-xl text-xs hover:scale-105 opacity-90 hover:opacity-100 transition-all duration-300 delay-100 "
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
                        className="flex flex-col w-full h-auto py-2 text-sm text-center py-auto text-teal-800 border-b-4 border-teal-300 rounded-b-xl justify-center overflow-clip pb-1"
                      >
                        <h1 key={(data.id, "text")} className="font-semibold">
                          {data.attributes.canonicalTitle}
                        </h1>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* Manga Bottom Bar */}
            <div className="flex justify-center w-full bg-teal-300 rounded-lg py-2 px-3 my-5 text-teal-700 items-center">
              <p className="flex px-auto font-display justify-center text-lg md:text-xl lg:text-2xl">
                MANGA
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manga;
