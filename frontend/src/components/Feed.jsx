import React from "react";
import logo from "../assets/logo1.png";
import { FaRegHeart } from "react-icons/fa";
import StoryDp from "./StoryDp";
import Nav from "./Nav";

const Feed = () => {
  return (
    <div className="lg:w-[50%] w-full bg-[black] min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto">
      <div className="w-full h-[100px] flex items-center justify-between p-[20px] lg:hidden">
        <img src={logo} alt="" className="w-[80px]" />
        {/* notification icon */}
        <div>
          <FaRegHeart className="text-[white] w-[25px] h-[25px]" />
        </div>
      </div>

      <div className="flex w-full overflow-auto gap-[10px] items-center p-[20px]">
        <StoryDp userName={"asdasdasddddddddd"} />
        <StoryDp userName={"asdasd"} />
        <StoryDp userName={"asdasd"} />
        <StoryDp userName={"asdasd"} />
        <StoryDp userName={"asdasd"} />
        <StoryDp userName={"asdasd"} />
        <StoryDp userName={"asdasd"} />
        <StoryDp userName={"asdasd"} />
        <StoryDp userName={"asdasd"} />
        <StoryDp userName={"asdasd"} />
        <StoryDp userName={"asdasd"} />
        <StoryDp userName={"asdasd"} />
        <StoryDp userName={"asdasd"} />
        <StoryDp userName={"asdasd"} />
      </div>

      <div className="w-full min-h-[100vh] flex flex-col items-center gap-[20px] p-[10px] pt-[40px] bg-white rounded-t-[60px] relative pb-[120px]">
        <Nav />
      </div>
    </div>
  );
};

export default Feed;
