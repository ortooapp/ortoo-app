import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "./ProductList.css";
import Moment from "react-moment";
import "moment/locale/zh-cn";
import loadingGif from "./loading.gif";
import XRegExp from "xregexp";
const regexMongolianSymbol = XRegExp("^\\p{Mongolian}");

const PRODUCT_LIST = gql`
  {
    products {
      id
      createdAt
      productDescription
      price
      phoneNumber
      productCategory {
        id
        name
      }
      files {
        id
        url
      }
      user {
        id
        name
      }
    }
  }
`;

const ProductList = () => {
  const { loading, error, data } = useQuery(PRODUCT_LIST);

  if (loading)
    return (
      <div className="loading-container">
        <img src={loadingGif} alt="loading" />
      </div>
    );
  if (error) return <p>Error :(</p>;

  return data.products.map(
    ({
      id,
      createdAt,
      productDescription,
      price,
      phoneNumber,
      productCategory,
      files,
      user
    }) => (
      <div key={id} className="product-card">
        <div className="product-left">
          <img
            src="https://i.postimg.cc/4dqXTtCn/avatar.jpg"
            alt="avatar"
            className="avatar"
          />
          <div className="name tm product-name">
            {regexMongolianSymbol.test(user.name) && user.name}
          </div>
        </div>
        <div className="product-right-row">
          <div className="name">
            {!regexMongolianSymbol.test(user.name) && user.name}
          </div>
          <div className="date">
            <Moment format="lll">{createdAt}</Moment>
          </div>
          {regexMongolianSymbol.test(productDescription) ? (
            <div className="post-direction-v">
              <div className="product-left-row">
                <div className="price">¥{price}</div>
                <div className="location">
                  <i className="fas fa-map-marker-alt" /> 锡林郭勒
                </div>
                <div className="phone-number">
                  <a href={`tel:` + phoneNumber}>
                    <i className="fas fa-phone"></i> {phoneNumber}
                  </a>
                </div>

                {files.length === 1
                  ? files.map(file => (
                      <img
                        src={file.url}
                        alt="products"
                        className="single-product-thumbnail"
                      />
                    ))
                  : files.map(file => (
                      <img
                        src={file.url}
                        alt="products"
                        className="product-image"
                      />
                    ))}
              </div>
              <div className="description tm">{productDescription}</div>
            </div>
          ) : (
            <div className="post-direction-h">
              <div className="description">{productDescription}</div>
              <div>
                <div className="price">¥{price}</div>
                <div className="location">
                  <i className="fas fa-map-marker-alt" /> 锡林郭勒
                </div>
                <div className="phone-number">
                  <a href={`tel:` + phoneNumber}>
                    <i className="fas fa-phone"></i> {phoneNumber}
                  </a>
                </div>

                {files.length === 1
                  ? files.map(file => (
                      <img
                        src={file.url}
                        alt="products"
                        className="single-product-thumbnail"
                      />
                    ))
                  : files.map(file => (
                      <img
                        src={file.url}
                        alt="products"
                        className="product-image"
                      />
                    ))}
              </div>
            </div>
          )}
          <div className="product-footer">
            <div className="like-button">
              <i className="fas fa-heart" /> 100
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductList;
