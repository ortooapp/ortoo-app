import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
// import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "./PostList.css";

const POST_LIST = gql`
  {
    posts {
      id
      description
      user {
        id
        name
      }
      category {
        id
        name
      }
      files {
        id
        mimetype
        url
      }
      likes {
        id
      }
    }
  }
`;

// const LIKE_POST = gql`
//   mutation LikePost($postId: ID!) {
//     likePost(postId: $postId) {
//       id
//       post {
//         id
//       }
//       user {
//         id
//       }
//     }
//   }
// `;

const PostList = () => {
  const [like, setLike] = useState(0);

  const { loading, error, data } = useQuery(POST_LIST);

  // const [likePost] = useMutation(LIKE_POST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.posts.map(({ id, description, user, category, files, likes }) => (
    <div key={id}>
      <div className="post-card">
        <div className="description">
          {description} - {category.name} - {user.name}
        </div>
        {files.map(file => (
          <div>
            {file.mimetype === "image/jpeg" ? (
              <img src={file.url} alt={description} className="single-photo" />
            ) : (
              <video src={file.url} className="single-video" controls />
            )}
          </div>
        ))}
        <div className="post-footer">
          <button className="like-button" onClick={() => setLike(like + 1)}>
            Like
          </button>{" "}
          {like}
          {/* {like} - {likes.length} */}
        </div>
      </div>
    </div>
  ));
};

export default PostList;
