import React from "react";
import "./App.css";
import { ApolloProvider } from "@apollo/react-hooks";
// import ApolloClient from "apollo-boost";
import { ApolloClient } from "apollo-client";
// import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import PostList from "./components/PostList";
import Feed from "./components/Feed";
import ProductList from "./components/ProductList";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import CreatePost from "./components/CreatePost";
import CreateProduct from "./components/CreateProduct";
import Marketplace from "./components/Marketplace";

// const client = new ApolloClient({
//   link: createUploadLink({ uri: "http://localhost:3000/graphql" }),
//   cache: new InMemoryCache(),
//   request: operation => {
//     const token = localStorage.getItem("token");
//     operation.setContext({
//       headers: {
//         authorization: token ? `Bearer ${token}` : ""
//       }
//     });
//   }
// });
const httpLink = createUploadLink({
  uri: "https://ortoo-api.ortoo.now.sh/graphql"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Header />
        <div className="container">
          <Route path="/" exact component={Feed} />
          <Route path="/posts" component={PostList} />
          <Route path="/products" component={ProductList} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/profile" component={Profile} />
          <Route path="/createPost" component={CreatePost} />
          <Route path="/createProduct" component={CreateProduct} />
          <Route path="/marketplace" component={Marketplace} />
        </div>
      </div>
    </Router>
  </ApolloProvider>
);

export default App;
