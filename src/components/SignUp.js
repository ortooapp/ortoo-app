import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";

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
      <form
        onSubmit={e => {
          e.preventDefault();
          signUp({
            variables: { name: name, email: email, password: password }
          });
        }}
      >
        <h2>注册 Ortoo</h2>
        <div className="links">
          已有账号？<Link to="/signin">邮箱登录</Link>
        </div>
        <input
          type="text"
          placeholder="全名"
          value={name}
          onChange={e => setName(e.target.value)}
          className="form-control"
        />
        <br />
        <input
          type="email"
          placeholder="手机号"
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
        <button type="submit" className="btn">
          注册
        </button>
      </form>
    </div>
  );
};

export default SignUp;
