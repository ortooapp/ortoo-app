import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const PRODUCT_LIST = gql`
  {
    products {
      id
      productDescription
      price
      phoneNumber
    }
  }
`;

const ProductList = () => {
  const { loading, error, data } = useQuery(PRODUCT_LIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.products.map(({ id, productDescription, price, phoneNumber }) => (
    <div key={id}>
      <div>{productDescription}</div>
      <div>{price}</div>
      <div>{phoneNumber}</div>
    </div>
  ));
};

export default ProductList;
