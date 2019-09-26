import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $productDescription: String!
    $price: Float!
    $phoneNumber: String!
    $categoryId: ID!
    $files: [Upload!]!
  ) {
    createProduct(
      productDescription: $productDescription
      price: $price
      phoneNumber: $phoneNumber
      categoryId: $categoryId
      files: $files
    ) {
      id
      productDescription
      price
      phoneNumber
      files {
        filename
        mimetype
        encoding
        url
      }
    }
  }
`;

const PRODUCT_CATEGORIES = gql`
  query ProductCategories {
    productCategories {
      id
      name
    }
  }
`;

const CreateProduct = () => {
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [files, setFiles] = useState([]);

  const [createProduct] = useMutation(CREATE_PRODUCT);

  const { loading, error, data } = useQuery(PRODUCT_CATEGORIES);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <h3>卖东西</h3>
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log(
            productDescription,
            price,
            phoneNumber,
            productCategory,
            files
          );
          createProduct({
            variables: {
              productDescription: productDescription,
              price: parseFloat(price),
              phoneNumber: phoneNumber,
              categoryId: productCategory,
              files: files
            }
          });
        }}
      >
        <select
          onChange={e => setProductCategory(e.target.value)}
          className="form-control"
        >
          <option value={productCategory}>类别</option>
          {data.productCategories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <br />
        <input
          type="text"
          placeholder="描述"
          value={productDescription}
          onChange={e => setProductDescription(e.target.value)}
          className="form-control"
        />
        <br />
        <input
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="Price"
          className="form-control"
        />
        <br />
        <input
          type="text"
          placeholder="手机号"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          className="form-control"
        />
        <br />
        <input type="file" onChange={e => setFiles(e.target.files)} multiple />
        <br />
        <button type="submit" className="btn">
          卖
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
