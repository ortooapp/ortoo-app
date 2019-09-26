import React from "react";
import { Link } from "react-router-dom";
import ProductList from "./ProductList";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import loadingGif from "./loading.gif";

const PRODUCT_CATEGORIES = gql`
  {
    productCategories {
      id
      name
    }
  }
`;

const Marketplace = () => {
  const { loading, error, data } = useQuery(PRODUCT_CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h4>推荐</h4>
      {/* {data.productCategories.map(cat => (
        <li key={cat.id} className="product-category">
          <Link to={cat.name}>{cat.name}</Link>
        </li>
      ))} */}
      <ProductList />
      <div className="loading-container">
        <img src={loadingGif} alt="loading" />
      </div>
    </div>
  );
};

export default Marketplace;
