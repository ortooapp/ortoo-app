import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const CREATE_POST = gql`
  mutation CreatePost($description: String!) {
    createPost(description: $description) {
      id
      description
    }
  }
`;

const CreatePost = () => {
  const [description, setDescription] = useState("");

  const [createPost] = useMutation(CREATE_POST);

  return (
    <div>
      <h3>Create Post</h3>
      <form
        onSubmit={e => {
          e.preventDefault();
          createPost({
            variables: { description: description }
          });
        }}
      >
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default CreatePost;
