import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import Loading from "../components/Loading";

const Detail = () => {
  const [loading, setLoading] = useState(true);
  const { type, id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(
          `https://kitsu.io/api/edge/${type}/${id}`
        );
        setData(data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [id, type]);

  return (
    <div>
      {loading ? (
        <Loading type="bars" color="#17D6CA" />
      ) : (
        <div className="flex flex-col p-5 text-md md:text-lg">
          <div className="flex flex-col w-full bg-teal-300 text-white rounded-full px-2 py-1">
            <div className="flex flex-col w-full p-2">
              <h1 className="font-semibold ">
                {data.attributes.canonicalTitle}

                {data.attributes.abbreviatedTitles[0]
                  ? `${data.attributes.abbreviatedTitles.map(
                      (title) => ` / ${title}`
                    )}`
                  : ""}
              </h1>
              <p className="w-full"></p>
            </div>
          </div>
          <div className="flex items-center space-y-3 md:space-y-5 my-5 w-full space-x-5">
            <div className="flex h-60 w-52 md:h-80 md:w-60 overflow-hidden rounded-xl ">
              <img
                src={data.attributes.posterImage.original}
                alt={data.attributes.canonicalTitle}
                className="object-cover object-center m-auto h-full w-full"
              />
            </div>
            <div className="grid h-60 md:h-80 w-full">
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

          <article key={data.id} className="space-y-2">
            {/* <p>Desctiption : </p>
            <p>{data.attributes.description}</p> */}
            <p>Synopsis : </p>
            <p>
              {data.attributes.synopsis !== ""
                ? data.attributes.synopsis
                : "gaada"}
            </p>
          </article>
        </div>
      )}
    </div>
  );
};

export default Detail;
