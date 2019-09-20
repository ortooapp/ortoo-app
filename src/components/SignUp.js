import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const SIGN_UP = gql`
  mutation SignUp($name: String!, $email: String!, $password: String!) {
    signUp(name: $name, email: $email, password: $password) {
      id
      name
      email
      password
    }
  }
`;

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signUp] = useMutation(SIGN_UP);

  return (
    <div>
      <h3>Sign Up</h3>
      <form
        onSubmit={e => {
          e.preventDefault();
          signUp({
            variables: { name: name, email: email, password: password }
          });
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
