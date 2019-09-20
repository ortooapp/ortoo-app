import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $productDescription: String!
    $price: Float!
    $phoneNumber: String!
  ) {
    createProduct(
      productDescription: $productDescription
      price: $price
      phoneNumber: $phoneNumber
    ) {
      id
      productDescription
      price
      phoneNumber
    }
  }
`;

const CreateProduct = () => {
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [createProduct] = useMutation(CREATE_PRODUCT);

  return (
    <div>
      <h3>Sell Something</h3>
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log(productDescription, price, phoneNumber);
          createProduct({
            variables: {
              productDescription: productDescription,
              price: parseFloat(price),
              phoneNumber: phoneNumber
            }
          });
        }}
      >
        <input
          type="text"
          placeholder="Description"
          value={productDescription}
          onChange={e => setProductDescription(e.target.value)}
        />
        <br />
        <input
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
        />
        <br />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default CreateProduct;
