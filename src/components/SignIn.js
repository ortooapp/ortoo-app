import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const SIGN_IN = gql`
  mutation SignUp($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`;

const SignIn = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signIn] = useMutation(SIGN_IN);

  return (
    <div>
      <h3>Sign In</h3>
      <form
        onSubmit={e => {
          e.preventDefault();
          signIn({ variables: { email: email, password: password } }).then(
            ({ data }) => {
              localStorage.setItem("token", data.signIn.token);
              props.history.push("/");
            }
          );
        }}
      >
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
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
