import React from "react";
import { Link } from "react-router-dom";
import PostList from "./PostList";

const Feed = () => {
  return (
    <div>
      推荐
      <div className="categories">
        <Link to="/marketplace">买卖</Link>
      </div>
      <PostList />
    </div>
  );
};

export default Feed;
