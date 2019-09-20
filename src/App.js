import React from "react";
import "./App.css";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
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

const client = new ApolloClient({
  uri: "https://ortoo-api.ortoo.now.sh/graphql",
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    });
  }
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Header />
        <Route path="/" exact component={Feed} />
        <Route path="/posts" component={PostList} />
        <Route path="/products" component={ProductList} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/profile" component={Profile} />
        <Route path="/createPost" component={CreatePost} />
        <Route path="/createProduct" component={CreateProduct} />
      </div>
    </Router>
  </ApolloProvider>
);

export default App;
