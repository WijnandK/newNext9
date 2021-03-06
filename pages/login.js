import { Button, Form, Icon, Message, Segment } from "semantic-ui-react";
import Link from "next/link";
import React from "react";
import catchErrors from "../utils/catchErrors";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import { handleLogin } from "../utils/auth";

const INITIAL_USER = {
  email: "",
  password: ""
};

function SignIn() {
  const [user, setUser] = React.useState(INITIAL_USER);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  }
  async function handleSubmit() {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      const url = `${baseUrl}/api/login`;
      const payload = { ...user };
      const response = await axios.post(url, payload);
      handleLogin(response.data);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Message
        attached
        icon="privacy"
        header="Welcome Back"
        content="Login"
        color="teal"
      />
      <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
        <Segment>
          <Message error header="Ooops" content={error} />
          <Form.Input
            fluid
            icon="envelope"
            iconPosition="left"
            label="Email"
            placholder="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            label="Password"
            placholder="Password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
          />
          <Button
            disabled={disabled || loading}
            icon="sign in"
            type="submit"
            color="orange"
            content="Sign in"
          />
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
        new user ?{" "}
        <Link href="/signup">
          <a>signup here</a>
        </Link>{" "}
        instead
      </Message>
    </>
  );
}

export default SignIn;
