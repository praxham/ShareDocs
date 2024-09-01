import React from "react";
import ShareDocHomeGraphics from './../assets/ShareDocHomeGraphics.svg'

const HomeGraphics = () => {
  return (
    <img
      className="max-w-[600px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-[30px]"
      src={ShareDocHomeGraphics}
      alt=""
    />
  );
};

export default HomeGraphics;
