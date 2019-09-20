import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const PROFILE = gql`
  {
    me {
      id
      name
      email
    }
  }
`;

const Profile = () => {
  const { loading, error, client, data } = useQuery(PROFILE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const logout = () => {
    window.localStorage.clear();
    client.resetStore();
  };

  if (data.me) {
    return (
      <div>
        {data.me.name}
        <br />
        {data.me.email}
        <br />
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return <div>Sign In</div>;
};

export default Profile;
