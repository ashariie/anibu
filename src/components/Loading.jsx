import React from "react";
import ReactLoading from "react-loading";

const Loading = ({ type, color }) => (
  <div className="flex w-full h-screen items-center justify-center">
    <ReactLoading type={type} color={color} height={100} width={100} />
  </div>
);

export default Loading;
