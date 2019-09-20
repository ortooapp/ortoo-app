import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const POST_LIST = gql`
  {
    posts {
      id
      description
      user {
        id
        name
      }
    }
  }
`;

const PostList = () => {
  const { loading, error, data } = useQuery(POST_LIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.posts.map(({ id, description, user }) => (
    <div key={id}>
      <div>
        {description} - {user.name}
      </div>
    </div>
  ));
};

export default PostList;
