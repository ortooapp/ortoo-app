import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";

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
        <h2>登录 Ortoo</h2>
        <div className="links">
          没有账号？<Link to="/signup">邮箱注册</Link>
        </div>
        <input
          type="email"
          placeholder="邮箱"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="form-control"
        />
        <br />
        <input
          type="password"
          placeholder="密码"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="form-control"
        />
        <br />
        <div className="links">
          <Link to="#">
            <span className="text-right">忘记密码?</span>
          </Link>
        </div>
        <button type="submit" className="btn">
          登录
        </button>
      </form>
    </div>
  );
};

export default SignIn;
