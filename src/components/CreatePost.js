import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
    }
  }
`;

const CREATE_POST = gql`
  mutation CreatePost(
    $description: String!
    $categoryId: ID!
    $files: [Upload!]!
  ) {
    createPost(
      description: $description
      categoryId: $categoryId
      files: $files
    ) {
      id
      description
      files {
        filename
        mimetype
        encoding
        url
      }
    }
  }
`;

const CreatePost = () => {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  const [createPost] = useMutation(CREATE_POST);

  const { loading, error, data } = useQuery(CATEGORIES);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <h3>Create Post</h3>
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log(category, description, files);
          createPost({
            variables: {
              categoryId: category,
              description: description,
              files: files
            }
          });
        }}
      >
        <select onChange={e => setCategory(e.target.value)}>
          <option value={category}>类别</option>
          {data.categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <br />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <br />
        <input type="file" onChange={e => setFiles(e.target.files)} single />
        <br />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default CreatePost;
