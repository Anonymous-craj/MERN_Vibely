import React from "react";
import LeftHome from "../components/LeftHome";
import Feed from "../components/Feed";
import RightHome from "../components/RightHome";

const Home = () => {
  return (
    <div>
      <LeftHome />
      <Feed />
      <RightHome />
    </div>
  );
};

export default Home;
